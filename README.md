# ls-eventstream

Language service framework for Event Stream / T-SQL. Provides a **hybrid** developer experience that combines:

- **ANTLR-based deterministic features** - syntax highlighting, schema-aware completion, hover, error markers, signature help.
- **Azure OpenAI inline AI completion** - Copilot-style ghost text that proposes the next snippet of T-SQL when the cursor pauses.

Both halves are first-class modules under `CommonSql/`. The `playground/` directory is just a Monaco-based demo and debug tool for them.

---

## Project layout

```
ls-eventstream/
  CommonSql/                          # The language service itself (three modules)
    CommonSqlCore/                    # ANTLR engine: parser, pipeline, web worker
    CommonSqlFacade/                  # Monaco-facing facade (completion, hover, errors)
    CommonSqlAI/                      # AI inline-completion provider (Azure OpenAI)
    CommonSqlUtils/                   # Shared types/utils
    TridentStreaming/                 # Streaming-specific grammar config
    engineering/                      # Tests, benchmarks, mocks
  playground/                         # Monaco + React demo / debug tool
    src/
      components/Editor.tsx           # Wires Core + Facade + AI into Monaco
      providers/                      # Dev-mode mock providers
      language_service_worker/        # Built ANTLR worker JS (copied or stubbed)
    webpack.config.js                 # Dev-server proxy for AOAI; env injection
    .env.local                        # NEVER COMMITTED - AOAI endpoint + key
  scripts/
    provision-azure-openai.ps1        # One-command Azure provisioning
  README.md
```

### Hybrid architecture

```
host app
  |
  +-- monaco-editor
        |
        +-- CommonSqlFacade           # registers ANTLR-backed providers
        |     +-- CommonSqlCore       #   parser + pipeline (web worker)
        |
        +-- CommonSqlAI               # registers AI inline-completion provider
              +-- proxy /api/aoai/*   #   host-side proxy injects api-key
                    +-- Azure OpenAI
```

`CommonSqlCore` + `CommonSqlFacade` have **zero** HTTP / external dependencies. `CommonSqlAI` is the opt-in AI half; hosts that do not want AI do not import it and their bundles pay no cost.

---

## Prerequisites

| Tool | Why |
|---|---|
| Node.js 18+ and npm | Build and dev server |
| Azure CLI (`az`) | Only needed for the AI half (provisioning Azure OpenAI) |
| PowerShell 7 (`pwsh`) | Runs the provisioning script |
| Java Runtime (JRE 11+) | Only needed if you regenerate the ANTLR parser. Not needed for the playground in mock mode. |
| VS Code extension *ANTLR4 grammar syntax support* | Optional, helps debugging `.g4` files |

---

## Quick start (TL;DR)

```powershell
# One-time
git clone https://github.com/songwanyong-outlook/ls-eventstream.git
cd ls-eventstream

# Build the AI module (so the playground can import it)
cd CommonSql/CommonSqlAI
npm install
npm run compile
cd ../..

# Install playground deps
cd playground
npm install
cd ..

# Optional - turn on AI ghost text (uses your own Azure subscription, ~$0.0008/req)
az login
az account set --subscription <your-sub-id>
pwsh ./scripts/provision-azure-openai.ps1

# Run the playground (demo + debug tool)
cd playground
npm start
# Open http://localhost:8000/
```

If you skip the Azure step you still get the full ANTLR-based experience; the AI badge will read `AI ghost text disabled - run scripts/provision-azure-openai.ps1 to enable`.

---

## Consuming the language service from your own host

`CommonSql/` is what you ship; `playground/` is just a demo. To embed the language service in another Monaco-based app:

### 1. ANTLR-backed features (always)

Build `CommonSqlCore` (parser + worker) and `CommonSqlFacade` (Monaco providers), then in your host:

```ts
import * as monaco from 'monaco-editor';
import { CommonSqlLanguageServiceProvider } from 'event-stream-language-service-facade';

CommonSqlLanguageServiceProvider.InitializeLanguageServiceFeatures({
    monacoInstance: monaco,
    languageName: 'TSQL',
    syntaxHighlightRule: yourMonarchRule,
    languageServiceWorkerConstructor: () => new Worker(/* CommonSqlCore worker URL */),
    metadataDelegate: () => yourSchemaMetadata,
    builtinFunctions: [],
    caseSensitive: false,
});
```

See `playground/src/languageServiceClient.ts` for a complete example.

### 2. AI inline completion (opt-in)

Add the AI half on top, once per editor instance:

```ts
import { registerAiInlineCompletions } from 'common-sql-language-service-ai';

const ai = registerAiInlineCompletions(monaco, {
    languageName: 'TSQL',
    editor,                                                      // optional - enables 800 ms idle re-trigger
    deployment: process.env.PUBLIC_AOAI_DEPLOYMENT!,             // e.g. 'gpt-4o'
    proxyBase: '/api/aoai',                                      // your host's same-origin proxy
    apiVersion: '2024-08-01-preview',
});
editor.onDidDispose(() => ai.dispose());
```

The host is responsible for wiring `proxyBase` so it forwards `/api/aoai/*` to `<AOAI_ENDPOINT>/openai/*` with the `api-key` header injected server-side. See `playground/webpack.config.js` for a dev-server proxy example, or implement your own with Express / Azure Functions / etc. for production.

---

## Running the playground (demo + debug tool)

### Option A - Mock mode (no real ANTLR worker)

Fastest for UI iteration. Webpack swaps the real Monaco providers for mock providers, so you do not need to build the Core worker.

```powershell
cd playground
npm install
npm start            # http://localhost:8000/
```

### Option B - Full hybrid

1. Build everything:

   ```powershell
   cd CommonSql
   npm run auth            # only the first time; uses vsts-npm-auth
   npm install
   npm run build           # builds Core + Facade

   cd CommonSqlAI
   npm install
   npm run compile
   cd ../..
   ```

2. Provision Azure OpenAI:

   ```powershell
   az login
   az account set --subscription <your-sub-id>
   pwsh ./scripts/provision-azure-openai.ps1
   ```

   The script is **idempotent** - safe to re-run. It detects any existing `aoai-tsql-ai-*` account in the target resource group and reuses it instead of creating a new one.

3. Run:

   ```powershell
   cd playground
   npm run ls-prod-local    # real worker + AOAI ghost text
   ```

4. Open <http://localhost:8000/>. Header badge should read `AI ghost text active (deployment: gpt-4o)`.

### Try it

- Type `SE` then press `Ctrl+Space` -> deterministic completion popup (`SELECT`, `SET`, ...).
- Type a comment like `-- get top 5 customers by spend` then press Enter -> wait ~1 s after the cursor stops -> AI ghost text proposes a SQL continuation. Press `Tab` to accept.

### npm scripts cheat-sheet

| Script | What it does |
|---|---|
| `npm start` | Dev mode + mock providers + AOAI ghost text |
| `npm run ls-debug` | Mock mode (no worker), full hot reload |
| `npm run ls-test-local` | Builds and copies the local worker, then runs the dev server |
| `npm run ls-test` | Same as above but assumes you already copied the worker |
| `npm run ls-prod-local` | Production language-service facade + local worker + AOAI ghost text |
| `npm run ls-prod` | Production facade + manually-copied worker |

---

## Security boundary for the AI integration

The Azure OpenAI API key never reaches the browser bundle:

```
browser -> fetch('/api/aoai/deployments/gpt-4o/chat/completions?...')
              |
              v   host-side proxy (webpack-dev-server / Express / Functions)
              |   injects `api-key: $AOAI_API_KEY` header server-side
              v
upstream   POST  $AOAI_ENDPOINT/openai/deployments/gpt-4o/chat/completions?...
```

- `AOAI_ENDPOINT`, `AOAI_API_KEY` in `playground/.env.local` are read only by `webpack.config.js` (Node).
- Only `PUBLIC_*` variables (deployment name, API version, proxy base path) are exposed to the bundle via `DefinePlugin`.
- `playground/.env.local` is gitignored.

For production hosting, the dev-server proxy is not active. You need a real backend implementing the same forwarding behaviour, or switch to a backend-issued OAuth/MSAL token model.

---

## Cost

Pricing on `gpt-4o` Standard SKU at the time of writing: $2.50 / 1M input tokens, $10 / 1M output tokens.

Typical inline-completion request: ~200 input + ~30 output tokens, ~$0.0008 per request. 10 000 demo requests is roughly $8.

`scripts/provision-azure-openai.ps1` defaults `-Capacity 10` (= 10 000 tokens per minute), plenty for interactive use and well below any meaningful cost ceiling.

---

## Tests

```powershell
cd CommonSql
npm run test:unit
npm run test:int
```

See `CommonSql/engineering/test/` for the integration scenarios.

---

## Where to look in the source

| Goal | File |
|---|---|
| Add a new Monaco provider (ANTLR-backed) | `CommonSql/CommonSqlFacade/src/providers/` |
| Tweak parser grammar | `CommonSql/CommonSqlCore/src/language-service/Grammar/SqlParser.g4` |
| Change AI prompt / model parameters | `CommonSql/CommonSqlAI/src/AzureOpenAiInlineProvider.ts` |
| Change AI registration UX (idle delay, etc.) | `CommonSql/CommonSqlAI/src/registerAiInlineCompletions.ts` |
| Demo host wiring (the reference integration) | `playground/src/components/Editor.tsx` + `playground/src/languageServiceClient.ts` |
| Dev-server proxy for AOAI | `playground/webpack.config.js` |
