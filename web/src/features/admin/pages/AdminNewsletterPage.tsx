import {
    CheckCircle2,
    Clock3,
    Mail,
    Search,
    Trash2,
    Users,
    X,
} from "lucide-react";

import {
    useMemo,
    useState,
} from "react";

import {
    useAdminNewsletter,
    useDeleteNewsletterSubscriber,
} from "@/shared/hooks/useAdminNewsletter";

import type {
    NewsletterSubscriber,
} from "@/types/newsletter";


type SubscriberFilter =
    | "all"
    | "verified"
    | "pending";


function formatDateTime(
    value: string,
) {
    return new Date(
        value,
    ).toLocaleString(
        undefined,
        {
            dateStyle:
                "medium",

            timeStyle:
                "short",
        },
    );
}


function getVerificationExpiryLabel(
    subscriber:
        NewsletterSubscriber,
) {
    if (
        subscriber.is_verified
    ) {
        return null;
    }


    if (
        !subscriber
            .verification_expires_at
    ) {
        return "No active verification link";
    }


    const expiresAt =
        new Date(
            subscriber
                .verification_expires_at,
        );


    if (
        expiresAt.getTime() <
        Date.now()
    ) {
        return "Verification link expired";
    }


    return `Link expires ${formatDateTime(
        subscriber
            .verification_expires_at,
    )}`;
}


interface DeleteSubscriberModalProps {
    subscriber:
    NewsletterSubscriber | null;

    isDeleting:
    boolean;

    errorMessage?:
    string;

    onClose:
    () => void;

    onConfirm:
    () => void;
}


function DeleteSubscriberModal({
    subscriber,
    isDeleting,
    errorMessage,
    onClose,
    onConfirm,
}: DeleteSubscriberModalProps) {
    if (
        !subscriber
    ) {
        return null;
    }


    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-subscriber-title"
            className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 px-5 py-8"
        >
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                <div className="flex items-start justify-between gap-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                        <Trash2
                            size={24}
                            aria-hidden="true"
                        />
                    </div>


                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        disabled={
                            isDeleting
                        }
                        aria-label="Close delete subscriber dialog"
                        className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                        <X
                            size={19}
                            aria-hidden="true"
                        />
                    </button>
                </div>


                <h2
                    id="delete-subscriber-title"
                    className="mt-6 text-2xl font-bold text-[#06154A]"
                >
                    Remove newsletter record?
                </h2>


                <p className="mt-4 leading-7 text-slate-600">
                    You are about to remove{" "}

                    <strong className="break-all text-slate-900">
                        {
                            subscriber.email
                        }
                    </strong>

                    {" "}from the newsletter database.
                </p>


                {!subscriber.is_verified && (
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        This address is still pending email
                        verification and is not part of the
                        verified newsletter audience.
                    </p>
                )}


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
                        {
                            isDeleting
                                ? "Removing..."
                                : "Remove record"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}


export default function AdminNewsletterPage() {
    const [
        searchQuery,
        setSearchQuery,
    ] =
        useState(
            "",
        );


    const [
        statusFilter,
        setStatusFilter,
    ] =
        useState<SubscriberFilter>(
            "all",
        );


    const [
        subscriberToDelete,
        setSubscriberToDelete,
    ] =
        useState<
            NewsletterSubscriber | null
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
        subscribers = [],

        isLoading,

        error:
        loadError,
    } =
        useAdminNewsletter();


    const {
        mutate:
        deleteSubscriber,

        isPending:
        isDeleting,

        error:
        deleteError,

        reset:
        resetDelete,
    } =
        useDeleteNewsletterSubscriber();


    const verifiedCount =
        useMemo(
            () =>
                subscribers.filter(
                    (
                        subscriber,
                    ) =>
                        subscriber
                            .is_verified,
                ).length,
            [
                subscribers,
            ],
        );


    const pendingCount =
        subscribers.length -
        verifiedCount;


    const filteredSubscribers =
        useMemo(
            () => {
                const query =
                    searchQuery
                        .trim()
                        .toLowerCase();


                return subscribers.filter(
                    (
                        subscriber,
                    ) => {
                        const matchesSearch =
                            !query ||
                            subscriber.email
                                .toLowerCase()
                                .includes(
                                    query,
                                );


                        const matchesStatus =
                            statusFilter ===
                            "all" ||
                            (
                                statusFilter ===
                                "verified" &&
                                subscriber
                                    .is_verified
                            ) ||
                            (
                                statusFilter ===
                                "pending" &&
                                !subscriber
                                    .is_verified
                            );


                        return (
                            matchesSearch &&
                            matchesStatus
                        );
                    },
                );
            },
            [
                subscribers,
                searchQuery,
                statusFilter,
            ],
        );


    const openDeleteModal = (
        subscriber:
            NewsletterSubscriber,
    ) => {
        setSuccessMessage(
            null,
        );


        resetDelete();


        setSubscriberToDelete(
            subscriber,
        );
    };


    const closeDeleteModal =
        () => {
            if (
                isDeleting
            ) {
                return;
            }


            setSubscriberToDelete(
                null,
            );


            resetDelete();
        };


    const handleDelete =
        () => {
            if (
                !subscriberToDelete
            ) {
                return;
            }


            const email =
                subscriberToDelete
                    .email;


            deleteSubscriber(
                subscriberToDelete.id,
                {
                    onSuccess:
                        () => {
                            setSubscriberToDelete(
                                null,
                            );


                            setSuccessMessage(
                                `${email} was removed from the newsletter database.`,
                            );
                        },
                },
            );
        };


    return (
        <div className="mx-auto max-w-7xl">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Audience Management
                </p>


                <h2 className="mt-2 text-3xl font-bold text-[#06154A]">
                    Newsletter Audience
                </h2>


                <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                    Monitor verified subscribers, pending
                    email confirmations and newsletter
                    audience records.
                </p>
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


            {!isLoading &&
                !loadError && (
                    <section className="mt-8 grid gap-5 sm:grid-cols-3">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                    <Users
                                        size={22}
                                        aria-hidden="true"
                                    />
                                </div>


                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Total Records
                                    </p>


                                    <p className="mt-1 text-3xl font-bold text-[#06154A]">
                                        {
                                            subscribers.length
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="rounded-3xl border border-slate-200 bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <CheckCircle2
                                        size={22}
                                        aria-hidden="true"
                                    />
                                </div>


                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Verified Audience
                                    </p>


                                    <p className="mt-1 text-3xl font-bold text-[#06154A]">
                                        {
                                            verifiedCount
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="rounded-3xl border border-slate-200 bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                                    <Clock3
                                        size={22}
                                        aria-hidden="true"
                                    />
                                </div>


                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Pending Verification
                                    </p>


                                    <p className="mt-1 text-3xl font-bold text-[#06154A]">
                                        {
                                            pendingCount
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


            {!isLoading &&
                !loadError &&
                subscribers.length >
                0 && (
                    <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-md">
                            <Search
                                size={18}
                                aria-hidden="true"
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />


                            <input
                                type="search"
                                value={
                                    searchQuery
                                }
                                onChange={(
                                    event,
                                ) =>
                                    setSearchQuery(
                                        event
                                            .target
                                            .value,
                                    )
                                }
                                placeholder="Search subscriber email"
                                aria-label="Search subscriber email"
                                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>


                        <div className="flex flex-wrap gap-2">
                            {(
                                [
                                    {
                                        value:
                                            "all",

                                        label:
                                            "All",
                                    },

                                    {
                                        value:
                                            "verified",

                                        label:
                                            "Verified",
                                    },

                                    {
                                        value:
                                            "pending",

                                        label:
                                            "Pending",
                                    },
                                ] as const
                            ).map(
                                (
                                    filter,
                                ) => (
                                    <button
                                        key={
                                            filter.value
                                        }
                                        type="button"
                                        onClick={() =>
                                            setStatusFilter(
                                                filter.value,
                                            )
                                        }
                                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${statusFilter ===
                                                filter.value
                                                ? "bg-[#06154A] text-white"
                                                : "border border-slate-300 bg-white text-slate-600 hover:border-[#06154A] hover:text-[#06154A]"
                                            }`}
                                    >
                                        {
                                            filter.label
                                        }
                                    </button>
                                ),
                            )}
                        </div>
                    </div>
                )}


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
                                    className="flex items-center gap-5 p-6"
                                >
                                    <div className="h-11 w-11 rounded-full bg-slate-200" />


                                    <div className="flex-1 space-y-3">
                                        <div className="h-5 w-1/3 rounded bg-slate-200" />

                                        <div className="h-4 w-1/4 rounded bg-slate-200" />
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            )}


            {!isLoading &&
                loadError && (
                    <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 px-8 py-14 text-center">
                        <h3 className="text-2xl font-bold text-[#06154A]">
                            Unable to load newsletter audience
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
                subscribers.length ===
                0 && (
                    <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
                        <Mail
                            size={38}
                            aria-hidden="true"
                            className="mx-auto text-slate-400"
                        />


                        <h3 className="mt-5 text-2xl font-bold text-[#06154A]">
                            No newsletter records yet
                        </h3>


                        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
                            Subscription requests from the
                            public website will appear here.
                        </p>
                    </div>
                )}


            {!isLoading &&
                !loadError &&
                subscribers.length >
                0 && (
                    <div className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-225">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-left">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Email
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Requested
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Verification
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>


                                <tbody className="divide-y divide-slate-100">
                                    {filteredSubscribers.map(
                                        (
                                            subscriber,
                                        ) => {
                                            const expiryLabel =
                                                getVerificationExpiryLabel(
                                                    subscriber,
                                                );


                                            return (
                                                <tr
                                                    key={
                                                        subscriber.id
                                                    }
                                                    className="transition hover:bg-slate-50/70"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                                                                <Mail
                                                                    size={19}
                                                                    aria-hidden="true"
                                                                />
                                                            </div>


                                                            <p className="font-semibold text-slate-900">
                                                                {
                                                                    subscriber.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>


                                                    <td className="px-6 py-5">
                                                        {subscriber.is_verified ? (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                                                                <CheckCircle2
                                                                    size={14}
                                                                    aria-hidden="true"
                                                                />

                                                                Verified
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                                                                <Clock3
                                                                    size={14}
                                                                    aria-hidden="true"
                                                                />

                                                                Pending
                                                            </span>
                                                        )}
                                                    </td>


                                                    <td className="px-6 py-5 text-sm text-slate-600">
                                                        {formatDateTime(
                                                            subscriber
                                                                .subscribed_at,
                                                        )}
                                                    </td>


                                                    <td className="px-6 py-5">
                                                        {subscriber.is_verified ? (
                                                            <div>
                                                                <p className="text-sm font-medium text-slate-700">
                                                                    Verified
                                                                </p>

                                                                <p className="mt-1 text-xs text-slate-500">
                                                                    {
                                                                        subscriber
                                                                            .verified_at
                                                                            ? formatDateTime(
                                                                                subscriber
                                                                                    .verified_at,
                                                                            )
                                                                            : "Verification date unavailable"
                                                                    }
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <p className="text-sm font-medium text-amber-700">
                                                                    Awaiting confirmation
                                                                </p>

                                                                <p className="mt-1 text-xs text-slate-500">
                                                                    {
                                                                        expiryLabel
                                                                    }
                                                                </p>
                                                            </div>
                                                        )}
                                                    </td>


                                                    <td className="px-6 py-5 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openDeleteModal(
                                                                    subscriber,
                                                                )
                                                            }
                                                            aria-label={`Remove ${subscriber.email}`}
                                                            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                                                        >
                                                            <Trash2
                                                                size={17}
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>


                        {filteredSubscribers.length ===
                            0 && (
                                <div className="px-8 py-14 text-center">
                                    <Search
                                        size={32}
                                        aria-hidden="true"
                                        className="mx-auto text-slate-400"
                                    />


                                    <h3 className="mt-4 text-xl font-bold text-[#06154A]">
                                        No matching records
                                    </h3>


                                    <p className="mt-2 text-slate-600">
                                        Try another email search
                                        or change the status
                                        filter.
                                    </p>
                                </div>
                            )}
                    </div>
                )}


            <DeleteSubscriberModal
                subscriber={
                    subscriberToDelete
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