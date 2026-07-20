import { Link } from "react-router-dom";

import { ROUTES } from "@/config/routes";
import ImageWithFallback from "@/shared/ui/ImageWithFallback";

import type { Article } from "@/types/article";

interface FeaturedHeroCardProps {
    article?: Article;
    loading?: boolean;
}

export default function FeaturedHeroCard({
    article,
    loading,
}: FeaturedHeroCardProps) {
    if (loading) {
        return (
            <div className="h-[650px] animate-pulse rounded-3xl bg-slate-200" />
        );
    }

    if (!article) {
        return (
            <div className="flex h-[650px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-[#06154A]">
                        No Featured Story Yet
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Check back soon for our latest leadership insights.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Link
            to={`${ROUTES.ARTICLES}/${article.slug}`}
            aria-label={`Read featured article: ${article.title}`}
            className="block"
        >
            <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="h-60 overflow-hidden">
                    <ImageWithFallback
                        src={article.cover_image ?? undefined}
                        alt={article.title}
                        imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="p-8">
                    <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                        Featured Story
                    </span>

                    <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#06154A]">
                        {article.title}
                    </h2>

                    <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                        {article.excerpt}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-900">
                                {article.category}
                            </p>

                            <p className="text-sm text-slate-500">
                                {article.reading_time} min read
                            </p>
                        </div>

                        <span className="font-semibold text-[#06154A] transition-all duration-300 group-hover:translate-x-1">
                            Read Article →
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}