import ArticleCard from "@/shared/ui/ArticleCard";

import type { Article } from "@/types/article";

interface Props {
    articles: Article[];
    isLoading: boolean;
    hasError: boolean;
}

export default function LatestArticles({
    articles,
    isLoading,
    hasError,
}: Props) {
    if (isLoading) {
        return (
            <section className="py-28">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-14">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                            Latest Articles
                        </p>

                        <h2 className="mt-3 text-5xl font-bold text-[#06154A]">
                            Fresh Insights Every Week
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white"
                            >
                                <div className="h-60 bg-slate-200" />

                                <div className="space-y-4 p-8">
                                    <div className="h-4 w-24 rounded bg-slate-200" />

                                    <div className="h-8 w-5/6 rounded bg-slate-200" />

                                    <div className="h-4 w-full rounded bg-slate-200" />

                                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (hasError) {
        return (
            <section className="py-28">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="rounded-3xl border border-red-100 bg-red-50 px-10 py-16 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
                            Latest Articles
                        </p>

                        <h2 className="mt-4 text-4xl font-bold text-[#06154A]">
                            Unable to load articles
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-600">
                            Our latest articles couldn't be loaded at the moment.
                            Everything else on GenLeaders is still available while
                            we reconnect to our content service.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (articles.length === 0) {
        return (
            <section className="py-28">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="rounded-3xl border border-slate-200 bg-white px-10 py-16 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                            Latest Articles
                        </p>

                        <h2 className="mt-4 text-4xl font-bold text-[#06154A]">
                            No Articles Published Yet
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-600">
                            We're working on new insights and leadership stories.
                            Stay tuned for fresh content from GenLeaders.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-14">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                        Latest Articles
                    </p>

                    <h2 className="mt-3 text-5xl font-bold text-[#06154A]">
                        Fresh Insights Every Week
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {articles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            slug={article.slug}
                            image={article.cover_image ?? ""}
                            title={article.title}
                            excerpt={article.excerpt}
                            category={article.category}
                            author={article.author}
                            publishedAt={new Date(
                                article.published_at,
                            ).toLocaleDateString()}
                            readTime={`${article.reading_time} min`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}