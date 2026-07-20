import type {
    ArticleContentNode,
    ArticleDocument,
} from "@/types/article";

interface ArticleContentProps {
    document: ArticleDocument;
}

function renderNode(
    node: ArticleContentNode,
    key: string,
): React.ReactNode {
    const children = node.content?.map(
        (child, index) =>
            renderNode(
                child,
                `${key}-${index}`,
            ),
    );

    switch (node.type) {
        case "text":
            return node.text ?? "";

        case "paragraph":
            return (
                <p key={key}>
                    {children}
                </p>
            );

        case "heading": {
            const level =
                typeof node.attrs?.level === "number"
                    ? node.attrs.level
                    : 2;

            switch (level) {
                case 1:
                    return (
                        <h1 key={key}>
                            {children}
                        </h1>
                    );

                case 2:
                    return (
                        <h2 key={key}>
                            {children}
                        </h2>
                    );

                case 3:
                    return (
                        <h3 key={key}>
                            {children}
                        </h3>
                    );

                default:
                    return (
                        <h4 key={key}>
                            {children}
                        </h4>
                    );
            }
        }

        case "bulletList":
            return (
                <ul key={key}>
                    {children}
                </ul>
            );

        case "orderedList":
            return (
                <ol key={key}>
                    {children}
                </ol>
            );

        case "listItem":
            return (
                <li key={key}>
                    {children}
                </li>
            );

        case "blockquote":
            return (
                <blockquote key={key}>
                    {children}
                </blockquote>
            );

        case "hardBreak":
            return <br key={key} />;

        default:
            return (
                <div key={key}>
                    {children}
                </div>
            );
    }
}

export default function ArticleContent({
    document,
}: ArticleContentProps) {
    if (
        document.type !== "doc" ||
        !document.content
    ) {
        return null;
    }

    return (
        <>
            {document.content.map(
                (node, index) =>
                    renderNode(
                        node,
                        `article-node-${index}`,
                    ),
            )}
        </>
    );
}