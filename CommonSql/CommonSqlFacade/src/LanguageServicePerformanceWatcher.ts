import { LanguageServiceFeature, sqlStmtTerminatorRegex } from "../../CommonSqlUtils/Utils";

const NEWLINE = "\n";
export const MaxPrecedingRequestsCount = 3;
export const MinimumLinesToTriggerReducing = 100;
const StringMatchBar = 0.9;

export class LSPerformanceWatcher {
    private inScriptReducingMode = false;

    private lsRequestsTimeoutStatus = [];

    private scriptTriggerTimeout: string = null;

    private readonly featureFlag = LanguageServiceFeature.WordCompletion | LanguageServiceFeature.ErrorDetection | LanguageServiceFeature.SignatureHelp;

    public reportTimeout(script: string, feature: LanguageServiceFeature) {
        if (!this.isFeatureEnabled(feature)) {
            return;
        }
        
        this.pushTimeoutToRequestQueue(true);
        if (this.inScriptReducingMode) {
            return;
        }
        
        if (this.lsRequestsTimeoutStatus.length < MaxPrecedingRequestsCount) {
            return;
        }

        let timeout = true;
        this.lsRequestsTimeoutStatus.forEach(item => timeout = timeout && item);
        if (timeout) {
            this.inScriptReducingMode = true;
            this.scriptTriggerTimeout = script;
        }
        return;
    }

    public reduceScript(script: string, feature: LanguageServiceFeature) {
        if (!this.inScriptReducingMode || !this.isFeatureEnabled(feature)) {
            return script;
        }
        
        if (script.split(NEWLINE).length < MinimumLinesToTriggerReducing || !this.stringHighlyMatch(this.scriptTriggerTimeout, script)) {
            this.resetReducingMode();
            return script;
        }
        return this.getLastStmt(script);
    }

    private getLastStmt(script: string): string {
        const stmts = script.split(sqlStmtTerminatorRegex);
        return stmts.pop();
    }

    private pushTimeoutToRequestQueue(timeout: boolean) {
        this.lsRequestsTimeoutStatus.push(timeout);
        if (this.lsRequestsTimeoutStatus.length > MaxPrecedingRequestsCount) {
            this.lsRequestsTimeoutStatus.shift();
        }
    }

    private resetReducingMode() {
        this.inScriptReducingMode = false;
        this.lsRequestsTimeoutStatus = []; 
        this.scriptTriggerTimeout = null;
    }

    private stringHighlyMatch(str1: string, str2: string) {
        if (!str1 || !str2) {
            return false;
        }

        const lenDis = Math.abs(str1.length - str2.length);
        if (lenDis > str1.length * StringMatchBar || lenDis > str2.length * StringMatchBar) {
            return false;
        }

        const minLen = Math.min(Math.floor(str1.length * StringMatchBar), Math.floor(str2.length * StringMatchBar));
        return this.strEqual(str1, str2, minLen);
    }

    private strEqual(str1: string, str2: string, comLen: number) {
        for (let i = 0; i < comLen; i++) {
            if (str1[i] !== str2[i]) {
                return false;
            }
        }
        return true;
    }

    private isFeatureEnabled(feature: LanguageServiceFeature) {
        return (feature & this.featureFlag) !== 0;
    }
}

