import * as React from 'react';
import { Nav, INavLink, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { initializeIcons } from '@fluentui/react';

const navStyles: Partial<INavStyles> = {
    root: {
        width: 'auto',
        height: 'auto',
        boxSizing: 'border-box',
        overflowY: 'auto',
    },
    // these link styles override the default truncation behavior
    link: {
        whiteSpace: 'normal',
        lineHeight: 'inherit',
    },
};

initializeIcons();

const GrammarLink = 'https://powerbi.visualstudio.com/PowerBIClients/_git/LanguageService?path=/CommonSql/CommonSqlCore/src/language-service/Grammar/SqlParser.g4';
const CodeRepoLink = 'https://powerbi.visualstudio.com/PowerBIClients/_git/LanguageService';
const DesignSpecLink = 'https://aka.ms/Trident-Lang-Svc-Design-Spec';
const grammarImplementationLink = 'https://aka.ms/Trident-Lang-Svc-Grammar-Implementation';
const sampleCodeLink = 'https://powerbi.visualstudio.com/PowerBIClients/_git/LanguageService?path=/playground/src/languageServiceClient.ts';

interface INavBarProps {
    openMetadataEditor: () => void;
}

export const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
    return (
        <Nav
            styles={navStyles}
            groups={[
                {
                    links: [
                        {
                            name: 'Grammar',
                            url: GrammarLink,
                            icon: 'FileSQL',
                            title: GrammarLink,
                        },
                        {
                            name: 'Code Repo',
                            url: CodeRepoLink,
                            icon: 'Home',
                            title: CodeRepoLink,
                        },
                        {
                            name: 'Sample Code to implement LS',
                            url: sampleCodeLink,
                            icon: 'FileCode',
                            title: sampleCodeLink,
                        },
                        {
                            name: 'Edit Metadata Config',
                            url: '',
                            icon: 'ConfigurationSolid',
                            onClick: () => props.openMetadataEditor(),
                        },
                        {
                            name: 'Doc',
                            url: '',
                            // icon: 'Documentation',
                            links: [
                                {
                                    name: 'Design Spec',
                                    url: DesignSpecLink,
                                    icon: 'WordDocument',
                                    title: DesignSpecLink,
                                },
                                {
                                    name: 'Grammar Best Practice',
                                    url: grammarImplementationLink,
                                    icon: 'WordDocument',
                                    title: grammarImplementationLink,
                                },
                            ],
                        },
                        // {
                        //     name: 'Features',
                        //     url: '',
                        //     disabled: true,
                        //     icon: 'Language Service Features',
                        // },
                    ],
                },
            ]}
        />
    );
};
