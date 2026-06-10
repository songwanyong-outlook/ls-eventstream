# Introduction 
Language Service is a common language service framework which can provide language service experience such as intellisense, syntax highlight, error detection, quick info and signature in trident.

<!-- Last updated: October 2025 -->

# Prerequisites
- Node.js including NPM
- Java Runtime Environment(JRE) required by antlr4ts
- tsc: "npm install -g tsc"
- copyfiles: "npm install -g copyfiles"
- auth: "npm install -g vsts-npm-auth"
- Optional install VSCode extension 'ANTLR4 grammar syntax support', which can help debug ANTLR g4 files

# Build and Test
From the root of the repo, run `code .` to open the project.

Auth
```
cd CommonSqlCore
npm run auth
```

Install packages
```
cd CommonSql
npm install

cd playground
npm run auth
npm install
```

Build CommonSqlCore and CommonSqlFacade
```
cd CommonSql
npm run build
```

Launch the dev server (Make sure you have completed the above steps)

Copy pipeline generated language service worker or worker under path `CommonSql\CommonSqlCore\src\worker\dist`(worker generated in local dev branch) to path `playground\src\language_service_worker\`

```
cd playgrounds
```
```npm run ls-test-local ``` to use local generated language service worker and local language service facade.

```npm run ls-test ``` to use manually copied language service worker and local language service facade.

```npm run ls-debug ``` to run language service without worker. (The mock providers call pipeline directly so you can debug CommonSqlCore code).

```npm run ls-prod ``` to use manually copied language service worker and language service facade package.

In VS Code, switch to the "Run and Debug" view and run "Launch Chrome against localhost". It will bring up a Chrome instance and you can set breakpoints in VS Code and the debugging should work. (Not available for web worker currently)

Test  
TODO: Describe and show how to run the tests. 
