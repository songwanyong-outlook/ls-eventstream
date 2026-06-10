import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { LanguageServiceClient } from '../languageServiceClient';
import { IMetadataType, ISqlMetadata } from 'event-stream-language-service-facade';
import { AzureOpenAiInlineProvider } from '../ai/AzureOpenAiInlineProvider';

const disableErrorDetection = false;
export const DEFAULT_LANGUAGE_NAME = 'TSQL';

interface editorProps {
    language: string;
    setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export const Editor: React.FC<editorProps> = (props) => {
    const divEl = useRef<HTMLDivElement>(null);
    let editor: monaco.editor.IStandaloneCodeEditor;
    const language = props.language ?? DEFAULT_LANGUAGE_NAME;
    const [aiStatus, setAiStatus] = useState<string>('');

    useEffect(() => {
        if (divEl.current) {
            editor = monaco.editor.create(divEl.current, {
                value: '',
                language,
                wordBasedSuggestions: "off",
                automaticLayout: true, // This might severely impact performance, don't use in production.
                inlineSuggest: { enabled: true, mode: 'subwordSmart' },
            });

            if (!monaco.languages.getLanguages().some(item => item.id === language)) {
                if (language === DEFAULT_LANGUAGE_NAME) {
                    InitializeLanguageServiceFeaturesForSql(monaco, editor);
                }
            }

            const model = editor.getModel();
            if (model === null) {
                return;
            }
            monaco.editor.setModelLanguage(model, language);
            props.setEditor(editor);

            // ---- AI (Azure OpenAI) hybrid layer ----
            // Registers an InlineCompletionsProvider that calls Azure OpenAI
            // through the webpack dev-server proxy (/api/aoai/*). Active only
            // when playground/.env.local has been populated.
            const deployment = (process.env.PUBLIC_AOAI_DEPLOYMENT || '').trim();
            const apiVersion = (process.env.PUBLIC_AOAI_API_VERSION || '2024-08-01-preview').trim();
            const proxyBase = (process.env.PUBLIC_AOAI_PROXY_BASE || '/api/aoai').trim();
            if (deployment && language === DEFAULT_LANGUAGE_NAME) {
                const provider = new AzureOpenAiInlineProvider({
                    deployment,
                    apiVersion,
                    proxyBase,
                });
                const inlineDisposable = monaco.languages.registerInlineCompletionsProvider(
                    language,
                    provider,
                );
                setAiStatus(`🟢 AI ghost text active (deployment: ${deployment})`);

                // Monaco only auto-fires the inline-completion provider on
                // EDIT events. For a "sit and wait → ghost text" UX,
                // re-trigger ~800 ms after the cursor stops moving.
                let idleTimer: number | undefined;
                const scheduleTrigger = () => {
                    if (idleTimer !== undefined) window.clearTimeout(idleTimer);
                    idleTimer = window.setTimeout(() => {
                        editor.trigger('idle-ai', 'editor.action.inlineSuggest.trigger', {});
                    }, 800);
                };
                const sub1 = editor.onDidChangeCursorPosition(scheduleTrigger);
                const sub2 = editor.onDidChangeModelContent(scheduleTrigger);
                window.setTimeout(() => editor.trigger('initial-ai', 'editor.action.inlineSuggest.trigger', {}), 1200);

                // Attach disposal to editor lifecycle.
                editor.onDidDispose(() => {
                    sub1.dispose();
                    sub2.dispose();
                    inlineDisposable.dispose();
                    if (idleTimer !== undefined) window.clearTimeout(idleTimer);
                });
            } else if (language === DEFAULT_LANGUAGE_NAME) {
                setAiStatus('⚪ AI ghost text disabled — run scripts/provision-azure-openai.ps1 to enable.');
            }

            /*
                The following code is for testing the language service client.
            */
            const localDebug = false;
            if (localDebug) {
                let commonMetadata: ISqlMetadata = {
                    defaultSchema: "", // "defaultSchemaTest",
                    outputNames: ["outputStream1"],
                    objects: [{
                        name: "table1",
                        prefix: "",
                        type: IMetadataType.Table,
                        children: [{
                            name: "table1_column1",
                            prefix: "table1",
                            type: IMetadataType.ColumnType,
                            children: [],
                        }, {
                            name: "table1_column2",
                            prefix: "table1",
                            type: IMetadataType.ColumnType,
                            children: [],
                        }, {
                            name: "table1_column3",
                            prefix: "table1",
                            type: IMetadataType.ColumnType,
                            children: [],
                        }],
                    }],
                };       

                const query1 = "SELECT tabl.col1 INTO output1 INTO input1";       
                LanguageServiceClient.DetectErrorsAsync(query1, commonMetadata).then((errors) => { 
                    console.log(errors.map(e => e.message));
                });

                const query2 = "SELECT * FROM table1";
                LanguageServiceClient.GetOutputSchemaAsync(query2, commonMetadata).then((schema) => {;
                    console.log(schema);
                });
            }
        }
        return () => {
            editor.dispose();
        };
    }, []);

    monaco.editor.getModels().forEach(item =>  {
        if (item.getLanguageId() !== 'json' ) {
            monaco.editor.setModelLanguage(item, language);
        }
    });
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {aiStatus && (
                <div
                    id="ai-status"
                    style={{
                        padding: '4px 12px',
                        background: '#1e1e1e',
                        color: '#cccccc',
                        fontSize: 11,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        borderBottom: '1px solid #333',
                    }}
                >
                    {aiStatus}
                </div>
            )}
            <div className="Editor" ref={divEl} style={{ flex: 1 }}></div>
        </div>
    );
};

function InitializeLanguageServiceFeaturesForSql(monacoInstance: any, editor: monaco.editor.IStandaloneCodeEditor) {
    if (!disableErrorDetection) {
        LanguageServiceClient.RegisterErrorMarkerProvider(editor.getModel());
    }
    LanguageServiceClient.InitializeLanguageService(monacoInstance, editor, DEFAULT_LANGUAGE_NAME);
}
