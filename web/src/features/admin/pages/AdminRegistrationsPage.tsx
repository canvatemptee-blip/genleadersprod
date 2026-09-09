import {
    CheckCircle2,
    ClipboardList,
    Clock3,
    Eye,
    Mail,
    Phone,
    Search,
    Trash2,
    X,
} from "lucide-react";

import {
    useMemo,
    useState,
} from "react";

import {
    useAdminRegistrations,
    useDeleteRegistration,
    useUpdateRegistrationStatus,
} from "@/shared/hooks/useAdminRegistrations";

import {
    LOOKING_FOR_LABELS,
    LOOKING_FOR_VALUES,
    REGISTRATION_STATUS_LABELS,
    REGISTRATION_STATUS_VALUES,
    SEARCHING_AS_LABELS,
} from "@/types/registration";

import type {
    LookingFor,
    Registration,
    RegistrationStatus,
} from "@/types/registration";


type StatusFilter =
    | "all"
    | RegistrationStatus;


type LookingForFilter =
    | "all"
    | LookingFor;


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


const statusBadgeStyles:
    Record<
        RegistrationStatus,
        string
    > = {
    new:
        "bg-blue-50 text-blue-700",

    contacted:
        "bg-amber-50 text-amber-700",

    closed:
        "bg-emerald-50 text-emerald-700",
};


function StatusBadge({
    status,
}: {
    status: RegistrationStatus;
}) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${statusBadgeStyles[
                status
            ]}`}
        >
            {
                REGISTRATION_STATUS_LABELS[
                status
                ]
            }
        </span>
    );
}


interface RegistrationDetailModalProps {
    registration:
    Registration | null;

    isUpdating:
    boolean;

    errorMessage?:
    string;

    onClose:
    () => void;

    onUpdateStatus:
    (
        status:
            RegistrationStatus,
    ) => void;
}


function RegistrationDetailModal({
    registration,
    isUpdating,
    errorMessage,
    onClose,
    onUpdateStatus,
}: RegistrationDetailModalProps) {
    if (
        !registration
    ) {
        return null;
    }


    const answers = [
        {
            label:
                "Full Name",

            value:
                registration.full_name,
        },

        {
            label:
                "Contact No. (WhatsApp)",

            value:
                registration.contact_number,
        },

        {
            label:
                "Searching for as",

            value:
                SEARCHING_AS_LABELS[
                registration
                    .searching_as
                ],
        },

        {
            label:
                "Looking For (If Specific please choose Callback)",

            value:
                LOOKING_FOR_LABELS[
                registration
                    .looking_for
                ],
        },

        {
            label:
                "Best time to reach you",

            value:
                registration
                    .best_time_to_reach,
        },

        {
            label:
                "Email Id",

            value:
                registration.email,
        },
    ];


    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-detail-title"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 sm:p-6"
        >
            <div className="my-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                            Registration
                        </p>


                        <h2
                            id="registration-detail-title"
                            className="mt-2 text-2xl font-bold text-[#06154A]"
                        >
                            {
                                registration.full_name
                            }
                        </h2>


                        <p className="mt-2 text-sm text-slate-500">
                            Submitted{" "}

                            {formatDateTime(
                                registration
                                    .created_at,
                            )}
                        </p>
                    </div>


                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        aria-label="Close registration details"
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[#06154A]"
                    >
                        <X
                            size={19}
                            aria-hidden="true"
                        />
                    </button>
                </div>


                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <StatusBadge
                        status={
                            registration.status
                        }
                    />


                    <a
                        href={`mailto:${registration.email}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#06154A] hover:text-[#06154A]"
                    >
                        <Mail
                            size={15}
                            aria-hidden="true"
                        />

                        Email
                    </a>


                    <a
                        href={`tel:${registration.contact_number.replace(
                            /\s/g,
                            "",
                        )}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#06154A] hover:text-[#06154A]"
                    >
                        <Phone
                            size={15}
                            aria-hidden="true"
                        />

                        Call
                    </a>
                </div>


                <dl className="mt-7 space-y-5 border-t border-slate-100 pt-7">
                    {answers.map(
                        (
                            answer,
                        ) => (
                            <div
                                key={
                                    answer.label
                                }
                            >
                                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    {
                                        answer.label
                                    }
                                </dt>


                                <dd className="mt-1.5 break-words leading-7 text-slate-900">
                                    {
                                        answer.value
                                    }
                                </dd>
                            </div>
                        ),
                    )}
                </dl>


                {errorMessage && (
                    <div
                        role="alert"
                        className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700"
                    >
                        {errorMessage}
                    </div>
                )}


                <div className="mt-8 border-t border-slate-100 pt-6">
                    <p className="text-sm font-semibold text-slate-800">
                        Update status
                    </p>


                    <div className="mt-3 flex flex-wrap gap-2">
                        {REGISTRATION_STATUS_VALUES.map(
                            (
                                status,
                            ) => (
                                <button
                                    key={
                                        status
                                    }
                                    type="button"
                                    disabled={
                                        isUpdating ||
                                        registration.status ===
                                        status
                                    }
                                    onClick={() =>
                                        onUpdateStatus(
                                            status,
                                        )
                                    }
                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed ${registration.status ===
                                        status
                                        ? "bg-[#06154A] text-white"
                                        : "border border-slate-300 bg-white text-slate-600 hover:border-[#06154A] hover:text-[#06154A] disabled:opacity-50"
                                        }`}
                                >
                                    {
                                        REGISTRATION_STATUS_LABELS[
                                        status
                                        ]
                                    }
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


interface DeleteRegistrationModalProps {
    registration:
    Registration | null;

    isDeleting:
    boolean;

    errorMessage?:
    string;

    onClose:
    () => void;

    onConfirm:
    () => void;
}


function DeleteRegistrationModal({
    registration,
    isDeleting,
    errorMessage,
    onClose,
    onConfirm,
}: DeleteRegistrationModalProps) {
    if (
        !registration
    ) {
        return null;
    }


    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-registration-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 sm:p-6"
        >
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        disabled={
                            isDeleting
                        }
                        aria-label="Close dialog"
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[#06154A] disabled:opacity-50"
                    >
                        <X
                            size={19}
                            aria-hidden="true"
                        />
                    </button>
                </div>


                <h2
                    id="delete-registration-title"
                    className="mt-2 text-2xl font-bold text-[#06154A]"
                >
                    Remove this registration?
                </h2>


                <p className="mt-4 leading-7 text-slate-600">
                    You are about to permanently remove the
                    registration submitted by{" "}

                    <strong className="break-all text-slate-900">
                        {
                            registration.full_name
                        }
                    </strong>

                    . This cannot be undone.
                </p>


                {errorMessage && (
                    <div
                        role="alert"
                        className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700"
                    >
                        {errorMessage}
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
                                : "Remove registration"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}


export default function AdminRegistrationsPage() {
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
        useState<StatusFilter>(
            "all",
        );


    const [
        lookingForFilter,
        setLookingForFilter,
    ] =
        useState<LookingForFilter>(
            "all",
        );


    const [
        selectedId,
        setSelectedId,
    ] =
        useState<
            number | null
        >(
            null,
        );


    const [
        registrationToDelete,
        setRegistrationToDelete,
    ] =
        useState<
            Registration | null
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
        registrations = [],

        isLoading,

        error:
        loadError,
    } =
        useAdminRegistrations();


    const {
        mutate:
        updateStatus,

        isPending:
        isUpdating,

        error:
        updateError,

        reset:
        resetUpdate,
    } =
        useUpdateRegistrationStatus();


    const {
        mutate:
        deleteRegistration,

        isPending:
        isDeleting,

        error:
        deleteError,

        reset:
        resetDelete,
    } =
        useDeleteRegistration();


    const selectedRegistration =
        useMemo(
            () =>
                registrations.find(
                    (
                        registration,
                    ) =>
                        registration.id ===
                        selectedId,
                ) ?? null,
            [
                registrations,
                selectedId,
            ],
        );


    const newCount =
        registrations.filter(
            (
                registration,
            ) =>
                registration.status ===
                "new",
        ).length;


    const contactedCount =
        registrations.filter(
            (
                registration,
            ) =>
                registration.status ===
                "contacted",
        ).length;


    const filteredRegistrations =
        useMemo(
            () => {
                const query =
                    searchQuery
                        .trim()
                        .toLowerCase();


                return registrations.filter(
                    (
                        registration,
                    ) => {
                        const matchesSearch =
                            !query ||
                            [
                                registration
                                    .full_name,

                                registration
                                    .email,

                                registration
                                    .contact_number,
                            ].some(
                                (
                                    field,
                                ) =>
                                    field
                                        .toLowerCase()
                                        .includes(
                                            query,
                                        ),
                            );


                        const matchesStatus =
                            statusFilter ===
                            "all" ||
                            registration.status ===
                            statusFilter;


                        const matchesLookingFor =
                            lookingForFilter ===
                            "all" ||
                            registration
                                .looking_for ===
                            lookingForFilter;


                        return (
                            matchesSearch &&
                            matchesStatus &&
                            matchesLookingFor
                        );
                    },
                );
            },
            [
                registrations,
                searchQuery,
                statusFilter,
                lookingForFilter,
            ],
        );


    const openDetail = (
        registration:
            Registration,
    ) => {
        setSuccessMessage(
            null,
        );


        resetUpdate();


        setSelectedId(
            registration.id,
        );
    };


    const closeDetail =
        () => {
            if (isUpdating) {
                return;
            }


            setSelectedId(
                null,
            );


            resetUpdate();
        };


    const handleUpdateStatus = (
        status:
            RegistrationStatus,
    ) => {
        if (
            !selectedRegistration
        ) {
            return;
        }


        updateStatus(
            {
                id:
                    selectedRegistration.id,

                status,
            },
            {
                onSuccess:
                    () => {
                        setSuccessMessage(
                            `${selectedRegistration.full_name} was marked as ${REGISTRATION_STATUS_LABELS[
                                status
                            ].toLowerCase()}.`,
                        );
                    },
            },
        );
    };


    const openDeleteModal = (
        registration:
            Registration,
    ) => {
        setSuccessMessage(
            null,
        );


        resetDelete();


        setSelectedId(
            null,
        );


        setRegistrationToDelete(
            registration,
        );
    };


    const closeDeleteModal =
        () => {
            if (isDeleting) {
                return;
            }


            setRegistrationToDelete(
                null,
            );


            resetDelete();
        };


    const handleDelete =
        () => {
            if (
                !registrationToDelete
            ) {
                return;
            }


            const name =
                registrationToDelete
                    .full_name;


            deleteRegistration(
                registrationToDelete.id,
                {
                    onSuccess:
                        () => {
                            setRegistrationToDelete(
                                null,
                            );


                            setSuccessMessage(
                                `The registration submitted by ${name} was removed.`,
                            );
                        },
                },
            );
        };


    return (
        <div className="mx-auto max-w-7xl">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Lead Management
                </p>


                <h2 className="mt-2 text-3xl font-bold text-[#06154A]">
                    Registrations
                </h2>


                <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                    Review Get Featured registrations
                    submitted from the public website and
                    track your follow up.
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
                        {successMessage}
                    </p>
                </div>
            )}


            {!isLoading &&
                !loadError && (
                    <section className="mt-8 grid gap-5 sm:grid-cols-3">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                                    <ClipboardList
                                        size={22}
                                        aria-hidden="true"
                                    />
                                </div>


                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Total Registrations
                                    </p>


                                    <p className="mt-1 text-3xl font-bold text-[#06154A]">
                                        {
                                            registrations.length
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="rounded-3xl border border-slate-200 bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                    <Clock3
                                        size={22}
                                        aria-hidden="true"
                                    />
                                </div>


                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Awaiting Contact
                                    </p>


                                    <p className="mt-1 text-3xl font-bold text-[#06154A]">
                                        {newCount}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="rounded-3xl border border-slate-200 bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                                    <CheckCircle2
                                        size={22}
                                        aria-hidden="true"
                                    />
                                </div>


                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Contacted
                                    </p>


                                    <p className="mt-1 text-3xl font-bold text-[#06154A]">
                                        {
                                            contactedCount
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


            {!isLoading &&
                !loadError &&
                registrations.length >
                0 && (
                    <div className="mt-7 space-y-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
                                    placeholder="Search name, email or phone"
                                    aria-label="Search registrations by name, email or phone"
                                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>


                            <div className="flex flex-wrap gap-2">
                                {(
                                    [
                                        "all",
                                        ...REGISTRATION_STATUS_VALUES,
                                    ] as const
                                ).map(
                                    (
                                        filter,
                                    ) => (
                                        <button
                                            key={
                                                filter
                                            }
                                            type="button"
                                            onClick={() =>
                                                setStatusFilter(
                                                    filter,
                                                )
                                            }
                                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${statusFilter ===
                                                filter
                                                ? "bg-[#06154A] text-white"
                                                : "border border-slate-300 bg-white text-slate-600 hover:border-[#06154A] hover:text-[#06154A]"
                                                }`}
                                        >
                                            {
                                                filter ===
                                                    "all"
                                                    ? "All"
                                                    : REGISTRATION_STATUS_LABELS[
                                                    filter
                                                    ]
                                            }
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>


                        <div className="flex flex-wrap gap-2">
                            {(
                                [
                                    "all",
                                    ...LOOKING_FOR_VALUES,
                                ] as const
                            ).map(
                                (
                                    filter,
                                ) => (
                                    <button
                                        key={
                                            filter
                                        }
                                        type="button"
                                        onClick={() =>
                                            setLookingForFilter(
                                                filter,
                                            )
                                        }
                                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${lookingForFilter ===
                                            filter
                                            ? "bg-blue-600 text-white"
                                            : "border border-slate-200 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-700"
                                            }`}
                                    >
                                        {
                                            filter ===
                                                "all"
                                                ? "All services"
                                                : LOOKING_FOR_LABELS[
                                                filter
                                                ]
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
                            length: 5,
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
                            Unable to load registrations
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
                registrations.length ===
                0 && (
                    <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
                        <ClipboardList
                            size={38}
                            aria-hidden="true"
                            className="mx-auto text-slate-400"
                        />


                        <h3 className="mt-5 text-2xl font-bold text-[#06154A]">
                            No registrations yet
                        </h3>


                        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
                            Submissions from the Get Featured
                            form on the public website will
                            appear here.
                        </p>
                    </div>
                )}


            {!isLoading &&
                !loadError &&
                registrations.length >
                0 && (
                    <div className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-250">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-left">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Name
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Looking For
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Searching As
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Best Time
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Submitted
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>


                                <tbody className="divide-y divide-slate-100">
                                    {filteredRegistrations.map(
                                        (
                                            registration,
                                        ) => (
                                            <tr
                                                key={
                                                    registration.id
                                                }
                                                className="transition hover:bg-slate-50/70"
                                            >
                                                <td className="px-6 py-5">
                                                    <p className="font-semibold text-slate-900">
                                                        {
                                                            registration.full_name
                                                        }
                                                    </p>


                                                    <p className="mt-1 break-all text-sm text-slate-500">
                                                        {
                                                            registration.email
                                                        }
                                                    </p>


                                                    <p className="mt-0.5 text-sm text-slate-500">
                                                        {
                                                            registration.contact_number
                                                        }
                                                    </p>
                                                </td>


                                                <td className="px-6 py-5">
                                                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                                                        {
                                                            LOOKING_FOR_LABELS[
                                                            registration
                                                                .looking_for
                                                            ]
                                                        }
                                                    </span>
                                                </td>


                                                <td className="px-6 py-5 text-sm text-slate-600">
                                                    {
                                                        SEARCHING_AS_LABELS[
                                                        registration
                                                            .searching_as
                                                        ]
                                                    }
                                                </td>


                                                <td className="px-6 py-5 text-sm text-slate-600">
                                                    {
                                                        registration
                                                            .best_time_to_reach
                                                    }
                                                </td>


                                                <td className="px-6 py-5">
                                                    <StatusBadge
                                                        status={
                                                            registration.status
                                                        }
                                                    />
                                                </td>


                                                <td className="px-6 py-5 text-sm text-slate-600">
                                                    {formatDateTime(
                                                        registration
                                                            .created_at,
                                                    )}
                                                </td>


                                                <td className="px-6 py-5">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openDetail(
                                                                    registration,
                                                                )
                                                            }
                                                            aria-label={`View registration from ${registration.full_name}`}
                                                            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-[#06154A] hover:bg-slate-50 hover:text-[#06154A]"
                                                        >
                                                            <Eye
                                                                size={17}
                                                                aria-hidden="true"
                                                            />
                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openDeleteModal(
                                                                    registration,
                                                                )
                                                            }
                                                            aria-label={`Remove registration from ${registration.full_name}`}
                                                            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                                                        >
                                                            <Trash2
                                                                size={17}
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>


                        {filteredRegistrations.length ===
                            0 && (
                                <div className="px-8 py-14 text-center">
                                    <Search
                                        size={32}
                                        aria-hidden="true"
                                        className="mx-auto text-slate-400"
                                    />


                                    <h3 className="mt-4 text-xl font-bold text-[#06154A]">
                                        No matching registrations
                                    </h3>


                                    <p className="mt-2 text-slate-600">
                                        Try another search term
                                        or clear the filters.
                                    </p>
                                </div>
                            )}
                    </div>
                )}


            <RegistrationDetailModal
                registration={
                    selectedRegistration
                }

                isUpdating={
                    isUpdating
                }

                errorMessage={
                    updateError?.message
                }

                onClose={
                    closeDetail
                }

                onUpdateStatus={
                    handleUpdateStatus
                }
            />


            <DeleteRegistrationModal
                registration={
                    registrationToDelete
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
