import {
    useSearchParams,
} from "react-router-dom";

import ArticleCard from "@/shared/ui/ArticleCard";

import {
    useArticles,
} from "@/shared/hooks/useArticles";

import {
    useCategories,
} from "@/shared/hooks/useCategories";

export default function ArticlesPage() {
    const [
        searchParams,
        setSearchParams,
    ] = useSearchParams();

    const selectedCategory =
        searchParams.get("category") ??
        undefined;

    const {
        data: articles = [],
        isLoading: articlesLoading,
        error: articlesError,
    } = useArticles(
        selectedCategory,
    );

    const {
        data: categories = [],
        isLoading: categoriesLoading,
        error: categoriesError,
    } = useCategories();

    const handleCategoryChange = (
        category?: string,
    ) => {
        if (category) {
            setSearchParams({
                category,
            });

            return;
        }

        setSearchParams({});
    };

    return (
        <main className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                        Articles
                    </p>

                    <h1 className="mt-3 text-5xl font-bold text-[#06154A]">
                        Insights & Stories
                    </h1>

                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                        Explore leadership,
                        innovation, AI, startups and
                        business through carefully
                        curated articles.
                    </p>
                </div>

                {!categoriesError && (
                    <div
                        className="mb-12 flex flex-wrap gap-3"
                        aria-label="Article categories"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                handleCategoryChange()
                            }
                            disabled={
                                categoriesLoading
                            }
                            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${!selectedCategory
                                    ? "bg-[#06154A] text-white"
                                    : "border border-slate-300 bg-white text-slate-700 hover:border-[#06154A] hover:text-[#06154A]"
                                }`}
                        >
                            All
                        </button>

                        {categories.map(
                            (category) => (
                                <button
                                    key={
                                        category.id
                                    }
                                    type="button"
                                    onClick={() =>
                                        handleCategoryChange(
                                            category.slug,
                                        )
                                    }
                                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${selectedCategory ===
                                            category.slug
                                            ? "bg-[#06154A] text-white"
                                            : "border border-slate-300 bg-white text-slate-700 hover:border-[#06154A] hover:text-[#06154A]"
                                        }`}
                                >
                                    {
                                        category.name
                                    }
                                </button>
                            ),
                        )}
                    </div>
                )}

                {articlesLoading && (
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({
                            length: 6,
                        }).map(
                            (_, index) => (
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
                            ),
                        )}
                    </div>
                )}

                {!articlesLoading &&
                    articlesError && (
                        <div className="rounded-3xl border border-red-100 bg-red-50 px-10 py-16 text-center">
                            <h2 className="text-3xl font-bold text-[#06154A]">
                                Unable to load articles
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                                The article collection
                                couldn't be loaded at the
                                moment. Please try again
                                shortly.
                            </p>
                        </div>
                    )}

                {!articlesLoading &&
                    !articlesError &&
                    articles.length === 0 && (
                        <div className="rounded-3xl border border-slate-200 bg-white px-10 py-16 text-center">
                            <h2 className="text-3xl font-bold text-[#06154A]">
                                No articles found
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                                There are currently no
                                published articles in this
                                category.
                            </p>
                        </div>
                    )}

                {!articlesLoading &&
                    !articlesError &&
                    articles.length > 0 && (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {articles.map(
                                (article) => (
                                    <ArticleCard
                                        key={
                                            article.id
                                        }
                                        slug={
                                            article.slug
                                        }
                                        title={
                                            article.title
                                        }
                                        excerpt={
                                            article.excerpt
                                        }
                                        image={
                                            article.cover_image ??
                                            ""
                                        }
                                        category={
                                            article.category
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
        </main>
    );
}