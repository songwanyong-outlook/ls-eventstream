// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, IRange, languages, Position, Token } from "monaco-editor";
import { LoadMetadataCommand } from '../../../CommonSqlUtils/Utils';
import { DOT } from "../../../CommonSqlUtils/Constants";
import { LanguageServiceConfig } from "../SqlUtils/ServiceProviderUtils";
import { CommonSqlMetadataProvider, LoadingStatus } from "./CommonSqlMetadataProvider";

interface Word {
    line: number;
    column: number;
    text: string;
}

const loadingLabel = "loading...";
const loadSucceededLabel = "load succeeded";
const loadFailedLabel = "load failed";

export class CommonSqlCodeLensProvider {
    private loadedDatabases: string[] = [];
    private textModel: editor.ITextModel;

    constructor(private languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig.monacoInstance.editor.registerCommand(
            LoadMetadataCommand.id, 
            async (accessor, database: string) => {
                const availableDatabases = this.languageServiceConfig.dynamicMetadataLoadingConfig?.getAvailableDynamicMetadata 
                    ? ((await this.languageServiceConfig.dynamicMetadataLoadingConfig?.getAvailableDynamicMetadata())?.databases ?? [])
                    : [];

                if (!database 
                    || !this.languageServiceConfig.dynamicMetadataLoadingConfig?.loadMetadata
                    || availableDatabases.indexOf(database) < 0
                ) {
                    return; 
                }   
                CommonSqlMetadataProvider.setLoadStatus(database, LoadingStatus.loading);
                this.manuallyTriggerRefresh(this.textModel);
                this.loadMetadata(database);
            });
    }

    async provideCodeLenses(model: editor.ITextModel, token: CancellationToken): Promise<languages.CodeLensList> {
        this.textModel = model;
        this.loadedDatabases = CommonSqlMetadataProvider.getLoadedDynamicMetadata();
        const script = model.getValue();
        const rawTokens = this.languageServiceConfig.monacoInstance.editor
            .tokenize(script, this.languageServiceConfig.languageName);
        const markedWords: Word[] = [];
        const specialTokenTags = ["comment", "string", "identifier.quote"];
        const availableDatabases = this.languageServiceConfig.dynamicMetadataLoadingConfig?.getAvailableDynamicMetadata 
            ? ((await this.languageServiceConfig.dynamicMetadataLoadingConfig?.getAvailableDynamicMetadata())?.databases ?? [])
            : [];


        let previousTokenIsDOT = false;
        for (let line = 0; line < rawTokens.length; line++) {
            for (const t of rawTokens[line]) {
                if(specialTokenTags.some(specialToken => t.type.includes(specialToken))) {
                    continue;
                }
                
                const currentToken = this.getTokenWord(model, line + 1, t);
                if (availableDatabases.indexOf(currentToken.text) > -1 && (
                        this.loadedDatabases.indexOf(currentToken.text) < 0 || 
                        CommonSqlMetadataProvider.inLoadingStatus(currentToken.text, LoadingStatus.loadSucceeded) ||
                        CommonSqlMetadataProvider.inLoadingStatus(currentToken.text, LoadingStatus.loadFailed)
                    ) &&
                    markedWords.map(w => w.text).indexOf(currentToken.text) < 0 &&
                    !previousTokenIsDOT
                ) {
                    markedWords.push(currentToken);
                }
                previousTokenIsDOT = currentToken.text === DOT;
            }
        }

        const lenses: languages.CodeLens[] = [];
        const generateCodeLens = (range, commandId, commandTitle) => {
            return {
                range,
                command: {
                    id: commandId,
                    title: commandTitle,
                } as languages.Command
            } as languages.CodeLens;
        };

        for (const w of markedWords) {
            const range = this.getRangeByWord(w);
            if (CommonSqlMetadataProvider.inLoadingStatus(w.text, LoadingStatus.loading)) {
                lenses.push(generateCodeLens(range, loadingLabel, loadingLabel));
                continue;
            }

            if (CommonSqlMetadataProvider.inLoadingStatus(w.text, LoadingStatus.loadSucceeded)) {
                lenses.push(generateCodeLens(range, loadSucceededLabel, loadSucceededLabel));
                continue;
            }

            if (CommonSqlMetadataProvider.inLoadingStatus(w.text, LoadingStatus.loadFailed)) {
                lenses.push(generateCodeLens(range, loadFailedLabel, loadFailedLabel));
                continue;
            }

            lenses.push({
                range,
                command: {
                    id: LoadMetadataCommand.id,
                    title: `load ${w.text}`,
                    arguments: [w.text]
                } as languages.Command
            } as languages.CodeLens);
        }

        CommonSqlMetadataProvider.resetLoadStatus();
        return {
            lenses,
            dispose: () => {}
        } as languages.CodeLensList;
    }

    async loadMetadata(databaseName: string) {
        this.languageServiceConfig.dynamicMetadataLoadingConfig.loadMetadata(databaseName).then(databaseMetadata => {
            CommonSqlMetadataProvider.addDynamicMetadata(databaseMetadata);
            CommonSqlMetadataProvider.setLoadStatus(databaseName, LoadingStatus.loadSucceeded);
            this.manuallyTriggerRefresh(this.textModel);
        }, (reason) => {
            CommonSqlMetadataProvider.setLoadStatus(databaseName, LoadingStatus.loadFailed);
            this.manuallyTriggerRefresh(this.textModel);
        });
    }

    getTokenWord(model: editor.ITextModel, lineNumber: number, token: Token): Word {
        const position = {
            lineNumber,
            column: token.offset + 1,
        } as Position;
        return {
            line: lineNumber,
            column: token.offset + 1,
            text: model.getWordAtPosition(position)?.word
        } as Word;
    }

    manuallyTriggerRefresh(model: editor.ITextModel) {
        model.setValue(model.getValue());
    }

    getRangeByWord(word: Word): IRange {
        return {
            startLineNumber: word.line,
            endLineNumber: word.line,
            startColumn: word.column,
            endColumn: word.column + word.text?.length ?? 0
        } as IRange;
    }
}

