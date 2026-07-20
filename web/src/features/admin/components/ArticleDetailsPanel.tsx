interface Category {
    id: number;

    name: string;
}


interface ArticleDetailsPanelProps {
    categoryId:
    number;

    readingTime:
    number;

    categories:
    Category[];

    categoriesLoading:
    boolean;

    onCategoryChange: (
        categoryId: number,
    ) => void;

    onReadingTimeChange: (
        readingTime: number,
    ) => void;
}


export default function ArticleDetailsPanel({
    categoryId,
    readingTime,
    categories,
    categoriesLoading,
    onCategoryChange,
    onReadingTimeChange,
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
            </div>
        </section>
    );
}