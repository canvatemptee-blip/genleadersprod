import {
    LogOut,
    Menu,
    UserRound,
} from "lucide-react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    ROUTES,
} from "@/config/routes";

import {
    authToken,
} from "@/shared/services/authToken";


interface AdminHeaderProps {
    onOpenNavigation: () => void;
}


function getPageTitle(
    pathname: string,
) {
    if (
        pathname.startsWith(
            ROUTES.ADMIN_ARTICLES,
        )
    ) {
        return "Articles";
    }


    if (
        pathname.startsWith(
            ROUTES.ADMIN_CATEGORIES,
        )
    ) {
        return "Categories";
    }


    if (
        pathname.startsWith(
            ROUTES.ADMIN_NEWSLETTER,
        )
    ) {
        return "Newsletter";
    }


    if (
        pathname.startsWith(
            ROUTES.ADMIN_STAFF,
        )
    ) {
        return "Staff Management";
    }


    return "Dashboard";
}


function getRoleLabel(
    role:
        | "admin"
        | "manager"
        | "intern"
        | null,
) {
    switch (role) {
        case "admin":
            return "Administrator";

        case "manager":
            return "Manager";

        case "intern":
            return "Intern";

        default:
            return "Staff Member";
    }
}


export default function AdminHeader({
    onOpenNavigation,
}: AdminHeaderProps) {
    const location =
        useLocation();


    const navigate =
        useNavigate();


    const payload =
        authToken.getPayload();


    const role =
        authToken.getRole();


    const handleLogout =
        () => {
            authToken.remove();


            navigate(
                ROUTES.ADMIN_LOGIN,
                {
                    replace:
                        true,
                },
            );
        };


    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl sm:px-8">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    aria-label="Open admin navigation"
                    onClick={
                        onOpenNavigation
                    }
                    className="rounded-xl border border-slate-200 p-2.5 text-slate-700 transition hover:bg-slate-100 lg:hidden"
                >
                    <Menu
                        size={
                            21
                        }
                        aria-hidden="true"
                    />
                </button>


                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                        GenLeaders Workspace
                    </p>


                    <h1 className="mt-1 text-xl font-bold text-[#06154A]">
                        {getPageTitle(
                            location.pathname,
                        )}
                    </h1>
                </div>
            </div>


            <div className="flex items-center gap-3">
                <div className="hidden items-center gap-3 rounded-xl border border-slate-200 px-4 py-2 sm:flex">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[#06154A]">
                        <UserRound
                            size={
                                18
                            }
                            aria-hidden="true"
                        />
                    </div>


                    <div className="max-w-48">
                        <p className="truncate text-sm font-semibold text-slate-800">
                            {getRoleLabel(
                                role,
                            )}
                        </p>


                        <p className="truncate text-xs text-slate-500">
                            {payload?.email ??
                                "Staff session"}
                        </p>
                    </div>
                </div>


                <button
                    type="button"
                    onClick={
                        handleLogout
                    }
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                    <LogOut
                        size={
                            17
                        }
                        aria-hidden="true"
                    />


                    <span className="hidden sm:inline">
                        Logout
                    </span>
                </button>
            </div>
        </header>
    );
}