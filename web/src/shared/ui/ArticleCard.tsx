import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/config/routes";
import ImageWithFallback from "@/shared/ui/ImageWithFallback";

export interface ArticleCardProps {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    readTime: string;
    publishedAt: string;
    image: string;
    featured?: boolean;
}

export default function ArticleCard({
    slug,
    title,
    excerpt,
    category,
    author,
    readTime,
    publishedAt,
    image,
    featured = false,
}: ArticleCardProps) {
    const articleUrl = `${ROUTES.ARTICLES}/${slug}`;

    if (featured) {
        return (
            <Link
                to={articleUrl}
                aria-label={`Read article: ${title}`}
                className="block"
            >
                <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="grid lg:grid-cols-2">
                        <div className="h-[500px] overflow-hidden">
                            <ImageWithFallback
                                src={image}
                                alt={title}
                                fallbackText="Featured Article"
                                className="h-full w-full"
                                imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <div className="flex flex-col justify-center p-10">
                            <span className="mb-4 w-fit rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
                                {category}
                            </span>

                            <h2 className="text-5xl font-bold leading-tight text-[#06154A] transition-colors duration-300 group-hover:text-blue-700">
                                {title}
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                {excerpt}
                            </p>

                            <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
                                <div>
                                    <p className="font-semibold text-slate-900">
                                        {author}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        {publishedAt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-slate-500">
                                    <Clock3 size={18} />
                                    <span>{readTime}</span>
                                </div>
                            </div>

                            <div className="mt-10 flex items-center gap-2 font-semibold text-[#06154A] transition-all duration-300 group-hover:gap-3">
                                Read Article
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    return (
        <Link
            to={articleUrl}
            aria-label={`Read article: ${title}`}
            className="block h-full"
        >
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="h-60 overflow-hidden">
                    <ImageWithFallback
                        src={image}
                        alt={title}
                        fallbackText="Article Image"
                        className="h-full w-full"
                        imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="flex flex-1 flex-col p-8">
                    <span className="w-fit rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
                        {category}
                    </span>

                    <h3 className="mt-5 text-3xl font-bold leading-tight text-[#06154A] transition-colors duration-300 group-hover:text-blue-700">
                        {title}
                    </h3>

                    <p className="mt-4 flex-1 leading-8 text-slate-600">
                        {excerpt}
                    </p>

                    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                        <div>
                            <p className="font-semibold text-slate-900">
                                {author}
                            </p>

                            <p className="text-sm text-slate-500">
                                {publishedAt}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock3 size={16} />
                            <span>{readTime}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 font-semibold text-[#06154A] transition-all duration-300 group-hover:gap-3">
                        Read Article
                        <ArrowRight size={18} />
                    </div>
                </div>
            </article>
        </Link>
    );
}