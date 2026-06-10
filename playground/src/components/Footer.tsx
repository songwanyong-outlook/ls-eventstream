import React from 'react';
import { EnableGotoDefinition } from '../../../CommonSql/CommonSqlUtils/LanguageFeatureFlag';

export const Footer: React.FC = () => {
    return EnableGotoDefinition ? <div className="Footer">
        <h3>Definiton: <span id="definition-span"></span></h3>
        <span id="definition-update-time"></span>
    </div> : <div className="Footer"></div>;
};
