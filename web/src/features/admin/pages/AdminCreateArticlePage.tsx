import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    ROUTES,
} from "@/config/routes";

import {
    useCreateAdminArticle,
} from "@/shared/hooks/useAdminArticles";

import ArticleEditorForm
    from "../components/ArticleEditorForm";


export default function AdminCreateArticlePage() {
    const navigate =
        useNavigate();


    const [
        successMessage,
        setSuccessMessage,
    ] =
        useState<string | null>(
            null,
        );


    const {
        mutate:
        createArticle,

        isPending,

        error,
    } =
        useCreateAdminArticle();


    return (
        <ArticleEditorForm
            submitLabel="Create Article"

            isSubmitting={
                isPending
            }

            errorMessage={
                error?.message
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


                createArticle(
                    data,
                    {
                        onSuccess: () => {
                            setSuccessMessage(
                                "The article was created successfully. Opening the article manager...",
                            );


                            window.setTimeout(
                                () => {
                                    navigate(
                                        ROUTES.ADMIN_ARTICLES,
                                    );
                                },
                                1200,
                            );
                        },
                    },
                );
            }}
        />
    );
}