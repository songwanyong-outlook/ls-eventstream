import * as monaco from "monaco-editor";
import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles } from '@fluentui/react';
import { Editor, DEFAULT_LANGUAGE_NAME } from "./Editor";
import { NaviBarStack } from './InnerStack';
import { MetadataEditor } from './MetadataEditor';
import { ConfigureMetadata } from "../languageServiceClient";
import { PreCardStack } from "./PreCard";

// Styles definition
const stackStyles: IStackStyles = { root: { background: DefaultPalette.white } };

export const OuterStack: React.FunctionComponent = () => {
    const [languageName, setLang] = React.useState(DEFAULT_LANGUAGE_NAME);
    const [closeMetadataEditorSig, setCloseSig] = React.useState(true);
    const [monacoInstance, setMonaco] = React.useState(null);
    const [editor, setEditor] = React.useState(null);

    const openMetadataEditor = () => {
        setCloseSig(false);
    };

    const closeMetadataEditor = () => {
        setCloseSig(true);
    };

    const saveAction = () => {
        const metadataStr = (monacoInstance as typeof monaco).editor.getModels().filter(item => item.getLanguageId() === 'json')
            .shift()
            .getValue();
        ConfigureMetadata(metadataStr);
        setCloseSig(true);
    };

    const setLanguage = (languageId: string) => {
        setLang(languageId);
    };

    return (
        <Stack horizontal styles={stackStyles}>
            <Stack.Item className='OuterStackItemStyles'>
                <NaviBarStack setLanguage={setLanguage} openMetadataEditor={openMetadataEditor} />
            </Stack.Item>
            <Stack.Item grow={1} basis={1} style={{ minWidth:0 }}>
                <Editor language={languageName} setEditor={setEditor}/>
            </Stack.Item>
            <Stack.Item className='PreCardStackItemStyles'>
                <PreCardStack updateCode={(text: string) => {
                    editor.executeEdits('feature presentation', [{ range: editor.getModel().getFullModelRange(), text }]);
                }}/>
            </Stack.Item>
            {!closeMetadataEditorSig && 
                <Stack.Item grow={1} basis={1} style={{ minWidth:0 }}>
                    <MetadataEditor closeEditor={closeMetadataEditor} saveContent={saveAction} setMonaco={setMonaco} />
                </Stack.Item>
            }
        </Stack>
    );
};
