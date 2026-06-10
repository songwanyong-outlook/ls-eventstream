import * as React from 'react';
import { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useConst } from '@fluentui/react-hooks';

interface contextMenuProps {
    setLang: (languageId: string) => void;
}

export const LanguageSwitcher: React.FunctionComponent<contextMenuProps> = (props) => {
    const DEFAULT_LANGUAGE = "TSQL";
    const [lang, setLang] = React.useState(DEFAULT_LANGUAGE);
    
    const setLanguage = (language: string) => {
        setLang(language);
        props.setLang(language);
    };

    const menuProps = useConst<IContextualMenuProps>(() => ({
        shouldFocusOnMount: true,
        alignTargetEdge: true,
        items: [
            { key: 'TSQL', text: 'TSQL', onClick: () => setLanguage("TSQL") },
            { key: 'Python', text: 'Python', onClick: () => setLanguage("Python"), disabled: true },
        ],
    }));

    return <DefaultButton className='ContextMenu' text={lang} menuProps={menuProps} />;
};
