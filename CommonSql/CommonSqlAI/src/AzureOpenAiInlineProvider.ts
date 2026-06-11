/**
 * Azure OpenAI inline-completion provider for Monaco.
 *
 * Calls Azure OpenAI Chat Completions API through a same-origin proxy
 * (the host wires the proxy in its build tool — see playground/webpack.config.js
 * for an example). The API key never touches the browser bundle: the proxy
 * injects it as an `api-key` HTTP header server-side.
 *
 * Designed for cheap chat models (gpt-4o, gpt-4o-mini) and the gpt-5* /
 * o*-reasoning families. One request per user pause, client-side debounced,
 * cancellable.
 *
 * Recommended entry point: see `registerAiInlineCompletions` in the same
 * module, which wraps this provider with an idle re-trigger so ghost text
 * appears when the cursor pauses.
 */
import type * as monaco from 'monaco-editor';

export interface AzureOpenAiInlineProviderOptions {
  /** Same-origin proxy base path. Default: '/api/aoai'. */
  proxyBase?: string;
  /** Azure OpenAI deployment name (e.g. 'gpt-4o-mini'). */
  deployment: string;
  /** Azure OpenAI API version. Default: '2024-08-01-preview'. */
  apiVersion?: string;
  /** Max tokens to generate per suggestion. Default: 80. */
  maxTokens?: number;
  /** Sampling temperature. Default: 0.2 (deterministic for code). */
  temperature?: number;
  /** Debounce delay in ms. Default: 350. */
  debounceMs?: number;
  /** How many lines of context to send BEFORE the cursor. Default: 60. */
  contextLinesBefore?: number;
  /** How many lines of context to send AFTER the cursor. Default: 10. */
  contextLinesAfter?: number;
  /** Optional logger; defaults to console. */
  logger?: Pick<Console, 'info' | 'warn' | 'error' | 'debug'>;
}

const SYSTEM_PROMPT = [
  'You are an expert Microsoft Fabric Data Warehouse T-SQL author.',
  'Continue the user\'s SQL at the cursor marker `<CURSOR>` with the most likely next tokens.',
  'Rules:',
  '1. Output ONLY the raw text that should be inserted at the cursor — no explanations, no markdown, no fences.',
  '2. Stop at the next logical break (end of identifier, clause, or line) — keep it short.',
  '3. Use the schema objects mentioned in the surrounding text when relevant.',
  '4. Prefer valid T-SQL syntax; uppercase reserved keywords.',
  '5. If the cursor is mid-token, complete the token; otherwise insert what comes next.',
].join('\n');

interface InlineItemWithMeta extends monaco.languages.InlineCompletion {
  /** Internal id used to correlate accept/reject events with the request. */
  _requestId?: string;
}

interface InlineListWithMeta extends monaco.languages.InlineCompletions<InlineItemWithMeta> {
  items: InlineItemWithMeta[];
}

export class AzureOpenAiInlineProvider
  implements monaco.languages.InlineCompletionsProvider<InlineListWithMeta>
{
  private readonly opts: Required<
    Omit<AzureOpenAiInlineProviderOptions, 'deployment' | 'logger'>
  > & { deployment: string; logger: Pick<Console, 'info' | 'warn' | 'error' | 'debug'> };
  private inFlight: AbortController | null = null;

  constructor(opts: AzureOpenAiInlineProviderOptions) {
    this.opts = {
      proxyBase: opts.proxyBase ?? '/api/aoai',
      deployment: opts.deployment,
      apiVersion: opts.apiVersion ?? '2024-08-01-preview',
      maxTokens: opts.maxTokens ?? 80,
      temperature: opts.temperature ?? 0.2,
      debounceMs: opts.debounceMs ?? 350,
      contextLinesBefore: opts.contextLinesBefore ?? 60,
      contextLinesAfter: opts.contextLinesAfter ?? 10,
      logger: opts.logger ?? console,
    };
  }

  async provideInlineCompletions(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    _context: monaco.languages.InlineCompletionContext,
    token: monaco.CancellationToken,
  ): Promise<InlineListWithMeta> {
    // Cancel any prior in-flight request — Monaco can fire repeatedly while typing.
    this.inFlight?.abort();
    const ctl = new AbortController();
    this.inFlight = ctl;
    token.onCancellationRequested(() => ctl.abort());

    // Client-side debounce: wait, then check if still the current request.
    await sleep(this.opts.debounceMs);
    if (ctl.signal.aborted) return { items: [] };

    const { prompt, prefixOnCurrentLine } = this.buildPrompt(model, position);

    const url = `${this.opts.proxyBase}/deployments/${encodeURIComponent(this.opts.deployment)}/chat/completions?api-version=${encodeURIComponent(this.opts.apiVersion)}`;

    // Reasoning models (gpt-5*, o1*, o3*, o4*) use `max_completion_tokens`
    // and reject `temperature != 1` / `stop`. Chat models (gpt-4o, gpt-4.1,
    // gpt-35-turbo) use the classic `max_tokens` / `temperature` / `stop`.
    const isReasoningModel = /^(gpt-5|o\d)/i.test(this.opts.deployment);
    const requestBody: Record<string, unknown> = {
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      n: 1,
    };
    if (isReasoningModel) {
      // Reasoning models (gpt-5*, o*, etc.) burn most of their output on
      // hidden reasoning tokens. Give them a generous budget so the visible
      // SQL actually makes it out. 80 is roughly enough for chat models but
      // ~10x that for reasoning models matches empirical behavior.
      requestBody.max_completion_tokens = Math.max(this.opts.maxTokens, 800);
    } else {
      requestBody.max_tokens = this.opts.maxTokens;
      requestBody.temperature = this.opts.temperature;
      requestBody.stop = ['\n\n', ';\n', '```'];
    }

    let suggestion: string;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctl.signal,
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        this.opts.logger.warn(`[AOAI] ${res.status} ${res.statusText}: ${txt.substring(0, 200)}`);
        return { items: [] };
      }
      const json = (await res.json()) as ChatCompletionsResponse;
      suggestion = json.choices?.[0]?.message?.content?.trim() ?? '';
    } catch (err: any) {
      if (err?.name !== 'AbortError') this.opts.logger.warn('[AOAI] request failed', err);
      return { items: [] };
    }
    if (!suggestion || ctl.signal.aborted) return { items: [] };
    suggestion = stripCodeFences(suggestion);

    // If the model echoes back the prefix on the current line, strip it.
    if (prefixOnCurrentLine && suggestion.startsWith(prefixOnCurrentLine)) {
      suggestion = suggestion.slice(prefixOnCurrentLine.length);
    }
    if (!suggestion) return { items: [] };

    const item: InlineItemWithMeta = {
      insertText: suggestion,
      range: {
        startLineNumber: position.lineNumber,
        startColumn: position.column,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      },
      _requestId: Math.random().toString(36).slice(2),
    };
    return { items: [item] };
  }

  handleItemDidShow(_list: InlineListWithMeta, item: InlineItemWithMeta): void {
    this.opts.logger.debug?.('[AOAI] shown', item._requestId);
  }

  freeInlineCompletions(_list: InlineListWithMeta): void {
    /* no-op */
  }

  disposeInlineCompletions(_list: InlineListWithMeta): void {
    /* no-op */
  }

  private buildPrompt(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
  ): { prompt: string; prefixOnCurrentLine: string } {
    const totalLines = model.getLineCount();
    const startLine = Math.max(1, position.lineNumber - this.opts.contextLinesBefore);
    const endLine = Math.min(totalLines, position.lineNumber + this.opts.contextLinesAfter);

    const before: string[] = [];
    for (let i = startLine; i < position.lineNumber; i++) before.push(model.getLineContent(i));
    const currentLine = model.getLineContent(position.lineNumber);
    const prefixOnCurrentLine = currentLine.substring(0, position.column - 1);
    const suffixOnCurrentLine = currentLine.substring(position.column - 1);
    const after: string[] = [];
    for (let i = position.lineNumber + 1; i <= endLine; i++) after.push(model.getLineContent(i));

    const prompt =
      'Microsoft Fabric Data Warehouse T-SQL.\n' +
      'Code so far (cursor marked as <CURSOR>):\n' +
      '```sql\n' +
      [...before, prefixOnCurrentLine + '<CURSOR>' + suffixOnCurrentLine, ...after].join('\n') +
      '\n```\n' +
      'Return only the text to insert at <CURSOR>.';
    return { prompt, prefixOnCurrentLine };
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function stripCodeFences(s: string): string {
  const m = s.match(/^```(?:sql)?\s*\n?([\s\S]*?)\n?```$/i);
  return m ? m[1]!.trim() : s;
}

interface ChatCompletionsResponse {
  choices?: Array<{
    message?: { role: string; content?: string };
    finish_reason?: string;
  }>;
}
