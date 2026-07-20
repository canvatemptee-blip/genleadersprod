import {
    AlertCircle,
    CheckCircle2,
    LoaderCircle,
    LogOut,
    Mail,
    Send,
} from "lucide-react";

import {
    type FormEvent,
    useState,
} from "react";

import {
    Link,
    useSearchParams,
} from "react-router-dom";

import {
    ROUTES,
} from "@/config/routes";

import {
    useRequestNewsletterUnsubscribe,
    useUnsubscribeNewsletter,
} from "@/shared/hooks/useNewsLetter";


export default function NewsletterUnsubscribePage() {
    const [
        searchParams,
    ] =
        useSearchParams();


    const token =
        searchParams.get(
            "token",
        );


    if (
        token
    ) {
        return (
            <ConfirmUnsubscribeView
                token={
                    token
                }
            />
        );
    }


    return (
        <RequestUnsubscribeView />
    );
}


function RequestUnsubscribeView() {
    const [
        email,
        setEmail,
    ] =
        useState(
            "",
        );


    const {
        mutate:
        requestUnsubscribe,

        isPending,

        isSuccess,

        error,
    } =
        useRequestNewsletterUnsubscribe();


    const handleSubmit = (
        event:
            FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();


        const normalizedEmail =
            email
                .trim()
                .toLowerCase();


        if (
            !normalizedEmail
        ) {
            return;
        }


        requestUnsubscribe({
            email:
                normalizedEmail,
        });
    };


    if (
        isSuccess
    ) {
        return (
            <PageShell>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Mail
                        size={30}
                        aria-hidden="true"
                    />
                </div>


                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Check Your Inbox
                </p>


                <h1 className="mt-3 text-3xl font-bold text-[#06154A]">
                    Check your email
                </h1>


                <p className="mt-4 leading-7 text-slate-600">
                    If this email is subscribed and
                    verified, we've sent an unsubscribe
                    confirmation link.
                </p>


                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Your subscription remains active until
                    the unsubscribe request is confirmed.
                </p>


                <Link
                    to={
                        ROUTES.HOME
                    }
                    className="mt-8 inline-flex rounded-xl bg-[#06154A] px-6 py-3 font-semibold text-white transition hover:bg-[#0a206c]"
                >
                    Return Home
                </Link>
            </PageShell>
        );
    }


    return (
        <PageShell>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-[#06154A]">
                <LogOut
                    size={30}
                    aria-hidden="true"
                />
            </div>


            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Newsletter Preferences
            </p>


            <h1 className="mt-3 text-3xl font-bold text-[#06154A]">
                Unsubscribe from GenLeaders
            </h1>


            <p className="mt-4 leading-7 text-slate-600">
                Enter your email address and we'll send a
                secure confirmation link if the address has
                an active subscription.
            </p>


            <form
                onSubmit={
                    handleSubmit
                }
                className="mt-8"
            >
                <label
                    htmlFor="unsubscribe-email"
                    className="block text-left text-sm font-semibold text-slate-700"
                >
                    Email address
                </label>


                <input
                    id="unsubscribe-email"
                    type="email"
                    value={
                        email
                    }
                    onChange={(
                        event,
                    ) => {
                        setEmail(
                            event.target.value,
                        );
                    }}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />


                {error && (
                    <div
                        role="alert"
                        className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-left"
                    >
                        <div className="flex items-start gap-3">
                            <AlertCircle
                                size={20}
                                aria-hidden="true"
                                className="mt-0.5 shrink-0 text-red-700"
                            />


                            <div>
                                <p className="font-semibold text-red-800">
                                    Request failed
                                </p>


                                <p className="mt-1 text-sm leading-6 text-red-700">
                                    {
                                        error.message
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}


                <button
                    type="submit"
                    disabled={
                        isPending
                    }
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#06154A] px-6 py-3 font-semibold text-white transition hover:bg-[#0a206c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? (
                        <>
                            <LoaderCircle
                                size={18}
                                aria-hidden="true"
                                className="animate-spin"
                            />

                            Sending...
                        </>
                    ) : (
                        <>
                            <Send
                                size={18}
                                aria-hidden="true"
                            />

                            Send Unsubscribe Link
                        </>
                    )}
                </button>
            </form>


            <Link
                to={
                    ROUTES.HOME
                }
                className="mt-6 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-900"
            >
                Keep my subscription
            </Link>
        </PageShell>
    );
}


function ConfirmUnsubscribeView({
    token,
}: {
    token: string;
}) {
    const {
        mutate:
        unsubscribe,

        isPending,

        isSuccess,

        error,
    } =
        useUnsubscribeNewsletter();


    const handleConfirm =
        () => {
            unsubscribe({
                token,
            });
        };


    if (
        isSuccess
    ) {
        return (
            <PageShell>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <CheckCircle2
                        size={30}
                        aria-hidden="true"
                    />
                </div>


                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Preference Updated
                </p>


                <h1 className="mt-3 text-3xl font-bold text-[#06154A]">
                    You've been unsubscribed.
                </h1>


                <p className="mt-4 leading-7 text-slate-600">
                    Your email address has been removed from
                    the GenLeaders newsletter.
                </p>


                <Link
                    to={
                        ROUTES.HOME
                    }
                    className="mt-8 inline-flex rounded-xl bg-[#06154A] px-6 py-3 font-semibold text-white transition hover:bg-[#0a206c]"
                >
                    Return Home
                </Link>
            </PageShell>
        );
    }


    return (
        <PageShell>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <LogOut
                    size={30}
                    aria-hidden="true"
                />
            </div>


            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Confirmation Required
            </p>


            <h1 className="mt-3 text-3xl font-bold text-[#06154A]">
                Confirm unsubscribe
            </h1>


            <p className="mt-4 leading-7 text-slate-600">
                Confirm below to stop receiving GenLeaders
                newsletter emails.
            </p>


            {error && (
                <div
                    role="alert"
                    className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-left"
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle
                            size={20}
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-red-700"
                        />


                        <div>
                            <p className="font-semibold text-red-800">
                                Unable to unsubscribe
                            </p>


                            <p className="mt-1 text-sm leading-6 text-red-700">
                                {
                                    error.message
                                }
                            </p>


                            <Link
                                to={
                                    ROUTES.NEWSLETTER_UNSUBSCRIBE
                                }
                                className="mt-3 inline-flex text-sm font-semibold text-red-800 underline"
                            >
                                Request a new link
                            </Link>
                        </div>
                    </div>
                </div>
            )}


            <button
                type="button"
                onClick={
                    handleConfirm
                }
                disabled={
                    isPending
                }
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#06154A] px-6 py-3 font-semibold text-white transition hover:bg-[#0a206c] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? (
                    <>
                        <LoaderCircle
                            size={18}
                            aria-hidden="true"
                            className="animate-spin"
                        />

                        Unsubscribing...
                    </>
                ) : (
                    <>
                        <LogOut
                            size={18}
                            aria-hidden="true"
                        />

                        Confirm Unsubscribe
                    </>
                )}
            </button>


            <div className="mt-5">
                <Link
                    to={
                        ROUTES.HOME
                    }
                    className="text-sm font-semibold text-blue-700 transition hover:text-blue-900"
                >
                    Cancel and return home
                </Link>
            </div>
        </PageShell>
    );
}


function PageShell({
    children,
}: {
    children:
    React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
            <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                {
                    children
                }
            </section>
        </main>
    );
}