import ArticleCard from "@/shared/ui/ArticleCard";

import type { Article } from "@/types/article";

interface Props {
    featuredArticle?: Article;

    supportingArticles: Article[];

    isLoading: boolean;

    hasError: boolean;
}

export default function FeaturedArticles({
    featuredArticle,
    supportingArticles,
    isLoading,
    hasError,
}: Props) {
    if (isLoading) {
        return (
            <section className="bg-slate-50 py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-14">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                            Featured Stories
                        </p>

                        <h2 className="mt-4 text-5xl font-bold text-[#06154A]">
                            Stories Worth Reading
                        </h2>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                        <div className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white">
                            <div className="h-[500px] bg-slate-200" />

                            <div className="space-y-4 p-10">
                                <div className="h-4 w-28 rounded bg-slate-200" />

                                <div className="h-10 w-3/4 rounded bg-slate-200" />

                                <div className="h-5 w-full rounded bg-slate-200" />

                                <div className="h-5 w-5/6 rounded bg-slate-200" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            {Array.from({
                                length: 2,
                            }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-64 animate-pulse rounded-3xl border border-slate-200 bg-white"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (hasError) {
        return (
            <section className="bg-slate-50 py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="rounded-3xl border border-red-100 bg-red-50 px-10 py-16 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
                            Featured Stories
                        </p>

                        <h2 className="mt-4 text-4xl font-bold text-[#06154A]">
                            Articles are temporarily unavailable
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-600">
                            We couldn't load the featured
                            stories at the moment. The rest
                            of the website is still
                            available, and you can check
                            back shortly.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (!featuredArticle) {
        return (
            <section className="bg-slate-50 py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="rounded-3xl border border-slate-200 bg-white px-10 py-16 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                            Featured Stories
                        </p>

                        <h2 className="mt-4 text-4xl font-bold text-[#06154A]">
                            No Featured Article Yet
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-600">
                            We're preparing insightful
                            leadership stories. Check back
                            soon for fresh articles from
                            the GenLeaders team.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-14">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                        Featured Stories
                    </p>

                    <h2 className="mt-4 text-5xl font-bold text-[#06154A]">
                        Stories Worth Reading
                    </h2>
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                    <ArticleCard
                        featured
                        slug={featuredArticle.slug}
                        image={
                            featuredArticle.cover_image ??
                            ""
                        }
                        category={
                            featuredArticle.category
                        }
                        title={featuredArticle.title}
                        excerpt={
                            featuredArticle.excerpt
                        }
                        author={featuredArticle.author}
                        publishedAt={new Date(
                            featuredArticle.published_at,
                        ).toLocaleDateString()}
                        readTime={`${featuredArticle.reading_time} min`}
                    />

                    {supportingArticles.length > 0 && (
                        <div className="flex flex-col gap-8">
                            {supportingArticles.map(
                                (article) => (
                                    <ArticleCard
                                        key={article.id}
                                        slug={
                                            article.slug
                                        }
                                        image={
                                            article.cover_image ??
                                            ""
                                        }
                                        category={
                                            article.category
                                        }
                                        title={
                                            article.title
                                        }
                                        excerpt={
                                            article.excerpt
                                        }
                                        author={
                                            article.author
                                        }
                                        publishedAt={new Date(
                                            article.published_at,
                                        ).toLocaleDateString()}
                                        readTime={`${article.reading_time} min`}
                                    />
                                ),
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}