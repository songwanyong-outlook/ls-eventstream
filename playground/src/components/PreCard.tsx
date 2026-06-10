import { DefaultButton, Stack } from '@fluentui/react';
import * as React from 'react';
import { useConst } from '@fluentui/react-hooks';
import { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { Presentations } from './Presentations';

const DEFAULT_FEATURE = "Intellisense";

interface PreCardStackProps {
    updateCode: (text: string) => void;
}

export const PreCardStack: React.FunctionComponent<PreCardStackProps> = (props) => {
    const [feature, setFeature] = React.useState(DEFAULT_FEATURE);
    return <Stack>
        <h3 style={{ textAlign : "center" }}>Feature Presentation</h3>
        <FeatureSwitcher setFeature={setFeature}/>
        <PreCard feature={feature}/>
        <DefaultButton text='Insert sample code to playground' onClick={() => {
            props.updateCode(Presentations[feature].sampleCode);
        }} />
    </Stack>;
};

interface preCardProps {
    feature: string;
}

const PreCard: React.FunctionComponent<preCardProps> = (props) => {
    const feature = props.feature;
    return <Stack>
        <div style={{ width: 480, margin: 10, marginTop: 0 }}>
            <p className='PreDescription'>{Presentations[feature].description}</p>
        </div>
        <img className='PreGIF' width={480} height={360} src={Presentations[feature].gif} alt={feature}/>
    </Stack>;
};

interface featureMenuProps {
    setFeature: (languageId: string) => void;
}

const FeatureSwitcher: React.FunctionComponent<featureMenuProps> = (props) => {
    const [feature, setFeatureLocal] = React.useState(DEFAULT_FEATURE);
    
    const setFeature = (f: string) => {
        setFeatureLocal(f);
        props.setFeature(f);
    };

    const menuProps = useConst<IContextualMenuProps>(() => ({
        shouldFocusOnMount: true,
        alignTargetEdge: true,
        items: [
            { key: 'Intellisense', text: 'Intellisense', onClick: () => setFeature("Intellisense") },
            { key: 'Syntax Highlight', text: 'Syntax Highlight', onClick: () => setFeature("SyntaxHighlight"), disabled: true },
            { key: 'Error Detection', text: 'Error Detection', onClick: () => setFeature("ErrorDetection"), disabled: true },
            { key: 'Quick Info', text: 'Quick Info', onClick: () => setFeature("QuickInfo"), disabled: true },
            { key: 'Function Signature Help ', text: 'Function Signature Help ', onClick: () => setFeature("FunctionSignatureHelp"), disabled: true },
            { key: 'Code Snippet', text: 'Code Snippet', onClick: () => setFeature("CodeSnippet"), disabled: true },
            { key: 'Code Folding', text: 'Code Folding', onClick: () => setFeature("CodeFolding"), disabled: true },
            { key: 'Code Formatting', text: 'Code Formatting', onClick: () => setFeature("CodeFormatting") },
            { key: 'Intellicode', text: 'Intellicode', onClick: () => setFeature("Intellicode"), disabled: true },
            { key: 'Auto Saving', text: 'Auto Saving', onClick: () => setFeature("AutoSaving"), disabled: true },
        ],
    }));

    return <DefaultButton className='FeatureMenu' text={feature} menuProps={menuProps} />;
};
