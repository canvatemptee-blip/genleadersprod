import {
    Edit3,
    FilePlus2,
    FileText,
    Star,
    Trash2,
} from "lucide-react";

import {
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    ROUTES,
} from "@/config/routes";

import {
    canDeleteArticles,
} from "@/features/auth/permissions";

import {
    authToken,
} from "@/shared/services/authToken";

import {
    useAdminArticles,
    useDeleteAdminArticle,
} from "@/shared/hooks/useAdminArticles";

import type {
    AdminArticle,
    ArticleStatus,
} from "@/types/adminArticle";


function formatDate(
    value: string,
) {
    return new Date(
        value,
    ).toLocaleDateString();
}


function getStatusClasses(
    status: ArticleStatus,
) {
    switch (status) {
        case "published":
            return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";

        case "scheduled":
            return "bg-blue-50 text-blue-700 ring-blue-600/20";

        case "archived":
            return "bg-slate-100 text-slate-700 ring-slate-500/20";

        case "draft":
        default:
            return "bg-amber-50 text-amber-700 ring-amber-600/20";
    }
}


export default function AdminArticlesPage() {
    const role =
        authToken.getRole();


    const mayDeleteArticles =
        canDeleteArticles(
            role,
        );


    const [
        articleToDelete,
        setArticleToDelete,
    ] =
        useState<AdminArticle | null>(
            null,
        );


    const {
        data:
        articles = [],

        isLoading,

        error,
    } =
        useAdminArticles();


    const {
        mutate:
        deleteArticle,

        isPending:
        isDeleting,

        error:
        deleteError,

        reset:
        resetDelete,
    } =
        useDeleteAdminArticle();


    const handleDelete = () => {
        if (
            !mayDeleteArticles ||
            !articleToDelete
        ) {
            return;
        }


        deleteArticle(
            articleToDelete.id,
            {
                onSuccess: () => {
                    setArticleToDelete(
                        null,
                    );
                },
            },
        );
    };


    const openDeleteDialog = (
        article: AdminArticle,
    ) => {
        if (
            !mayDeleteArticles
        ) {
            return;
        }


        resetDelete();


        setArticleToDelete(
            article,
        );
    };


    const closeDeleteDialog = () => {
        if (
            isDeleting
        ) {
            return;
        }


        resetDelete();


        setArticleToDelete(
            null,
        );
    };


    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                        Content Management
                    </p>


                    <h2 className="mt-2 text-3xl font-bold text-[#06154A]">
                        Articles
                    </h2>


                    <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                        Manage drafts, scheduled stories,
                        published content, archives and
                        featured articles.
                    </p>
                </div>


                <Link
                    to={
                        ROUTES.ADMIN_ARTICLE_NEW
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#06154A] px-5 py-3 font-semibold text-white transition hover:bg-[#0a206c]"
                >
                    <FilePlus2
                        size={
                            18
                        }
                        aria-hidden="true"
                    />

                    New Article
                </Link>
            </div>


            {isLoading && (
                <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                    <div className="animate-pulse space-y-px">
                        {Array.from({
                            length:
                                5,
                        }).map(
                            (
                                _,
                                index,
                            ) => (
                                <div
                                    key={
                                        index
                                    }
                                    className="flex items-center gap-6 p-6"
                                >
                                    <div className="h-12 w-12 rounded-xl bg-slate-200" />


                                    <div className="flex-1 space-y-3">
                                        <div className="h-5 w-1/3 rounded bg-slate-200" />

                                        <div className="h-4 w-1/4 rounded bg-slate-200" />
                                    </div>


                                    <div className="h-8 w-24 rounded-full bg-slate-200" />
                                </div>
                            ),
                        )}
                    </div>
                </div>
            )}


            {!isLoading &&
                error && (
                    <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 px-8 py-14 text-center">
                        <h3 className="text-2xl font-bold text-[#06154A]">
                            Unable to load articles
                        </h3>


                        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
                            The admin article collection
                            could not be loaded. Check
                            that the backend is running
                            and the current session is
                            valid.
                        </p>
                    </div>
                )}


            {!isLoading &&
                !error &&
                articles.length ===
                0 && (
                    <div className="mt-8 rounded-3xl border border-slate-200 bg-white px-8 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-[#06154A]">
                            <FileText
                                size={
                                    28
                                }
                                aria-hidden="true"
                            />
                        </div>


                        <h3 className="mt-6 text-2xl font-bold text-[#06154A]">
                            No articles yet
                        </h3>


                        <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
                            Create your first article
                            using the article editor.
                        </p>


                        <Link
                            to={
                                ROUTES.ADMIN_ARTICLE_NEW
                            }
                            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#06154A] px-5 py-3 font-semibold text-white transition hover:bg-[#0a206c]"
                        >
                            <FilePlus2
                                size={
                                    18
                                }
                                aria-hidden="true"
                            />

                            Create Article
                        </Link>
                    </div>
                )}


            {!isLoading &&
                !error &&
                articles.length >
                0 && (
                    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-225">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-left">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Article
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Category ID
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Updated
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>


                                <tbody className="divide-y divide-slate-100">
                                    {articles.map(
                                        (
                                            article,
                                        ) => (
                                            <tr
                                                key={
                                                    article.id
                                                }
                                                className="transition hover:bg-slate-50/70"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#06154A]">
                                                            <FileText
                                                                size={
                                                                    20
                                                                }
                                                                aria-hidden="true"
                                                            />
                                                        </div>


                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <p className="max-w-md truncate font-semibold text-slate-900">
                                                                    {
                                                                        article.title
                                                                    }
                                                                </p>


                                                                {article.is_featured && (
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                        aria-label="Featured article"
                                                                        className="shrink-0 text-amber-500"
                                                                    />
                                                                )}
                                                            </div>


                                                            <p className="mt-1 max-w-md truncate text-sm text-slate-500">
                                                                /
                                                                {
                                                                    article.slug
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>


                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusClasses(
                                                            article.status,
                                                        )}`}
                                                    >
                                                        {
                                                            article.status
                                                        }
                                                    </span>
                                                </td>


                                                <td className="px-6 py-5 text-sm text-slate-600">
                                                    {
                                                        article.category_id
                                                    }
                                                </td>


                                                <td className="px-6 py-5 text-sm text-slate-600">
                                                    {formatDate(
                                                        article.updated_at,
                                                    )}
                                                </td>


                                                <td className="px-6 py-5">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            to={ROUTES.ADMIN_ARTICLE_EDIT(
                                                                article.id,
                                                            )}
                                                            aria-label={`Edit ${article.title}`}
                                                            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                                        >
                                                            <Edit3
                                                                size={
                                                                    17
                                                                }
                                                                aria-hidden="true"
                                                            />
                                                        </Link>


                                                        {mayDeleteArticles && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openDeleteDialog(
                                                                        article,
                                                                    )
                                                                }
                                                                aria-label={`Delete ${article.title}`}
                                                                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        17
                                                                    }
                                                                    aria-hidden="true"
                                                                />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}


            {mayDeleteArticles &&
                articleToDelete && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-article-title"
                        className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 px-5"
                    >
                        <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                                <Trash2
                                    size={
                                        24
                                    }
                                    aria-hidden="true"
                                />
                            </div>


                            <h2
                                id="delete-article-title"
                                className="mt-6 text-2xl font-bold text-[#06154A]"
                            >
                                Delete article?
                            </h2>


                            <p className="mt-4 leading-7 text-slate-600">
                                You're about to permanently
                                delete{" "}
                                <span className="font-semibold text-slate-900">
                                    {
                                        articleToDelete.title
                                    }
                                </span>
                                . This action cannot be
                                undone.
                            </p>


                            {deleteError && (
                                <div
                                    role="alert"
                                    className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700"
                                >
                                    {
                                        deleteError.message
                                    }
                                </div>
                            )}


                            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={
                                        closeDeleteDialog
                                    }
                                    disabled={
                                        isDeleting
                                    }
                                    className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    onClick={
                                        handleDelete
                                    }
                                    disabled={
                                        isDeleting
                                    }
                                    className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isDeleting
                                        ? "Deleting..."
                                        : "Delete article"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}