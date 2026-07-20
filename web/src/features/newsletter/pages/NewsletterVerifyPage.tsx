import {
    AlertCircle,
    CheckCircle2,
    LoaderCircle,
    MailCheck,
} from "lucide-react";

import {
    Link,
    useSearchParams,
} from "react-router-dom";

import {
    ROUTES,
} from "@/config/routes";

import {
    useVerifyNewsletter,
} from "@/shared/hooks/useNewsLetter";


export default function NewsletterVerifyPage() {
    const [
        searchParams,
    ] =
        useSearchParams();


    const token =
        searchParams.get(
            "token",
        );


    const {
        mutate:
        verifyEmail,

        isPending,

        isSuccess,

        error,
    } =
        useVerifyNewsletter();


    const handleVerify =
        () => {
            if (
                !token
            ) {
                return;
            }


            verifyEmail({
                token,
            });
        };


    if (
        !token
    ) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
                <section className="w-full max-w-xl rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm sm:p-12">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                        <AlertCircle
                            size={30}
                            aria-hidden="true"
                        />
                    </div>


                    <h1 className="mt-6 text-3xl font-bold text-[#06154A]">
                        Invalid verification link
                    </h1>


                    <p className="mt-4 leading-7 text-slate-600">
                        This verification link does not
                        contain a valid token. Return to
                        GenLeaders and subscribe again.
                    </p>


                    <Link
                        to={
                            ROUTES.HOME
                        }
                        className="mt-8 inline-flex rounded-xl bg-[#06154A] px-6 py-3 font-semibold text-white transition hover:bg-[#0a206c]"
                    >
                        Return Home
                    </Link>
                </section>
            </main>
        );
    }


    if (
        isSuccess
    ) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
                <section className="w-full max-w-xl rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm sm:p-12">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                        <CheckCircle2
                            size={30}
                            aria-hidden="true"
                        />
                    </div>


                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        Subscription Confirmed
                    </p>


                    <h1 className="mt-3 text-3xl font-bold text-[#06154A]">
                        You're officially subscribed.
                    </h1>


                    <p className="mt-4 leading-7 text-slate-600">
                        Your email has been verified.
                        You'll now receive GenLeaders
                        stories and newsletter updates.
                    </p>


                    <Link
                        to={
                            ROUTES.HOME
                        }
                        className="mt-8 inline-flex rounded-xl bg-[#06154A] px-6 py-3 font-semibold text-white transition hover:bg-[#0a206c]"
                    >
                        Explore GenLeaders
                    </Link>
                </section>
            </main>
        );
    }


    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
            <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <MailCheck
                        size={30}
                        aria-hidden="true"
                    />
                </div>


                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                    One Last Step
                </p>


                <h1 className="mt-3 text-3xl font-bold text-[#06154A]">
                    Confirm your subscription
                </h1>


                <p className="mt-4 leading-7 text-slate-600">
                    Confirm that you want to receive
                    GenLeaders newsletter updates.
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
                                    Verification failed
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
                    type="button"
                    onClick={
                        handleVerify
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

                            Verifying...
                        </>
                    ) : (
                        <>
                            <MailCheck
                                size={18}
                                aria-hidden="true"
                            />

                            Verify Email
                        </>
                    )}
                </button>
            </section>
        </main>
    );
}