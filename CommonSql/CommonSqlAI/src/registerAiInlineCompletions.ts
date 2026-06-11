import * as monaco from 'monaco-editor';
import { AzureOpenAiInlineProvider, AzureOpenAiInlineProviderOptions } from './AzureOpenAiInlineProvider';

/**
 * Options for `registerAiInlineCompletions`. Extends the underlying provider
 * options with editor-lifecycle controls.
 */
export interface RegisterAiInlineCompletionsOptions extends AzureOpenAiInlineProviderOptions {
    /**
     * Monaco language id to register the provider against.
     * The host should have already registered this language with Monaco.
     */
    languageName: string;

    /**
     * Optional Monaco editor instance. If supplied, the helper installs an
     * 800 ms idle re-trigger so the AI ghost text fires when the cursor
     * pauses (Monaco only auto-fires the inline-completion provider on EDIT
     * events; without this, the user has to keep typing for AI to fire).
     *
     * Pass `null`/`undefined` to skip the idle-trigger wiring (e.g. when
     * the host wants to drive triggers manually).
     */
    editor?: monaco.editor.IStandaloneCodeEditor | monaco.editor.ICodeEditor | null;

    /** Idle delay in ms before firing inline-suggest trigger. Default: 800. */
    idleTriggerDelayMs?: number;

    /** Initial trigger delay after registration (ms). Default: 1200. Set 0 to disable. */
    initialTriggerDelayMs?: number;
}

/** Handle returned by `registerAiInlineCompletions`. */
export interface RegisteredAiInlineCompletions {
    /** Unregister the provider and detach all idle-trigger listeners. */
    dispose(): void;
    /** The underlying provider, for advanced telemetry hookup. */
    readonly provider: AzureOpenAiInlineProvider;
}

/**
 * Register an Azure OpenAI inline-completion provider with Monaco, plus an
 * idle re-trigger so the AI ghost text fires when the cursor pauses.
 *
 * This is the recommended entry point for hosts that want the full hybrid
 * experience (ANTLR + AI). Pass the result's `dispose()` to your editor
 * teardown hook.
 *
 * @example
 * ```ts
 * const ai = registerAiInlineCompletions(monaco, {
 *     languageName: 'TSQL',
 *     editor,
 *     deployment: process.env.PUBLIC_AOAI_DEPLOYMENT!,
 *     proxyBase: '/api/aoai',
 * });
 * editor.onDidDispose(() => ai.dispose());
 * ```
 */
export function registerAiInlineCompletions(
    monacoInstance: typeof monaco,
    options: RegisterAiInlineCompletionsOptions,
): RegisteredAiInlineCompletions {
    const provider = new AzureOpenAiInlineProvider(options);
    const inlineDisposable = monacoInstance.languages.registerInlineCompletionsProvider(
        options.languageName,
        provider,
    );

    const subscriptions: monaco.IDisposable[] = [inlineDisposable];
    let idleTimer: number | undefined;

    const editor = options.editor;
    if (editor) {
        const delay = options.idleTriggerDelayMs ?? 800;
        const initialDelay = options.initialTriggerDelayMs ?? 1200;

        const scheduleTrigger = () => {
            if (idleTimer !== undefined) window.clearTimeout(idleTimer);
            idleTimer = window.setTimeout(() => {
                editor.trigger('ai-idle-trigger', 'editor.action.inlineSuggest.trigger', {});
            }, delay);
        };

        subscriptions.push(editor.onDidChangeCursorPosition(scheduleTrigger));
        subscriptions.push(editor.onDidChangeModelContent(scheduleTrigger));

        if (initialDelay > 0) {
            window.setTimeout(
                () => editor.trigger('ai-initial-trigger', 'editor.action.inlineSuggest.trigger', {}),
                initialDelay,
            );
        }
    }

    return {
        get provider() {
            return provider;
        },
        dispose() {
            if (idleTimer !== undefined) {
                window.clearTimeout(idleTimer);
                idleTimer = undefined;
            }
            for (const s of subscriptions) {
                try {
                    s.dispose();
                } catch {
                    /* swallow */
                }
            }
        },
    };
}
