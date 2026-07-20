import {
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    useAdminArticle,
    useUpdateAdminArticle,
} from "@/shared/hooks/useAdminArticles";

import ArticleEditorForm
    from "../components/ArticleEditorForm";

import {
    documentToText,
} from "../articles/utils/articleContent";

import type {
    ArticleEditorValues,
} from "@/types/articleEditor";


function toDateTimeLocal(
    value: string | null,
) {
    if (!value) {
        return "";
    }


    const date =
        new Date(
            value,
        );


    const localDate =
        new Date(
            date.getTime() -
            date.getTimezoneOffset() *
            60 *
            1000,
        );


    return localDate
        .toISOString()
        .slice(
            0,
            16,
        );
}


export default function AdminEditArticlePage() {
    const {
        id: idParam,
    } =
        useParams();


    const id =
        Number(
            idParam,
        );


    const [
        successMessage,
        setSuccessMessage,
    ] =
        useState<string | null>(
            null,
        );


    const {
        data:
        article,

        isLoading,

        error:
        loadError,
    } =
        useAdminArticle(
            id,
        );


    const {
        mutate:
        updateArticle,

        isPending,

        error:
        updateError,
    } =
        useUpdateAdminArticle(
            id,
        );


    if (
        !Number.isInteger(
            id,
        ) ||
        id <= 0
    ) {
        return (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-8 py-14 text-center">
                <h2 className="text-2xl font-bold text-[#06154A]">
                    Invalid article ID
                </h2>
            </div>
        );
    }


    if (
        isLoading
    ) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-72 rounded bg-slate-200" />

                <div className="h-150 rounded-3xl bg-slate-200" />
            </div>
        );
    }


    if (
        loadError ||
        !article
    ) {
        return (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-8 py-14 text-center">
                <h2 className="text-2xl font-bold text-[#06154A]">
                    Unable to load article
                </h2>

                <p className="mt-4 text-slate-600">
                    {loadError?.message ??
                        "Article not found."}
                </p>
            </div>
        );
    }


    const initialValues:
        ArticleEditorValues = {
        title:
            article.title,

        slug:
            article.slug,

        excerpt:
            article.excerpt,

        content:
            documentToText(
                article.content,
            ),

        cover_image:
            article.cover_image ??
            "",

        category_id:
            article.category_id,

        reading_time:
            article.reading_time,

        is_featured:
            article.is_featured,

        status:
            article.status,

        scheduled_at:
            toDateTimeLocal(
                article.scheduled_at,
            ),
    };


    return (
        <ArticleEditorForm
            initialValues={
                initialValues
            }

            submitLabel="Save Changes"

            isSubmitting={
                isPending
            }

            errorMessage={
                updateError?.message
            }

            successMessage={
                successMessage
            }

            onSubmit={(
                data,
            ) => {
                setSuccessMessage(
                    null,
                );


                updateArticle(
                    data,
                    {
                        onSuccess: () => {
                            setSuccessMessage(
                                data.status ===
                                    "scheduled"
                                    ? "Your changes have been saved and the article is scheduled for publication."
                                    : "Your article changes have been saved.",
                            );
                        },
                    },
                );
            }}
        />
    );
}