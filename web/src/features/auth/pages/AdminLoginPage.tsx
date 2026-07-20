import {
    type FormEvent,
    useState,
} from "react";

import {
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    ArrowRight,
    LockKeyhole,
    Mail,
    ShieldCheck,
} from "lucide-react";

import { ROUTES } from "@/config/routes";

import { useLogin } from "@/shared/hooks/useAuth";
import { authToken } from "@/shared/services/authToken";

interface LoginLocationState {
    from?: string;
}

export default function AdminLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const {
        mutate: login,
        isPending,
        error,
    } = useLogin();

    if (authToken.isValid()) {
        return (
            <Navigate
                to={ROUTES.ADMIN}
                replace
            />
        );
    }

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        login(
            {
                email: email.trim(),
                password,
            },
            {
                onSuccess: () => {
                    const state =
                        location.state as
                        | LoginLocationState
                        | null;

                    navigate(
                        state?.from ??
                        ROUTES.ADMIN,
                        {
                            replace: true,
                        },
                    );
                },
            },
        );
    };

    return (
        <main className="flex min-h-screen bg-slate-50">
            <section className="hidden w-1/2 bg-[#06154A] p-16 text-white lg:flex lg:flex-col lg:justify-between">
                <div>
                    <p className="text-3xl font-black tracking-tight">
                        GenLeaders
                    </p>
                </div>

                <div className="max-w-xl">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                        <ShieldCheck
                            size={32}
                            aria-hidden="true"
                        />
                    </div>

                    <h1 className="mt-8 text-5xl font-bold leading-tight">
                        Manage ideas that shape
                        the next generation.
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-slate-300">
                        Publish articles, organize
                        categories and manage the
                        GenLeaders content platform
                        from one workspace.
                    </p>
                </div>

                <p className="text-sm text-slate-400">
                    GenLeaders Administration
                </p>
            </section>

            <section className="flex flex-1 items-center justify-center px-6 py-16">
                <div className="w-full max-w-md">
                    <div className="lg:hidden">
                        <p className="text-3xl font-black tracking-tight text-[#06154A]">
                            GenLeaders
                        </p>
                    </div>

                    <div className="mt-10 lg:mt-0">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                            Admin Access
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-[#06154A]">
                            Welcome back
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Sign in with your administrator
                            credentials to continue.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-10 space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="admin-email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    aria-hidden="true"
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="admin-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value,
                                        )
                                    }
                                    autoComplete="email"
                                    required
                                    disabled={isPending}
                                    placeholder="admin@genleaders.com"
                                    className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="admin-password"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={18}
                                    aria-hidden="true"
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="admin-password"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value,
                                        )
                                    }
                                    autoComplete="current-password"
                                    required
                                    minLength={8}
                                    disabled={isPending}
                                    placeholder="Enter your password"
                                    className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
                                />
                            </div>
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700"
                            >
                                {error.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={
                                isPending ||
                                !email.trim() ||
                                password.length < 8
                            }
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#06154A] px-6 py-4 font-semibold text-white transition hover:bg-[#0a206c] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending
                                ? "Signing in..."
                                : "Sign in"}

                            {!isPending && (
                                <ArrowRight
                                    size={18}
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}