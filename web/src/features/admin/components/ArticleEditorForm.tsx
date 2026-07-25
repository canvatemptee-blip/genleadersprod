import {
    type FormEvent,
    useEffect,
    useState,
} from "react";

import {
    ArrowLeft,
    CheckCircle2,
    LoaderCircle,
    Save,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import {
    ROUTES,
} from "@/config/routes";

import {
    useCategories,
} from "@/shared/hooks/useCategories";

import type {
    ArticleEditorValues,
    CreateArticlePayload,
} from "@/types/articleEditor";

import ArticleContentFields
    from "./ArticleContentFields";

import ArticlePublishingPanel
    from "./ArticlePublishingPanel";

import ArticleDetailsPanel
    from "./ArticleDetailsPanel";

import ArticleCoverImagePanel
    from "./ArticleCoverImagePanel";

import {
    createSlug,
} from "../articles/utils/createSlug";

import {
    contentToDocument,
} from "../articles/utils/articleContent";


interface ArticleEditorFormProps {
    initialValues?:
    ArticleEditorValues;

    submitLabel:
    string;

    isSubmitting:
    boolean;

    errorMessage?:
    string;

    successMessage?:
    string | null;

    onSubmit: (
        data:
            CreateArticlePayload,
    ) => void;
}


const defaultValues:
    ArticleEditorValues = {
    title: "",

    slug: "",

    excerpt: "",

    content: "",

    cover_image: "",

    category_id: 0,

    reading_time: 5,

    featured_person_name: "",

    featured_person_linkedin: "",

    is_featured: false,

    status: "draft",

    scheduled_at: "",
};


export default function ArticleEditorForm({
    initialValues,
    submitLabel,
    isSubmitting,
    errorMessage,
    successMessage,
    onSubmit,
}: ArticleEditorFormProps) {
    const [
        values,
        setValues,
    ] =
        useState<ArticleEditorValues>(
            initialValues ??
            defaultValues,
        );


    const [
        slugEdited,
        setSlugEdited,
    ] =
        useState(
            Boolean(
                initialValues?.slug,
            ),
        );


    const [
        isUploadingImage,
        setIsUploadingImage,
    ] =
        useState(false);


    const [
        scheduleError,
        setScheduleError,
    ] =
        useState<string | null>(
            null,
        );


    const {
        data:
        categories = [],

        isLoading:
        categoriesLoading,

        error:
        categoriesError,
    } =
        useCategories();


    useEffect(() => {
        if (
            initialValues
        ) {
            setValues(
                initialValues,
            );

            setSlugEdited(
                true,
            );
        }
    }, [
        initialValues,
    ]);


    const updateField = <
        K extends
        keyof ArticleEditorValues,
    >(
        key: K,

        value:
            ArticleEditorValues[K],
    ) => {
        setValues(
            (current) => ({
                ...current,

                [key]:
                    value,
            }),
        );
    };


    const handleTitleChange = (
        title: string,
    ) => {
        setValues(
            (current) => ({
                ...current,

                title,

                slug:
                    slugEdited
                        ? current.slug
                        : createSlug(
                            title,
                        ),
            }),
        );
    };


    const handleSlugChange = (
        slug: string,
    ) => {
        setSlugEdited(
            true,
        );

        updateField(
            "slug",
            slug,
        );
    };


    const handleStatusChange = (
        status:
            ArticleEditorValues["status"],
    ) => {
        setScheduleError(
            null,
        );


        setValues(
            (current) => ({
                ...current,

                status,

                scheduled_at:
                    status ===
                        "scheduled"
                        ? current.scheduled_at
                        : "",
            }),
        );
    };


    const handleScheduledAtChange = (
        scheduledAt: string,
    ) => {
        setScheduleError(
            null,
        );

        updateField(
            "scheduled_at",
            scheduledAt,
        );
    };


    const handleSubmit = (
        event:
            FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();


        if (
            isUploadingImage
        ) {
            return;
        }


        let scheduledAt:
            string | null =
            null;


        if (
            values.status ===
            "scheduled"
        ) {
            if (
                !values.scheduled_at
            ) {
                setScheduleError(
                    "Choose a date and time before scheduling the article.",
                );

                return;
            }


            const scheduleDate =
                new Date(
                    values.scheduled_at,
                );


            if (
                Number.isNaN(
                    scheduleDate.getTime(),
                )
            ) {
                setScheduleError(
                    "The selected schedule date is invalid.",
                );

                return;
            }


            if (
                scheduleDate <=
                new Date()
            ) {
                setScheduleError(
                    "The scheduled date and time must be in the future.",
                );

                return;
            }


            scheduledAt =
                scheduleDate
                    .toISOString();
        }


        setScheduleError(
            null,
        );


        onSubmit({
            title:
                values.title.trim(),

            slug:
                values.slug.trim(),

            excerpt:
                values.excerpt.trim(),

            content:
                contentToDocument(
                    values.content,
                ),

            cover_image:
                values.cover_image.trim()
                    ? values.cover_image.trim()
                    : null,

            category_id:
                values.category_id,

            reading_time:
                values.reading_time,

            featured_person_name:
                values.featured_person_name.trim() || null,

            featured_person_linkedin:
                values.featured_person_linkedin.trim() || null,

            is_featured:
                values.is_featured,

            status:
                values.status,

            scheduled_at:
                scheduledAt,
        });
    };


    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="mx-auto max-w-7xl"
        >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <Link
                        to={
                            ROUTES.ADMIN_ARTICLES
                        }
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#06154A]"
                    >
                        <ArrowLeft
                            size={17}
                            aria-hidden="true"
                        />

                        Back to articles
                    </Link>


                    <h2 className="mt-5 text-3xl font-bold text-[#06154A]">
                        Article Editor
                    </h2>


                    <p className="mt-3 leading-7 text-slate-600">
                        Write and manage article
                        content, publishing state and
                        presentation metadata.
                    </p>
                </div>


                <button
                    type="submit"
                    disabled={
                        isSubmitting ||
                        categoriesLoading ||
                        isUploadingImage
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#06154A] px-6 py-3 font-semibold text-white transition hover:bg-[#0a206c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isUploadingImage ||
                        isSubmitting ? (
                        <LoaderCircle
                            size={18}
                            className="animate-spin"
                            aria-hidden="true"
                        />
                    ) : (
                        <Save
                            size={18}
                            aria-hidden="true"
                        />
                    )}


                    {isUploadingImage
                        ? "Uploading image..."
                        : isSubmitting
                            ? "Saving..."
                            : submitLabel}
                </button>
            </div>


            {successMessage && (
                <div
                    role="status"
                    aria-live="polite"
                    className="mt-7 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-emerald-800"
                >
                    <CheckCircle2
                        size={21}
                        className="mt-0.5 shrink-0"
                        aria-hidden="true"
                    />

                    <div>
                        <p className="font-semibold">
                            Saved successfully
                        </p>

                        <p className="mt-1 text-sm leading-6 text-emerald-700">
                            {successMessage}
                        </p>
                    </div>
                </div>
            )}


            {errorMessage && (
                <div
                    role="alert"
                    className="mt-7 rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700"
                >
                    {errorMessage}
                </div>
            )}


            {scheduleError && (
                <div
                    role="alert"
                    className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-800"
                >
                    {scheduleError}
                </div>
            )}


            {categoriesError && (
                <div
                    role="alert"
                    className="mt-7 rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700"
                >
                    Categories could not be loaded.
                    The article cannot be saved until
                    the category service is available.
                </div>
            )}


            <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                <ArticleContentFields
                    values={
                        values
                    }

                    onTitleChange={
                        handleTitleChange
                    }

                    onSlugChange={
                        handleSlugChange
                    }

                    onExcerptChange={(
                        excerpt,
                    ) =>
                        updateField(
                            "excerpt",
                            excerpt,
                        )
                    }

                    onContentChange={(
                        content,
                    ) =>
                        updateField(
                            "content",
                            content,
                        )
                    }
                />


                <aside className="space-y-6">
                    <ArticlePublishingPanel
                        status={
                            values.status
                        }

                        isFeatured={
                            values.is_featured
                        }

                        scheduledAt={
                            values.scheduled_at
                        }

                        onStatusChange={
                            handleStatusChange
                        }

                        onFeaturedChange={(
                            isFeatured,
                        ) =>
                            updateField(
                                "is_featured",
                                isFeatured,
                            )
                        }

                        onScheduledAtChange={
                            handleScheduledAtChange
                        }
                    />


                    <ArticleDetailsPanel
                        categoryId={values.category_id}
                        readingTime={values.reading_time}

                        featuredPersonName={values.featured_person_name}
                        featuredPersonLinkedin={values.featured_person_linkedin}

                        categories={categories}
                        categoriesLoading={categoriesLoading}

                        onCategoryChange={(categoryId) =>
                            updateField("category_id", categoryId)
                        }

                        onReadingTimeChange={(readingTime) =>
                            updateField("reading_time", readingTime)
                        }

                        onFeaturedPersonNameChange={(name) =>
                            updateField("featured_person_name", name)
                        }

                        onFeaturedPersonLinkedinChange={(linkedin) =>
                            updateField("featured_person_linkedin", linkedin)
                        }
                    />


                    <ArticleCoverImagePanel
                        coverImage={
                            values.cover_image
                        }

                        onCoverImageChange={(
                            imageUrl,
                        ) =>
                            updateField(
                                "cover_image",
                                imageUrl,
                            )
                        }

                        onUploadingChange={
                            setIsUploadingImage
                        }
                    />
                </aside>
            </div>
        </form>
    );
}