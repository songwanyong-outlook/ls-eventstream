import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { LanguageServiceClient } from '../languageServiceClient';
import { IMetadataType, ISqlMetadata } from 'event-stream-language-service-facade';

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

    useEffect(() => {
        if (divEl.current) {
            editor = monaco.editor.create(divEl.current, {
                value: '',
                language,
                wordBasedSuggestions: "off",
                automaticLayout: true, // This might severely impact performance, don't use in production.
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
    return <div className="Editor" ref={divEl}></div>;
};

function InitializeLanguageServiceFeaturesForSql(monacoInstance: any, editor: monaco.editor.IStandaloneCodeEditor) {
    if (!disableErrorDetection) {
        LanguageServiceClient.RegisterErrorMarkerProvider(editor.getModel());
    }
    LanguageServiceClient.InitializeLanguageService(monacoInstance, editor, DEFAULT_LANGUAGE_NAME);
}
