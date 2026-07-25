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

        case "paragraph": {
            const text =
                node.content
                    ?.map(
                        (child) =>
                            child.type === "text"
                                ? child.text ?? ""
                                : "",
                    )
                    .join("") ?? "";

            const isHashtagParagraph =
                text.trim().startsWith("#");

            return (
                <p
                    key={key}
                    className={
                        isHashtagParagraph
                            ? "mt-10 text-sm font-medium text-blue-600"
                            : "mb-6 text-lg leading-8 text-slate-700"
                    }
                >
                    {children}
                </p>
            );
        }

        case "heading": {
            const level =
                typeof node.attrs?.level === "number"
                    ? node.attrs.level
                    : 2;

            switch (level) {
                case 1:
                    return (
                        <h1
                            key={key}
                            className="mt-12 mb-6 text-4xl font-bold tracking-tight text-slate-900"
                        >
                            {children}
                        </h1>
                    );

                case 2:
                    return (
                        <h2
                            key={key}
                            className="mt-10 mb-5 text-3xl font-bold text-slate-900"
                        >
                            {children}
                        </h2>
                    );

                case 3:
                    return (
                        <h3
                            key={key}
                            className="mt-8 mb-4 text-2xl font-semibold text-slate-900"
                        >
                            {children}
                        </h3>
                    );

                default:
                    return (
                        <h4
                            key={key}
                            className="mt-6 mb-3 text-xl font-semibold text-slate-900"
                        >
                            {children}
                        </h4>
                    );
            }
        }

        case "bulletList":
            return (
                <ul
                    key={key}
                    className="mb-6 list-disc space-y-2 pl-6 text-lg leading-8 text-slate-700"
                >
                    {children}
                </ul>
            );

        case "orderedList":
            return (
                <ol
                    key={key}
                    className="mb-6 list-decimal space-y-2 pl-6 text-lg leading-8 text-slate-700"
                >
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
                <blockquote
                    key={key}
                    className="my-8 border-l-4 border-blue-600 bg-slate-50 py-4 pl-6 italic text-slate-700"
                >
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
        <article className="text-slate-700">
            {document.content.map(
                (node, index) =>
                    renderNode(
                        node,
                        `article-node-${index}`,
                    ),
            )}
        </article>
    );
}