import {
    ArrowRight,
    Mail,
} from "lucide-react";

import {
    useState,
    type FormEvent,
} from "react";

import {
    useSubscribeNewsletter,
} from "@/shared/hooks/useNewsLetter";


export default function NewsletterSection() {
    const [
        email,
        setEmail,
    ] =
        useState(
            "",
        );


    const {
        mutate:
        subscribe,

        isPending,

        isSuccess,

        error,

        reset,
    } =
        useSubscribeNewsletter();


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


        subscribe(
            {
                email:
                    normalizedEmail,
            },
            {
                onSuccess:
                    () => {
                        setEmail(
                            "",
                        );
                    },
            },
        );
    };


    const handleEmailChange = (
        value:
            string,
    ) => {
        if (
            isSuccess ||
            error
        ) {
            reset();
        }


        setEmail(
            value,
        );
    };


    return (
        <section
            id="newsletter"
            className="scroll-mt-24 bg-slate-50 py-28"
        >
            <div className="mx-auto max-w-5xl px-6">
                <div className="overflow-hidden rounded-[2rem] bg-[#06154A] p-12 text-center text-white shadow-2xl lg:p-20">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                        <Mail
                            size={36}
                            aria-hidden="true"
                        />
                    </div>


                    <h2 className="mt-8 text-5xl font-bold">
                        Stay Ahead of the Curve
                    </h2>


                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                        Receive leadership insights,
                        exclusive interviews, AI trends,
                        business strategies and the latest
                        GenLeaders content directly in your
                        inbox.
                    </p>


                    {isSuccess ? (
                        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-white/10 bg-white/10 px-8 py-7">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                                <Mail
                                    size={26}
                                    aria-hidden="true"
                                />
                            </div>


                            <p className="mt-5 text-xl font-semibold">
                                Check your inbox
                            </p>


                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                We've sent you a verification
                                email. Confirm your email
                                address to complete your
                                GenLeaders newsletter
                                subscription.
                            </p>


                            <p className="mt-3 text-xs leading-5 text-slate-400">
                                You won't receive newsletter
                                emails until your address has
                                been verified.
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="mx-auto mt-12 max-w-2xl"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <label
                                    htmlFor="newsletter-email"
                                    className="sr-only"
                                >
                                    Email address
                                </label>


                                <input
                                    id="newsletter-email"
                                    type="email"
                                    value={
                                        email
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        handleEmailChange(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Enter your email address"
                                    autoComplete="email"
                                    required
                                    disabled={
                                        isPending
                                    }
                                    className="flex-1 rounded-full border border-white/10 bg-white px-6 py-4 text-slate-900 outline-none transition focus:ring-4 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
                                />


                                <button
                                    type="submit"
                                    disabled={
                                        isPending ||
                                        !email.trim()
                                    }
                                    className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:gap-3 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:gap-2"
                                >
                                    {
                                        isPending
                                            ? "Sending..."
                                            : "Subscribe"
                                    }


                                    {!isPending && (
                                        <ArrowRight
                                            size={18}
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            </div>


                            {error && (
                                <p
                                    role="alert"
                                    className="mt-4 text-sm text-red-300"
                                >
                                    {
                                        error.message
                                    }
                                </p>
                            )}
                        </form>
                    )}


                    <p className="mt-6 text-sm text-slate-400">
                        No spam. Verify before subscribing.
                        Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}