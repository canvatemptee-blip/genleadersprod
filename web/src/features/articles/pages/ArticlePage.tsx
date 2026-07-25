import { useParams } from "react-router-dom";

import ArticleContent from "../components/ArticleContent";

import { useArticle } from "@/shared/hooks/useArticles";

export default function ArticlePage() {
    const { slug = "" } = useParams();

    const {
        data: article,
        isLoading,
        error,
    } = useArticle(slug);

    if (isLoading) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg text-slate-600">
                    Loading article...
                </p>
            </main>
        );
    }

    if (error || !article) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg text-red-600">
                    Article not found.
                </p>
            </main>
        );
    }

    return (
        <article className="py-24">
            <div className="mx-auto max-w-4xl px-6">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
                    {article.category}
                </p>

                <h1 className="text-5xl font-bold leading-tight text-[#06154A] lg:text-6xl">
                    {article.title}
                </h1>

                <p className="mt-6 text-xl leading-8 text-slate-600">
                    {article.excerpt}
                </p>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-slate-500">
                    <span>
                        {article.author}
                    </span>

                    <span>
                        {new Date(
                            article.published_at,
                        ).toLocaleDateString()}
                    </span>

                    <span>
                        {article.reading_time} min read
                    </span>
                </div>

                {article.cover_image && (
                    <img
                        src={article.cover_image}
                        alt={article.title}
                        className="mt-12 h-112.5 w-full rounded-3xl object-cover"
                    />
                )}

                <div className="prose prose-lg mt-14 max-w-none">
                    {article.content ? (
                        <ArticleContent
                            document={
                                article.content
                            }
                        />
                    ) : (
                        <p>
                            Article content is unavailable.
                        </p>
                    )}
                </div>

                {(article.featured_person_name ||
                    article.featured_person_linkedin) && (
                        <section className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8">
                            <h2 className="text-2xl font-bold text-[#06154A]">
                                Featured Person
                            </h2>

                            {article.featured_person_name && (
                                <p className="mt-3 text-lg font-semibold text-slate-800">
                                    {article.featured_person_name}
                                </p>
                            )}

                            {article.featured_person_linkedin && (
                                <a
                                    href={
                                        article.featured_person_linkedin
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center rounded-xl bg-[#0077B5] px-6 py-3 font-semibold text-white transition hover:bg-[#005F91]"
                                >
                                    Connect on LinkedIn
                                </a>
                            )}
                        </section>
                    )}
            </div>
        </article>
    );
}