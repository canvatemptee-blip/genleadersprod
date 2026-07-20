import type {
    ArticleEditorValues,
} from "@/types/articleEditor";


interface ArticleContentFieldsProps {
    values:
    ArticleEditorValues;

    onTitleChange: (
        title: string,
    ) => void;

    onSlugChange: (
        slug: string,
    ) => void;

    onExcerptChange: (
        excerpt: string,
    ) => void;

    onContentChange: (
        content: string,
    ) => void;
}


export default function ArticleContentFields({
    values,
    onTitleChange,
    onSlugChange,
    onExcerptChange,
    onContentChange,
}: ArticleContentFieldsProps) {
    return (
        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div>
                <label
                    htmlFor="article-title"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Title
                </label>

                <input
                    id="article-title"
                    value={
                        values.title
                    }
                    onChange={(
                        event,
                    ) =>
                        onTitleChange(
                            event.target.value,
                        )
                    }
                    required
                    minLength={5}
                    maxLength={255}
                    placeholder="Article title"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
            </div>


            <div>
                <label
                    htmlFor="article-slug"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Slug
                </label>

                <input
                    id="article-slug"
                    value={
                        values.slug
                    }
                    onChange={(
                        event,
                    ) =>
                        onSlugChange(
                            event.target.value,
                        )
                    }
                    required
                    minLength={5}
                    maxLength={255}
                    pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                    placeholder="article-url-slug"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-2 text-sm text-slate-500">
                    Public URL: /articles/
                    {values.slug ||
                        "article-slug"}
                </p>
            </div>


            <div>
                <label
                    htmlFor="article-excerpt"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Excerpt
                </label>

                <textarea
                    id="article-excerpt"
                    value={
                        values.excerpt
                    }
                    onChange={(
                        event,
                    ) =>
                        onExcerptChange(
                            event.target.value,
                        )
                    }
                    required
                    minLength={10}
                    rows={4}
                    placeholder="A short summary shown on article cards..."
                    className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-7 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
            </div>


            <div>
                <label
                    htmlFor="article-content"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Article Content
                </label>

                <textarea
                    id="article-content"
                    value={
                        values.content
                    }
                    onChange={(
                        event,
                    ) =>
                        onContentChange(
                            event.target.value,
                        )
                    }
                    required
                    rows={22}
                    placeholder={`Write the article here.

Leave an empty line between paragraphs.

Each paragraph will be stored as structured article content.`}
                    className="w-full resize-y rounded-xl border border-slate-300 px-5 py-4 leading-8 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-2 text-sm text-slate-500">
                    Separate paragraphs with
                    an empty line.
                </p>
            </div>
        </section>
    );
}