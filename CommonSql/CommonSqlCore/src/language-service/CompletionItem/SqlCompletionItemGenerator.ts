// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { intellisenseFakedPrefix } from "../../../../CommonSqlUtils/CommonSqlCompletionItem";
import { IMetadataObject } from "../../../../CommonSqlUtils/MetadataTypes";

export const generateDocumentationMarkdown = (metadataObject: IMetadataObject, renderColumnsForStar: boolean): string => {
    let retMarkdown = "";
    const titleAndContents: [string, string][] = [];

    titleAndContents.push(["Name", metadataObject.name]);
    titleAndContents.push(["Type", metadataObject.type.toString()]);
    titleAndContents.push(["Scope", !metadataObject.prefix || metadataObject.prefix.includes(intellisenseFakedPrefix) ? null : metadataObject.prefix]);

    if (metadataObject.details) {
        titleAndContents.push(["Details", metadataObject.details]);
    }
    
    // extra doc. Currently only for builtin functions.
    if (metadataObject.doc) {
        titleAndContents.push(["Documentation", metadataObject.doc]);
    }

    for (const item of titleAndContents) {
        const title: string = item[0];
        const content: string = item[1];
        if (!content) {
            continue;
        }
        if (content.startsWith("\n\n")) {
            const contents = content.split("\n\n").filter(item => !!item);
            let formatedContent = "";
            contents.forEach(item => formatedContent = formatedContent.concat("  \n`", item, "`"));
            retMarkdown = retMarkdown.concat("**", title, "**", " &mdash; ", formatedContent, "  \n");
        } else {
            retMarkdown = retMarkdown.concat("**", title, "**", " &mdash; ", "`", content, "`", "  \n");
        }
    }

    if (metadataObject.type === "Table" || metadataObject.type === "View") {
        if (renderColumnsForStar) {
            retMarkdown = `Selecting all columns from \`${metadataObject.name}\`  \n`;
        }
        if (metadataObject.children.length !== 0) {
            metadataObject.children = metadataObject.children.filter(child => !!child && !!child.name);
            metadataObject.children.sort((a, b) => {
                return a.name < b.name ? -1 : 1; 
            });
            retMarkdown = retMarkdown.concat("\n---\n**Columns**  \n");
            const maxChildrenLimit = 30;
            for (let i = 0; i < metadataObject.children.length; i++) {
                const child = metadataObject.children[i];
    
                if (i >= maxChildrenLimit) {
                    retMarkdown = retMarkdown.concat("...... (", (metadataObject.children.length - maxChildrenLimit).toString(), " more items are hided)", "  \n");
                    break;
                }
                retMarkdown = retMarkdown.concat("- ", "`", child.name, "(", child.type.toString(), ")`", "  \n");
            }   
        } else {
            retMarkdown = retMarkdown.concat("\n---\nChild not found  \n");
        }
    } else {
        const childrenMap: Map<string, string[]> = new Map();
        for (const child of metadataObject.children) {
            const typeStr = child.type.toString();
            if (!childrenMap.has(typeStr)) {
                childrenMap.set(typeStr, [child.name]);
            } else {
                childrenMap.get(typeStr).push(child.name);
            }
        }

        if (metadataObject.children.length > 0) {
            retMarkdown = retMarkdown.concat("\n---  \n\n");

            const maxChildrenLimit = 10;
            const childenPairs: [string, string[]][] = Array.from(childrenMap.entries());
            childenPairs.sort((a, b) => {
                return a[0] < b[0] ? -1 : 1; 
            });


            for (const child of childenPairs) {
                retMarkdown = retMarkdown.concat("**", child[0], "**  \n");

                const children: string[] = child[1];
                children.sort((a, b) => {
                    return a < b ? -1 : 1; 
                });
                for (let i = 0; i < children.length; i++) {
                    if (i >= maxChildrenLimit) {
                        retMarkdown = retMarkdown.concat("\n...... (", (children.length - maxChildrenLimit).toString(), " more items are hided)", "  \n");
                        break;
                    }
                    retMarkdown = retMarkdown.concat("- ", "`", children[i], "`", "  \n");
                }
                retMarkdown = retMarkdown.concat('\n');
            }
        }
    }
    return retMarkdown;
};
