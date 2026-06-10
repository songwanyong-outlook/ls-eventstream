import * as React from 'react';
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { NavBar } from './Nav';
import { LanguageSwitcher } from './LanguageContextMenu';

// Styles definition
const stackStyles: IStackStyles = { root: { background: DefaultPalette.whiteTranslucent40 } };

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };

interface NaviBarStackProps {
    setLanguage: (languageId: string) => void;
    openMetadataEditor: () => void;
}

export const NaviBarStack: React.FunctionComponent<NaviBarStackProps> = (props) => {
    return (
        <Stack tokens={sectionStackTokens}>
            <Stack horizontal disableShrink horizontalAlign="space-between">
                <Stack >
                    <Stack styles={stackStyles}>
                        <LanguageSwitcher setLang={props.setLanguage}/>
                        <NavBar openMetadataEditor={props.openMetadataEditor} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
