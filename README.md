# ls-eventstream

Language service framework for Event Stream / T-SQL. Provides a **hybrid** developer experience that combines:

- **ANTLR-based deterministic features** - syntax highlighting, schema-aware completion, hover, error markers, signature help (the existing `CommonSql/` framework).
- **Azure OpenAI inline AI completion** - Copilot-style ghost text that proposes the next snippet of T-SQL when the cursor pauses (`playground/src/ai/`).

Both providers run side-by-side in the Monaco playground at `playground/`.

---

## Quick start (TL;DR)

```powershell
# One-time
git clone https://github.com/songwanyong-outlook/ls-eventstream.git
cd ls-eventstream
cd playground; npm install; cd ..

# Optional - turn on AI ghost text (uses your own Azure subscription, ~$0.0008/req)
az login
az account set --subscription <your-sub-id>
pwsh ./scripts/provision-azure-openai.ps1

# Run the playground
cd playground; npm start
# Open http://localhost:8000/
```

If you skipped the Azure step you still get the full ANTLR-based experience; the AI badge will read "AI ghost text disabled - run scripts/provision-azure-openai.ps1 to enable."

---

## Prerequisites

| Tool | Why |
|---|---|
| Node.js 18+ and npm | Build and dev server |
| Azure CLI (`az`) | Only needed for the AI half (provisioning Azure OpenAI) |
| PowerShell 7 (`pwsh`) | Runs the provisioning script |
| Java Runtime (JRE 11+) | Only needed if you regenerate the ANTLR parser (`npm run build` under `CommonSql/CommonSqlCore`). Not needed for the playground in mock mode. |
| Global helpers (optional) | `npm i -g vsts-npm-auth copyfiles` - only for the legacy `auth` / `copy-worker-file` scripts |
| VS Code extension *ANTLR4 grammar syntax support* | Optional, helps debugging `.g4` files |

---

## Project layout

```
ls-eventstream/
  CommonSql/                       # ANTLR-based common SQL language service framework
    CommonSqlCore/                 # Parser, pipeline, worker (the ANTLR engine)
    CommonSqlFacade/               # Monaco-facing facade
    CommonSqlUtils/                # Shared types/utils
    TridentStreaming/              # Streaming-specific grammar config
    engineering/                   # Tests, benchmarks, mocks
  playground/                      # Monaco + React playground demo
    src/
      ai/                          # Azure OpenAI inline-completion provider
        AzureOpenAiInlineProvider.ts
      components/Editor.tsx        # Wires both providers into Monaco
      providers/                   # Mock providers used in dev mode
      language_service_worker/     # Built ANTLR worker JS (copied or stubbed)
    webpack.config.js              # Dev-server proxy + AOAI env injection
    .env.local                     # NEVER COMMITTED - AOAI endpoint + key
  scripts/
    provision-azure-openai.ps1     # One-command Azure provisioning
  README.md
```

---

## Running the playground

### Option A - Mock mode (no real ANTLR worker, no Azure)

Fastest path for UI iteration. Webpack replaces the real `CommonSqlLanguageServiceProvider` with `MockLanguageServiceProvider` so you do not need to build the worker.

```powershell
cd playground
npm install
npm start            # http://localhost:8000/
```

### Option B - Real ANTLR worker + Azure OpenAI ghost text (full hybrid)

1. **Build the ANTLR worker** (requires Java for `antlr4ts`):

   ```powershell
   cd CommonSql
   npm run auth            # only the first time; uses vsts-npm-auth
   npm install
   npm run build
   ```

2. **Provision Azure OpenAI** (creates resource group + AOAI account + `gpt-4o` deployment under your subscription; writes `playground/.env.local`):

   ```powershell
   az login
   az account set --subscription <your-sub-id>
   pwsh ./scripts/provision-azure-openai.ps1
   ```

   Optional flags: `-ResourceGroup`, `-Location`, `-DeploymentName`, `-Capacity`. The script is idempotent - safe to re-run.

3. **Run the playground**:

   ```powershell
   cd playground
   npm run ls-prod-local       # uses the just-built worker + AOAI ghost text
   # or `npm start` if you just want mock providers + AOAI ghost text
   ```

4. Open <http://localhost:8000/>. Header badge should read "AI ghost text active (deployment: gpt-4o)".

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
              v   webpack-dev-server proxy
              |   (injects `api-key: $AOAI_API_KEY` header server-side)
              v
upstream   POST  $AOAI_ENDPOINT/openai/deployments/gpt-4o/chat/completions?...
```

- `AOAI_ENDPOINT`, `AOAI_API_KEY` in `playground/.env.local` are read only by `webpack.config.js` (Node).
- Only `PUBLIC_*` variables (deployment name, API version, proxy base path) are exposed to the bundle via `DefinePlugin`.
- `playground/.env.local` is gitignored.

For production hosting (not `npm start`), the dev-server proxy is not active. You would need a real backend implementing the same forwarding behaviour, or switch to a backend-issued OAuth/MSAL token model.

---

## Cost

Pricing on `gpt-4o` Standard SKU at the time of writing: $2.50 / 1M input tokens, $10 / 1M output tokens.

Typical inline-completion request: ~200 input + ~30 output tokens, ~$0.0008 per request. 10 000 demo requests is roughly $8.

`scripts/provision-azure-openai.ps1` defaults `-Capacity 10` (= 10 000 tokens per minute), which is plenty for interactive use and well below any meaningful cost ceiling.

---

## Tests

```powershell
cd CommonSql
npm run test:unit
npm run test:int
```

See `CommonSql/engineering/test/` for the integration scenarios.

---

## How the hybrid works in practice

In `playground/src/components/Editor.tsx`:

1. The existing `LanguageServiceClient.InitializeLanguageService(monaco, editor, 'TSQL')` call registers all the ANTLR-backed providers (completion, hover, signatures, error markers).
2. If `PUBLIC_AOAI_DEPLOYMENT` is defined in the bundle (which happens iff `playground/.env.local` was generated by the provisioning script), a separate `AzureOpenAiInlineProvider` is registered via `monaco.languages.registerInlineCompletionsProvider`.
3. An 800 ms idle re-trigger fires `editor.action.inlineSuggest.trigger` after the cursor stops moving, so ghost text appears even when you are just looking at the screen.

Both providers stay completely independent; the AI provider only ever returns inline completions, never regular suggestion-popup items, so there is no UI conflict.
