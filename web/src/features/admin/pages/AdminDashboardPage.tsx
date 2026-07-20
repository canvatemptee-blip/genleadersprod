import {
    ArrowRight,
    FileText,
    FolderOpen,
    Mail,
    UsersRound,
} from "lucide-react";

import {
    Link,
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


export default function AdminDashboardPage() {
    const role =
        authToken.getRole();


    const managementAreas = [
        {
            title:
                "Articles",

            description:
                role === "intern"
                    ? "Create, edit, publish, schedule and manage GenLeaders articles."
                    : "Create, edit, publish, schedule, archive and manage GenLeaders articles.",

            href:
                ROUTES.ADMIN_ARTICLES,

            icon:
                FileText,

            visible:
                true,
        },

        {
            title:
                "Categories",

            description:
                "Organize the content taxonomy used across the publication.",

            href:
                ROUTES.ADMIN_CATEGORIES,

            icon:
                FolderOpen,

            visible:
                canManageCategories(
                    role,
                ),
        },

        {
            title:
                "Newsletter",

            description:
                "View and manage newsletter subscribers.",

            href:
                ROUTES.ADMIN_NEWSLETTER,

            icon:
                Mail,

            visible:
                canManageNewsletter(
                    role,
                ),
        },

        {
            title:
                "Staff",

            description:
                "Create staff accounts, assign roles and control platform access.",

            href:
                ROUTES.ADMIN_STAFF,

            icon:
                UsersRound,

            visible:
                canManageStaff(
                    role,
                ),
        },
    ].filter(
        (area) =>
            area.visible,
    );


    const roleDescription =
        role === "intern"
            ? "Create, edit, publish and schedule stories for the GenLeaders platform."
            : role === "manager"
                ? "Manage stories, categories and the GenLeaders audience."
                : "Manage the content, team and audience behind the GenLeaders platform.";


    return (
        <div className="mx-auto max-w-7xl">
            <section className="overflow-hidden rounded-3xl bg-[#06154A] px-8 py-10 text-white sm:px-12 sm:py-14">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                    GenLeaders{" "}

                    <span className="capitalize">
                        {role}
                    </span>
                </p>


                <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                    Your content command center.
                </h2>


                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                    {
                        roleDescription
                    }
                </p>
            </section>


            <section className="mt-10">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                        Management
                    </p>


                    <h2 className="mt-2 text-3xl font-bold text-[#06154A]">
                        Your workspace
                    </h2>
                </div>


                <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {managementAreas.map(
                        (
                            area,
                        ) => {
                            const Icon =
                                area.icon;


                            return (
                                <Link
                                    key={
                                        area.href
                                    }
                                    to={
                                        area.href
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#06154A] transition group-hover:bg-[#06154A] group-hover:text-white">
                                        <Icon
                                            size={
                                                25
                                            }
                                            aria-hidden="true"
                                        />
                                    </div>


                                    <h3 className="mt-6 text-2xl font-bold text-[#06154A]">
                                        {
                                            area.title
                                        }
                                    </h3>


                                    <p className="mt-3 min-h-18 leading-7 text-slate-600">
                                        {
                                            area.description
                                        }
                                    </p>


                                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-700">
                                        Open workspace


                                        <ArrowRight
                                            size={
                                                17
                                            }
                                            aria-hidden="true"
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </div>
                                </Link>
                            );
                        },
                    )}
                </div>
            </section>
        </div>
    );
}