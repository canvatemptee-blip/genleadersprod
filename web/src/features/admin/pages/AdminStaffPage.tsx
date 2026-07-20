import {
    CheckCircle2,
    Clock3,
    Plus,
    ShieldCheck,
    UserRound,
    Users,
    X,
    XCircle,
} from "lucide-react";

import {
    useState,
} from "react";

import type {
    SyntheticEvent,
} from "react";

import {
    useAdminStaff,
    useCreateStaffAccount,
    useUpdateStaffRole,
    useUpdateStaffStatus,
} from "@/shared/hooks/useAdminStaff";

import {
    authToken,
} from "@/shared/services/authToken";

import type {
    AdminRole,
} from "@/types/auth";

import type {
    CreateStaffPayload,
    StaffAccount,
} from "@/types/staff";


const roles:
    AdminRole[] = [
        "admin",
        "manager",
        "intern",
    ];


function formatDateTime(
    value: string | null,
) {
    if (!value) {
        return "Never";
    }


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


function getRoleClasses(
    role: AdminRole,
) {
    switch (role) {
        case "admin":
            return "bg-purple-50 text-purple-700 ring-purple-600/20";

        case "manager":
            return "bg-blue-50 text-blue-700 ring-blue-600/20";

        case "intern":
        default:
            return "bg-slate-100 text-slate-700 ring-slate-500/20";
    }
}


interface CreateStaffModalProps {
    isOpen: boolean;

    isSubmitting: boolean;

    errorMessage?: string;

    onClose: () => void;

    onSubmit: (
        data: CreateStaffPayload,
    ) => void;
}


function CreateStaffModal({
    isOpen,
    isSubmitting,
    errorMessage,
    onClose,
    onSubmit,
}: CreateStaffModalProps) {
    const [
        form,
        setForm,
    ] =
        useState<CreateStaffPayload>({
            name: "",
            email: "",
            password: "",
            role: "intern",
        });


    if (!isOpen) {
        return null;
    }


    const handleSubmit = (
        event:
            SyntheticEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        onSubmit(
            form,
        );
    };


    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-staff-title"
            className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 px-5 py-8"
        >
            <div className="max-h-full w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                            Staff Account
                        </p>


                        <h2
                            id="create-staff-title"
                            className="mt-2 text-3xl font-bold text-[#06154A]"
                        >
                            Create account
                        </h2>


                        <p className="mt-3 leading-7 text-slate-600">
                            Create credentials for a new
                            GenLeaders staff member.
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
                        aria-label="Close create staff dialog"
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
                            htmlFor="staff-name"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Name
                        </label>


                        <input
                            id="staff-name"
                            type="text"
                            required
                            minLength={2}
                            maxLength={100}
                            value={
                                form.name
                            }
                            onChange={(
                                event,
                            ) =>
                                setForm({
                                    ...form,

                                    name:
                                        event.target.value,
                                })
                            }
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            placeholder="Staff member name"
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="staff-email"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Email
                        </label>


                        <input
                            id="staff-email"
                            type="email"
                            required
                            value={
                                form.email
                            }
                            onChange={(
                                event,
                            ) =>
                                setForm({
                                    ...form,

                                    email:
                                        event.target.value,
                                })
                            }
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            placeholder="name@genleaders.in"
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="staff-password"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Temporary password
                        </label>


                        <input
                            id="staff-password"
                            type="password"
                            required
                            minLength={8}
                            maxLength={100}
                            value={
                                form.password
                            }
                            onChange={(
                                event,
                            ) =>
                                setForm({
                                    ...form,

                                    password:
                                        event.target.value,
                                })
                            }
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            placeholder="Minimum 8 characters"
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="staff-role"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Role
                        </label>


                        <select
                            id="staff-role"
                            value={
                                form.role
                            }
                            onChange={(
                                event,
                            ) =>
                                setForm({
                                    ...form,

                                    role:
                                        event.target.value as AdminRole,
                                })
                            }
                            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        >
                            {roles.map(
                                (
                                    role,
                                ) => (
                                    <option
                                        key={
                                            role
                                        }
                                        value={
                                            role
                                        }
                                    >
                                        {role
                                            .charAt(
                                                0,
                                            )
                                            .toUpperCase() +
                                            role.slice(
                                                1,
                                            )}
                                    </option>
                                ),
                            )}
                        </select>
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
                                ? "Creating..."
                                : "Create account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default function AdminStaffPage() {
    const [
        isCreateOpen,
        setIsCreateOpen,
    ] =
        useState(
            false,
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


    const currentUserId =
        authToken.getPayload()
            ?.sub ??
        null;


    const {
        data:
        staff = [],

        isLoading,

        error:
        loadError,
    } =
        useAdminStaff();


    const {
        mutate:
        createStaff,

        isPending:
        isCreating,

        error:
        createError,

        reset:
        resetCreate,
    } =
        useCreateStaffAccount();


    const {
        mutate:
        updateRole,

        isPending:
        isUpdatingRole,
    } =
        useUpdateStaffRole();


    const {
        mutate:
        updateStatus,

        isPending:
        isUpdatingStatus,
    } =
        useUpdateStaffStatus();


    const openCreateModal =
        () => {
            setSuccessMessage(
                null,
            );

            resetCreate();

            setIsCreateOpen(
                true,
            );
        };


    const closeCreateModal =
        () => {
            if (
                isCreating
            ) {
                return;
            }


            resetCreate();

            setIsCreateOpen(
                false,
            );
        };


    const handleCreate = (
        data:
            CreateStaffPayload,
    ) => {
        setSuccessMessage(
            null,
        );


        createStaff(
            data,
            {
                onSuccess:
                    () => {
                        setIsCreateOpen(
                            false,
                        );

                        setSuccessMessage(
                            "Staff account created successfully.",
                        );
                    },
            },
        );
    };


    const handleRoleChange = (
        account:
            StaffAccount,

        role:
            AdminRole,
    ) => {
        if (
            account.id ===
            currentUserId ||
            account.role ===
            role
        ) {
            return;
        }


        setSuccessMessage(
            null,
        );


        updateRole(
            {
                id:
                    account.id,

                data: {
                    role,
                },
            },
            {
                onSuccess:
                    () => {
                        setSuccessMessage(
                            `${account.name}'s role was updated successfully.`,
                        );
                    },
            },
        );
    };


    const handleStatusChange = (
        account:
            StaffAccount,
    ) => {
        if (
            account.id ===
            currentUserId
        ) {
            return;
        }


        setSuccessMessage(
            null,
        );


        updateStatus(
            {
                id:
                    account.id,

                data: {
                    is_active:
                        !account.is_active,
                },
            },
            {
                onSuccess:
                    () => {
                        setSuccessMessage(
                            account.is_active
                                ? `${account.name}'s account was deactivated.`
                                : `${account.name}'s account was activated.`,
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
                        Administration
                    </p>


                    <h2 className="mt-2 text-3xl font-bold text-[#06154A]">
                        Staff Management
                    </h2>


                    <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                        Create staff accounts, assign
                        roles and control account access.
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

                    Add Staff
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
                <div className="mt-8 animate-pulse rounded-3xl border border-slate-200 bg-white p-8">
                    <div className="space-y-6">
                        {Array.from({
                            length:
                                4,
                        }).map(
                            (
                                _,
                                index,
                            ) => (
                                <div
                                    key={
                                        index
                                    }
                                    className="flex items-center gap-5"
                                >
                                    <div className="h-12 w-12 rounded-full bg-slate-200" />

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
                            Unable to load staff accounts
                        </h3>


                        <p className="mt-4 text-slate-600">
                            {
                                loadError.message
                            }
                        </p>
                    </div>
                )}


            {!isLoading &&
                !loadError && (
                    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-250">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-left">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Staff Member
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Role
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Last Login
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Access
                                        </th>
                                    </tr>
                                </thead>


                                <tbody className="divide-y divide-slate-100">
                                    {staff.map(
                                        (
                                            account,
                                        ) => {
                                            const isCurrentUser =
                                                account.id ===
                                                currentUserId;


                                            return (
                                                <tr
                                                    key={
                                                        account.id
                                                    }
                                                    className="transition hover:bg-slate-50/70"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#06154A]">
                                                                <UserRound
                                                                    size={20}
                                                                    aria-hidden="true"
                                                                />
                                                            </div>


                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <p className="font-semibold text-slate-900">
                                                                        {
                                                                            account.name
                                                                        }
                                                                    </p>


                                                                    {isCurrentUser && (
                                                                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                                                            You
                                                                        </span>
                                                                    )}
                                                                </div>


                                                                <p className="mt-1 text-sm text-slate-500">
                                                                    {
                                                                        account.email
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>


                                                    <td className="px-6 py-5">
                                                        {isCurrentUser ? (
                                                            <span
                                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${getRoleClasses(
                                                                    account.role,
                                                                )}`}
                                                            >
                                                                {
                                                                    account.role
                                                                }
                                                            </span>
                                                        ) : (
                                                            <select
                                                                value={
                                                                    account.role
                                                                }
                                                                disabled={
                                                                    isUpdatingRole
                                                                }
                                                                onChange={(
                                                                    event,
                                                                ) =>
                                                                    handleRoleChange(
                                                                        account,

                                                                        event.target.value as AdminRole,
                                                                    )
                                                                }
                                                                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold capitalize text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
                                                            >
                                                                {roles.map(
                                                                    (
                                                                        role,
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                role
                                                                            }
                                                                            value={
                                                                                role
                                                                            }
                                                                        >
                                                                            {
                                                                                role
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                        )}
                                                    </td>


                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${account.is_active
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-red-50 text-red-700"
                                                                }`}
                                                        >
                                                            {account.is_active ? (
                                                                <CheckCircle2
                                                                    size={14}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <XCircle
                                                                    size={14}
                                                                    aria-hidden="true"
                                                                />
                                                            )}


                                                            {account.is_active
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </span>
                                                    </td>


                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <Clock3
                                                                size={16}
                                                                aria-hidden="true"
                                                            />

                                                            {formatDateTime(
                                                                account.last_login_at,
                                                            )}
                                                        </div>
                                                    </td>


                                                    <td className="px-6 py-5 text-right">
                                                        {isCurrentUser ? (
                                                            <span className="text-sm font-medium text-slate-400">
                                                                Current session
                                                            </span>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    isUpdatingStatus
                                                                }
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        account,
                                                                    )
                                                                }
                                                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${account.is_active
                                                                    ? "border border-red-200 text-red-700 hover:bg-red-50"
                                                                    : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                                                    }`}
                                                            >
                                                                {account.is_active
                                                                    ? "Deactivate"
                                                                    : "Activate"}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>


                        {staff.length ===
                            0 && (
                                <div className="px-8 py-16 text-center">
                                    <Users
                                        size={34}
                                        aria-hidden="true"
                                        className="mx-auto text-slate-400"
                                    />


                                    <h3 className="mt-5 text-xl font-bold text-[#06154A]">
                                        No staff accounts found
                                    </h3>
                                </div>
                            )}
                    </div>
                )}


            <CreateStaffModal
                isOpen={
                    isCreateOpen
                }

                isSubmitting={
                    isCreating
                }

                errorMessage={
                    createError
                        ?.message
                }

                onClose={
                    closeCreateModal
                }

                onSubmit={
                    handleCreate
                }
            />


            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-800">
                <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                />


                <p className="leading-6">
                    Only administrators can access this
                    workspace. Your own role and account
                    status cannot be changed from this
                    page.
                </p>
            </div>
        </div>
    );
}