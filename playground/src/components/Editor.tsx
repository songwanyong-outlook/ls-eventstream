import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { LanguangeServiceClient } from '../languageServiceClient';

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
                wordBasedSuggestions: false,
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
        LanguangeServiceClient.RegisterErrorMarkerProvider(editor);
    }
    LanguangeServiceClient.InitializeLanguageService(monacoInstance, editor, DEFAULT_LANGUAGE_NAME);
}
