import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { GetMetadataStr } from '../languageServiceClient';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';

// Since packaging is done by you, you need
// to instruct the editor how you named the
// bundles that contain the web workers.
(self as any).MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === 'json') {
            return './json.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
    },
};

interface IMetadataEditorCoreProps {
    setMonaco: (ins) => void;
}

const MetadataEditorCore: React.FC<IMetadataEditorCoreProps> = (props) => {
    const divEl = useRef<HTMLDivElement>(null);
    const language = "json";
    const metadataStr = GetMetadataStr();
    let editor: monaco.editor.IStandaloneCodeEditor;

    useEffect(() => {
        if (divEl.current) {
            editor = monaco.editor.create(divEl.current, {
                value: metadataStr,
                language: language,
                wordBasedSuggestions: false,
                folding: true,
            });
        }
        props.setMonaco(monaco);
        return () => {
            editor.dispose();
        };
    }, []);

    return <div className='MetadataEditor' ref={divEl}></div>;
};

interface ICommandBarProps {
    setCloseSignal: () => void;
    setSaveSignal: () => void;
}

const MetadataEditorCommandBar: React.FunctionComponent<ICommandBarProps> = (props) => {
    return (
        <div>
            <CommandBar
                items={label}
                farItems={[
                    {
                        key: 'Apply',
                        text: 'Apply',
                        iconProps: { iconName: 'Save' },
                        onClick: () => {
                            props.setSaveSignal();
                        },
                        split: true,
                        ariaLabel: 'Apply',
                    },
                    {
                        key: 'Cancel',
                        text: 'Cancel',
                        iconProps: { iconName: 'Cancel' },
                        onClick: () => {
                            props.setCloseSignal();
                        },
                        split: true,
                        ariaLabel: 'Cancel',
                    },
                ]}
            />
        </div>
    );
};
  
const label: ICommandBarItemProps[] = [
    {
        key: 'Label',
        text: 'Metadata Editor',
        buttonStyles: { label: { fontSize: 15,  fontWeight: 600, fontFamily: 'Segoe UI' } },
    },
];

interface IMetadataEditorProps {
    closeEditor: () => void;
    saveContent: () => void;
    setMonaco: (ins) => void;
}

export const MetadataEditor: React.FunctionComponent<IMetadataEditorProps> = (props) => {
    const closeAction = () => {
        props.closeEditor();
    };

    return (
        <div>
            <MetadataEditorCommandBar setSaveSignal={props.saveContent} setCloseSignal={closeAction}/>
            <MetadataEditorCore setMonaco={props.setMonaco}/>
        </div>
    );
};
