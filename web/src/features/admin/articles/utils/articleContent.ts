import type {
    ArticleDocument as ApiArticleDocument,
} from "@/types/article";

import type {
    ArticleDocument as EditorArticleDocument,
} from "@/types/articleEditor";


export function contentToDocument(
    value: string,
): EditorArticleDocument {
    const paragraphs =
        value
            .split(/\n\s*\n/)
            .map(
                (paragraph) =>
                    paragraph.trim(),
            )
            .filter(Boolean);

    return {
        type: "doc",

        content:
            paragraphs.map(
                (paragraph) => ({
                    type:
                        "paragraph",

                    content: [
                        {
                            type:
                                "text",

                            text:
                                paragraph,
                        },
                    ],
                }),
            ),
    };
}


export function documentToText(
    document:
        | ApiArticleDocument
        | undefined,
): string {
    if (
        !document ||
        !Array.isArray(
            document.content,
        )
    ) {
        return "";
    }

    return document.content
        .map(
            (paragraph) => {
                if (
                    !Array.isArray(
                        paragraph.content,
                    )
                ) {
                    return "";
                }

                return paragraph.content
                    .map(
                        (node) =>
                            node.text ??
                            "",
                    )
                    .join("");
            },
        )
        .join("\n\n");
}