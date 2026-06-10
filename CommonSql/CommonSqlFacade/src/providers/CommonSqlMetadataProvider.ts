import { IMetadataObject, ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { LanguageServiceConfig } from "../SqlUtils/ServiceProviderUtils";

export enum LoadingStatus {
    loading,
    loadSucceeded,
    loadFailed,
}

export class CommonSqlMetadataProvider {
    private static dynamicMetadata: Map<string, IMetadataObject> = new Map();
    private static databasesInLoadingStatus: Set<string> = new Set();
    private static databaseInLoadSucceededStatus: Set<string> = new Set();
    private static databaseInLoadFailedStatus: Set<string> = new Set();

    public static getMetadata(languageServiceConfig: LanguageServiceConfig): ISqlMetadata {
        let metadata: ISqlMetadata = null;
        try {
            metadata = languageServiceConfig.metadataDelegate();
        } catch {
            metadata = null;
        }

        const dynamicMetadata = Array.from(CommonSqlMetadataProvider.dynamicMetadata.values());
        if (!!metadata) {
            metadata.objects = !!metadata.objects ? metadata.objects.concat(dynamicMetadata) : dynamicMetadata;
            return metadata;
        } else {
            return {
                objects: dynamicMetadata,
                defaultSchema: ""
            } as ISqlMetadata;
        }
    }

    public static addDynamicMetadata(metadata: IMetadataObject) {
        CommonSqlMetadataProvider.dynamicMetadata.set(metadata.name, metadata); 
    }

    public static getLoadedDynamicMetadata(): string[] {
        return Array.from(CommonSqlMetadataProvider.dynamicMetadata.keys());
    }

    public static setLoadStatus(database: string, status: LoadingStatus) {
        switch (status) {
            case LoadingStatus.loading:
                this.databasesInLoadingStatus.add(database);
                break;
            case LoadingStatus.loadSucceeded:
                if (this.databasesInLoadingStatus.has(database)) {
                    this.databasesInLoadingStatus.delete(database);
                }
                this.databaseInLoadSucceededStatus.add(database);
                break;
            case LoadingStatus.loadFailed:
                if (this.databasesInLoadingStatus.has(database)) {
                    this.databasesInLoadingStatus.delete(database);
                }
                this.databaseInLoadFailedStatus.add(database);
                break;
            default:
                break;
        }
    }

    public static inLoadingStatus(database: string, status: LoadingStatus): boolean {
        switch (status) {
            case LoadingStatus.loading:
                return this.databasesInLoadingStatus.has(database);
            case LoadingStatus.loadSucceeded:
                return this.databaseInLoadSucceededStatus.has(database);
            case LoadingStatus.loadFailed:
                return this.databaseInLoadFailedStatus.has(database);
            default:
                return false;
        }
    }

    public static resetLoadStatus() {
        this.databaseInLoadSucceededStatus.clear();
        this.databasesInLoadingStatus.clear();
        this.databaseInLoadFailedStatus.clear();
    }

    public static resetDynamicMetadataCache() {
        this.resetLoadStatus();
        this.dynamicMetadata.clear();
    }
}
