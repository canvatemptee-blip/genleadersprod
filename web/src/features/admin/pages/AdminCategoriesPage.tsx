import {
    CheckCircle2,
    FolderOpen,
    Pencil,
    Plus,
    Trash2,
    X,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import {
    useCategories,
    useCreateCategory,
    useDeleteCategory,
    useUpdateCategory,
} from "@/shared/hooks/useCategories";

import type {
    Category,
    CategoryPayload,
} from "@/types/category";


function createSlug(
    value: string,
) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}


interface CategoryFormModalProps {
    isOpen: boolean;

    category:
    Category | null;

    isSubmitting: boolean;

    errorMessage?:
    string;

    onClose:
    () => void;

    onSubmit: (
        data:
            CategoryPayload,
    ) => void;
}


function CategoryFormModal({
    isOpen,
    category,
    isSubmitting,
    errorMessage,
    onClose,
    onSubmit,
}: CategoryFormModalProps) {
    const [
        name,
        setName,
    ] =
        useState(
            "",
        );


    const [
        slug,
        setSlug,
    ] =
        useState(
            "",
        );


    const [
        isSlugEdited,
        setIsSlugEdited,
    ] =
        useState(
            false,
        );


    useEffect(
        () => {
            if (
                !isOpen
            ) {
                return;
            }


            setName(
                category?.name ??
                "",
            );


            setSlug(
                category?.slug ??
                "",
            );


            setIsSlugEdited(
                Boolean(
                    category,
                ),
            );
        },
        [
            isOpen,
            category,
        ],
    );


    if (
        !isOpen
    ) {
        return null;
    }


    const handleNameChange = (
        value: string,
    ) => {
        setName(
            value,
        );


        if (
            !isSlugEdited
        ) {
            setSlug(
                createSlug(
                    value,
                ),
            );
        }
    };


    const handleSubmit = (
        event:
            React.SyntheticEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();


        onSubmit({
            name:
                name.trim(),

            slug:
                createSlug(
                    slug,
                ),
        });
    };


    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-form-title"
            className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 px-5 py-8"
        >
            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                            Category
                        </p>


                        <h2
                            id="category-form-title"
                            className="mt-2 text-3xl font-bold text-[#06154A]"
                        >
                            {category
                                ? "Edit category"
                                : "Create category"}
                        </h2>


                        <p className="mt-3 leading-7 text-slate-600">
                            {category
                                ? "Update the category name and URL slug."
                                : "Create a new category for organizing published content."}
                        </p>
                    </div>


                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        disabled={
                            isSubmitting
                        }
                        aria-label="Close category form"
                        className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                        <X
                            size={20}
                            aria-hidden="true"
                        />
                    </button>
                </div>


                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="category-name"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Category name
                        </label>


                        <input
                            id="category-name"
                            type="text"
                            required
                            minLength={2}
                            maxLength={100}
                            value={
                                name
                            }
                            onChange={(
                                event,
                            ) =>
                                handleNameChange(
                                    event.target.value,
                                )
                            }
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            placeholder="Technology"
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="category-slug"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Slug
                        </label>


                        <input
                            id="category-slug"
                            type="text"
                            required
                            value={
                                slug
                            }
                            onChange={(
                                event,
                            ) => {
                                setIsSlugEdited(
                                    true,
                                );


                                setSlug(
                                    createSlug(
                                        event.target.value,
                                    ),
                                );
                            }}
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            placeholder="technology"
                        />


                        <p className="mt-2 text-xs leading-5 text-slate-500">
                            Used in URLs and API filters.
                            Lowercase letters, numbers and
                            hyphens are recommended.
                        </p>
                    </div>


                    {errorMessage && (
                        <div
                            role="alert"
                            className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700"
                        >
                            {
                                errorMessage
                            }
                        </div>
                    )}


                    <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={
                                onClose
                            }
                            disabled={
                                isSubmitting
                            }
                            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={
                                isSubmitting
                            }
                            className="rounded-xl bg-[#06154A] px-5 py-3 font-semibold text-white transition hover:bg-[#0a206c] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting
                                ? "Saving..."
                                : category
                                    ? "Save changes"
                                    : "Create category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


interface DeleteCategoryModalProps {
    category:
    Category | null;

    isDeleting:
    boolean;

    errorMessage?:
    string;

    onClose:
    () => void;

    onConfirm:
    () => void;
}


function DeleteCategoryModal({
    category,
    isDeleting,
    errorMessage,
    onClose,
    onConfirm,
}: DeleteCategoryModalProps) {
    if (
        !category
    ) {
        return null;
    }


    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-category-title"
            className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 px-5 py-8"
        >
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                    <Trash2
                        size={24}
                        aria-hidden="true"
                    />
                </div>


                <h2
                    id="delete-category-title"
                    className="mt-6 text-2xl font-bold text-[#06154A]"
                >
                    Delete category?
                </h2>


                <p className="mt-4 leading-7 text-slate-600">
                    You are about to delete{" "}

                    <strong className="text-slate-900">
                        {
                            category.name
                        }
                    </strong>

                    . This action cannot be undone.
                </p>


                {errorMessage && (
                    <div
                        role="alert"
                        className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700"
                    >
                        {
                            errorMessage
                        }
                    </div>
                )}


                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        disabled={
                            isDeleting
                        }
                        className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        onClick={
                            onConfirm
                        }
                        disabled={
                            isDeleting
                        }
                        className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isDeleting
                            ? "Deleting..."
                            : "Delete category"}
                    </button>
                </div>
            </div>
        </div>
    );
}


export default function AdminCategoriesPage() {
    const [
        isFormOpen,
        setIsFormOpen,
    ] =
        useState(
            false,
        );


    const [
        editingCategory,
        setEditingCategory,
    ] =
        useState<
            Category | null
        >(
            null,
        );


    const [
        deletingCategory,
        setDeletingCategory,
    ] =
        useState<
            Category | null
        >(
            null,
        );


    const [
        successMessage,
        setSuccessMessage,
    ] =
        useState<
            string | null
        >(
            null,
        );


    const {
        data:
        categories = [],

        isLoading,

        error:
        loadError,
    } =
        useCategories();


    const {
        mutate:
        createCategory,

        isPending:
        isCreating,

        error:
        createError,

        reset:
        resetCreate,
    } =
        useCreateCategory();


    const {
        mutate:
        updateCategory,

        isPending:
        isUpdating,

        error:
        updateError,

        reset:
        resetUpdate,
    } =
        useUpdateCategory();


    const {
        mutate:
        deleteCategory,

        isPending:
        isDeleting,

        error:
        deleteError,

        reset:
        resetDelete,
    } =
        useDeleteCategory();


    const openCreateModal =
        () => {
            setSuccessMessage(
                null,
            );


            setEditingCategory(
                null,
            );


            resetCreate();

            resetUpdate();


            setIsFormOpen(
                true,
            );
        };


    const openEditModal = (
        category:
            Category,
    ) => {
        setSuccessMessage(
            null,
        );


        setEditingCategory(
            category,
        );


        resetCreate();

        resetUpdate();


        setIsFormOpen(
            true,
        );
    };


    const closeFormModal =
        () => {
            if (
                isCreating ||
                isUpdating
            ) {
                return;
            }


            setIsFormOpen(
                false,
            );


            setEditingCategory(
                null,
            );


            resetCreate();

            resetUpdate();
        };


    const handleSubmit = (
        data:
            CategoryPayload,
    ) => {
        setSuccessMessage(
            null,
        );


        if (
            editingCategory
        ) {
            updateCategory(
                {
                    id:
                        editingCategory.id,

                    data,
                },
                {
                    onSuccess:
                        () => {
                            setIsFormOpen(
                                false,
                            );


                            setEditingCategory(
                                null,
                            );


                            setSuccessMessage(
                                "Category updated successfully.",
                            );
                        },
                },
            );


            return;
        }


        createCategory(
            data,
            {
                onSuccess:
                    () => {
                        setIsFormOpen(
                            false,
                        );


                        setSuccessMessage(
                            "Category created successfully.",
                        );
                    },
            },
        );
    };


    const openDeleteModal = (
        category:
            Category,
    ) => {
        setSuccessMessage(
            null,
        );


        resetDelete();


        setDeletingCategory(
            category,
        );
    };


    const closeDeleteModal =
        () => {
            if (
                isDeleting
            ) {
                return;
            }


            setDeletingCategory(
                null,
            );


            resetDelete();
        };


    const handleDelete =
        () => {
            if (
                !deletingCategory
            ) {
                return;
            }


            const categoryName =
                deletingCategory.name;


            deleteCategory(
                deletingCategory.id,
                {
                    onSuccess:
                        () => {
                            setDeletingCategory(
                                null,
                            );


                            setSuccessMessage(
                                `${categoryName} was deleted successfully.`,
                            );
                        },
                },
            );
        };


    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                        Content Structure
                    </p>


                    <h2 className="mt-2 text-3xl font-bold text-[#06154A]">
                        Category Management
                    </h2>


                    <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                        Organize articles into clear,
                        discoverable content categories.
                    </p>
                </div>


                <button
                    type="button"
                    onClick={
                        openCreateModal
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#06154A] px-5 py-3 font-semibold text-white transition hover:bg-[#0a206c]"
                >
                    <Plus
                        size={18}
                        aria-hidden="true"
                    />

                    Add Category
                </button>
            </div>


            {successMessage && (
                <div
                    role="status"
                    className="mt-7 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-emerald-800"
                >
                    <CheckCircle2
                        size={20}
                        aria-hidden="true"
                    />


                    <p className="font-medium">
                        {
                            successMessage
                        }
                    </p>
                </div>
            )}


            {isLoading && (
                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({
                        length:
                            6,
                    }).map(
                        (
                            _,
                            index,
                        ) => (
                            <div
                                key={
                                    index
                                }
                                className="h-52 animate-pulse rounded-3xl bg-slate-200"
                            />
                        ),
                    )}
                </div>
            )}


            {!isLoading &&
                loadError && (
                    <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 px-8 py-14 text-center">
                        <h3 className="text-2xl font-bold text-[#06154A]">
                            Unable to load categories
                        </h3>


                        <p className="mt-4 text-slate-600">
                            {
                                loadError.message
                            }
                        </p>
                    </div>
                )}


            {!isLoading &&
                !loadError &&
                categories.length >
                0 && (
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {categories.map(
                            (
                                category,
                            ) => (
                                <article
                                    key={
                                        category.id
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                                >
                                    <div className="flex items-start justify-between gap-5">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#06154A]">
                                            <FolderOpen
                                                size={22}
                                                aria-hidden="true"
                                            />
                                        </div>


                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                aria-label={`Edit ${category.name}`}
                                                onClick={() =>
                                                    openEditModal(
                                                        category,
                                                    )
                                                }
                                                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                            >
                                                <Pencil
                                                    size={17}
                                                    aria-hidden="true"
                                                />
                                            </button>


                                            <button
                                                type="button"
                                                aria-label={`Delete ${category.name}`}
                                                onClick={() =>
                                                    openDeleteModal(
                                                        category,
                                                    )
                                                }
                                                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Trash2
                                                    size={17}
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </div>


                                    <h3 className="mt-6 text-xl font-bold text-[#06154A]">
                                        {
                                            category.name
                                        }
                                    </h3>


                                    <div className="mt-3 inline-flex rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-600">
                                        /
                                        {
                                            category.slug
                                        }
                                    </div>


                                    <p className="mt-5 text-xs text-slate-400">
                                        Created{" "}

                                        {new Date(
                                            category.created_at,
                                        ).toLocaleDateString(
                                            undefined,
                                            {
                                                dateStyle:
                                                    "medium",
                                            },
                                        )}
                                    </p>
                                </article>
                            ),
                        )}
                    </div>
                )}


            {!isLoading &&
                !loadError &&
                categories.length ===
                0 && (
                    <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
                        <FolderOpen
                            size={38}
                            aria-hidden="true"
                            className="mx-auto text-slate-400"
                        />


                        <h3 className="mt-5 text-2xl font-bold text-[#06154A]">
                            No categories yet
                        </h3>


                        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
                            Create your first category to
                            begin organizing GenLeaders
                            articles.
                        </p>


                        <button
                            type="button"
                            onClick={
                                openCreateModal
                            }
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#06154A] px-5 py-3 font-semibold text-white transition hover:bg-[#0a206c]"
                        >
                            <Plus
                                size={18}
                                aria-hidden="true"
                            />

                            Create Category
                        </button>
                    </div>
                )}


            <CategoryFormModal
                isOpen={
                    isFormOpen
                }

                category={
                    editingCategory
                }

                isSubmitting={
                    isCreating ||
                    isUpdating
                }

                errorMessage={
                    editingCategory
                        ? updateError?.message
                        : createError?.message
                }

                onClose={
                    closeFormModal
                }

                onSubmit={
                    handleSubmit
                }
            />


            <DeleteCategoryModal
                category={
                    deletingCategory
                }

                isDeleting={
                    isDeleting
                }

                errorMessage={
                    deleteError?.message
                }

                onClose={
                    closeDeleteModal
                }

                onConfirm={
                    handleDelete
                }
            />
        </div>
    );
}