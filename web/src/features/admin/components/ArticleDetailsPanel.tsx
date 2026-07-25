interface Category {
    id: number;

    name: string;
}


interface ArticleDetailsPanelProps {
    categoryId: number;

    readingTime: number;

    featuredPersonName: string;

    featuredPersonLinkedin: string;

    categories: Category[];

    categoriesLoading: boolean;

    onCategoryChange: (categoryId: number) => void;

    onReadingTimeChange: (readingTime: number) => void;

    onFeaturedPersonNameChange: (name: string) => void;

    onFeaturedPersonLinkedinChange: (linkedin: string) => void;
}


export default function ArticleDetailsPanel({
    categoryId,
    readingTime,
    featuredPersonName,
    featuredPersonLinkedin,
    categories,
    categoriesLoading,
    onCategoryChange,
    onReadingTimeChange,
    onFeaturedPersonNameChange,
    onFeaturedPersonLinkedinChange,
}: ArticleDetailsPanelProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-[#06154A]">
                Article Details
            </h3>


            <div className="mt-5">
                <label
                    htmlFor="article-category"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Category
                </label>


                <select
                    id="article-category"
                    value={
                        categoryId ||
                        ""
                    }
                    onChange={(
                        event,
                    ) =>
                        onCategoryChange(
                            Number(
                                event.target
                                    .value,
                            ),
                        )
                    }
                    required
                    disabled={
                        categoriesLoading
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
                >
                    <option value="">
                        Select category
                    </option>


                    {categories.map(
                        (
                            category,
                        ) => (
                            <option
                                key={
                                    category.id
                                }
                                value={
                                    category.id
                                }
                            >
                                {
                                    category.name
                                }
                            </option>
                        ),
                    )}
                </select>
            </div>


            <div className="mt-5">
                <label
                    htmlFor="reading-time"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Reading time
                </label>


                <div className="flex items-center gap-3">
                    <input
                        id="reading-time"
                        type="number"
                        min={1}
                        value={
                            readingTime
                        }
                        onChange={(
                            event,
                        ) =>
                            onReadingTimeChange(
                                Number(
                                    event.target
                                        .value,
                                ),
                            )
                        }
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                    <span className="text-sm text-slate-500">
                        min
                    </span>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Featured Person
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                        Optional. Display a LinkedIn profile at the end of the article.
                    </p>

                    <div className="mt-5">
                        <label
                            htmlFor="featured-person-name"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Name
                        </label>

                        <input
                            id="featured-person-name"
                            type="text"
                            value={featuredPersonName}
                            onChange={(event) =>
                                onFeaturedPersonNameChange(event.target.value)
                            }
                            placeholder="e.g. Satya Nadella"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div className="mt-5">
                        <label
                            htmlFor="featured-person-linkedin"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            LinkedIn Profile
                        </label>

                        <input
                            id="featured-person-linkedin"
                            type="url"
                            value={featuredPersonLinkedin}
                            onChange={(event) =>
                                onFeaturedPersonLinkedinChange(event.target.value)
                            }
                            placeholder="https://www.linkedin.com/in/..."
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}