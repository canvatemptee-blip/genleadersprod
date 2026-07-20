import {
    FileText,
    FolderOpen,
    LayoutDashboard,
    Mail,
    UsersRound,
    X,
} from "lucide-react";

import {
    NavLink,
} from "react-router-dom";

import {
    ROUTES,
} from "@/config/routes";

import {
    canManageCategories,
    canManageNewsletter,
    canManageStaff,
} from "@/features/auth/permissions";

import {
    authToken,
} from "@/shared/services/authToken";


interface AdminSidebarProps {
    isOpen: boolean;

    onClose: () => void;
}


export default function AdminSidebar({
    isOpen,
    onClose,
}: AdminSidebarProps) {
    const role =
        authToken.getRole();


    const navigation = [
        {
            label:
                "Dashboard",

            href:
                ROUTES.ADMIN,

            icon:
                LayoutDashboard,

            end:
                true,

            visible:
                true,
        },

        {
            label:
                "Articles",

            href:
                ROUTES.ADMIN_ARTICLES,

            icon:
                FileText,

            end:
                false,

            visible:
                true,
        },

        {
            label:
                "Categories",

            href:
                ROUTES.ADMIN_CATEGORIES,

            icon:
                FolderOpen,

            end:
                false,

            visible:
                canManageCategories(
                    role,
                ),
        },

        {
            label:
                "Newsletter",

            href:
                ROUTES.ADMIN_NEWSLETTER,

            icon:
                Mail,

            end:
                false,

            visible:
                canManageNewsletter(
                    role,
                ),
        },

        {
            label:
                "Staff",

            href:
                ROUTES.ADMIN_STAFF,

            icon:
                UsersRound,

            end:
                false,

            visible:
                canManageStaff(
                    role,
                ),
        },
    ].filter(
        (item) =>
            item.visible,
    );


    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close admin navigation"
                    onClick={
                        onClose
                    }
                    className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
                />
            )}


            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#06154A] text-white transition-transform duration-300 lg:translate-x-0 ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
                    <div>
                        <p className="text-2xl font-black tracking-tight">
                            GenLeaders
                        </p>


                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                            Administration
                        </p>
                    </div>


                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={
                            onClose
                        }
                        className="rounded-lg p-2 transition hover:bg-white/10 lg:hidden"
                    >
                        <X
                            size={
                                20
                            }
                            aria-hidden="true"
                        />
                    </button>
                </div>


                <nav className="flex-1 space-y-2 px-4 py-6">
                    {navigation.map(
                        (
                            item,
                        ) => {
                            const Icon =
                                item.icon;


                            return (
                                <NavLink
                                    key={
                                        item.href
                                    }
                                    to={
                                        item.href
                                    }
                                    end={
                                        item.end
                                    }
                                    onClick={
                                        onClose
                                    }
                                    className={({
                                        isActive,
                                    }) =>
                                        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive
                                            ? "bg-white text-[#06154A]"
                                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                                        }`
                                    }
                                >
                                    <Icon
                                        size={
                                            19
                                        }
                                        aria-hidden="true"
                                    />


                                    {
                                        item.label
                                    }
                                </NavLink>
                            );
                        },
                    )}
                </nav>


                <div className="border-t border-white/10 px-6 py-5">
                    <p className="text-xs leading-5 text-slate-400">
                        Signed in as
                    </p>


                    <p className="mt-1 text-sm font-semibold capitalize text-white">
                        {role ??
                            "Unknown role"}
                    </p>


                    <p className="mt-3 text-xs leading-5 text-slate-400">
                        GenLeaders Content Platform
                    </p>
                </div>
            </aside>
        </>
    );
}