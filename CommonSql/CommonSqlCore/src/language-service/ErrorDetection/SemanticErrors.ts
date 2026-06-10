export class SemanticErrors{
    public static getTableExistsError(tableName: string): string {
        return `Result set name '${tableName}' already exists.`;
    }

    public static getInputNotExistsError(tableName: string): string {
        return `Input '${tableName}' does not exist.`;
    }

    public static getOutputNotExistsError(outputName: string): string {
        return `Output '${outputName}' does not exist.`;
    }
}