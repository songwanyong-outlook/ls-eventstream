# common-sql-language-service-ai

AI inline-completion provider (Azure OpenAI) for the Common SQL language
service. Sits alongside `CommonSqlCore` (ANTLR engine) and `CommonSqlFacade`
(Monaco-facing) as the **AI half of the hybrid language service**.

## What it provides

| Export | What it is |
|---|---|
| `AzureOpenAiInlineProvider` | A Monaco `InlineCompletionsProvider`. Calls Azure OpenAI Chat Completions through a same-origin proxy. Auto-detects reasoning models (gpt-5*/o*) vs. chat models (gpt-4o, gpt-4o-mini) and adjusts request shape. Debounced + cancellable. |
| `registerAiInlineCompletions` | Convenience helper: instantiates the provider, registers it with Monaco, and installs an 800 ms idle re-trigger so the AI ghost text fires when the cursor pauses. Returns a `dispose()` handle. |

## Quick start

```ts
import * as monaco from 'monaco-editor';
import { registerAiInlineCompletions } from 'common-sql-language-service-ai';

// After you have already created an editor and registered the language id.
const ai = registerAiInlineCompletions(monaco, {
    languageName: 'TSQL',
    editor,
    deployment: process.env.PUBLIC_AOAI_DEPLOYMENT!, // e.g. 'gpt-4o'
    proxyBase: '/api/aoai',                          // forwarded to AOAI by the host
    apiVersion: '2024-08-01-preview',
});

editor.onDidDispose(() => ai.dispose());
```

The provider posts to:
```
${proxyBase}/deployments/${deployment}/chat/completions?api-version=${apiVersion}
```

The host build tool (Vite / Webpack / Express / Functions) is responsible for
forwarding that path to the real Azure OpenAI endpoint and injecting the
`api-key` header server-side. See `playground/webpack.config.js` in this repo
for a working dev-server proxy.

## Why a separate package?

`CommonSqlCore` and `CommonSqlFacade` contain only the deterministic
ANTLR-based features. They have zero HTTP / external-service dependencies.
This module is the **opt-in AI half** of the hybrid language service — hosts
that do not want AI can simply not import it; their bundles will not pay any
cost for the AI code.

## Build

```powershell
cd CommonSql/CommonSqlAI
npm install
npm run compile        # tsc -> ./dist
```
