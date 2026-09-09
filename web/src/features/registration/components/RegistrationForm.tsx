import {
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

import {
    useState,
    type FormEvent,
} from "react";

import {
    useSubmitRegistration,
} from "@/shared/hooks/useRegistrations";

import {
    LOOKING_FOR_LABELS,
    LOOKING_FOR_VALUES,
    SEARCHING_AS_LABELS,
    SEARCHING_AS_VALUES,
} from "@/types/registration";

import type {
    LookingFor,
    RegistrationPayload,
    SearchingAs,
} from "@/types/registration";

import {
    REGISTRATION_FIELD_ORDER,
    validateRegistration,
} from "../registration.schema";

import type {
    RegistrationErrors,
    RegistrationField,
} from "../registration.schema";


const EMPTY_VALUES:
    RegistrationPayload = {
    fullName:
        "",

    contactNumber:
        "",

    email:
        "",

    searchingAs:
        "",

    lookingFor:
        "",

    bestTimeToReach:
        "",
};


const inputClassName =
    "w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70";


function fieldClassName(
    hasError: boolean,
) {
    return [
        inputClassName,

        hasError
            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-blue-500 focus:ring-blue-100",
    ].join(
        " ",
    );
}


interface TextFieldProps {
    id: RegistrationField;

    label: string;

    hint?: string;

    type?: "text" | "tel" | "email";

    autoComplete?: string;

    placeholder?: string;

    value: string;

    error?: string;

    disabled: boolean;

    onChange: (
        value: string,
    ) => void;
}


function TextField({
    id,
    label,
    hint,
    type = "text",
    autoComplete,
    placeholder,
    value,
    error,
    disabled,
    onChange,
}: TextFieldProps) {
    const errorId =
        `${id}-error`;


    const hintId =
        `${id}-hint`;


    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-semibold text-slate-800"
            >
                {label}

                <span
                    aria-hidden="true"
                    className="ml-1 text-red-600"
                >
                    *
                </span>
            </label>


            {hint && (
                <p
                    id={hintId}
                    className="mt-1 text-sm text-slate-500"
                >
                    {hint}
                </p>
            )}


            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={(
                    event,
                ) =>
                    onChange(
                        event.target.value,
                    )
                }
                placeholder={
                    placeholder
                }
                autoComplete={
                    autoComplete
                }
                disabled={
                    disabled
                }
                required
                aria-required="true"
                aria-invalid={
                    error
                        ? true
                        : undefined
                }
                aria-describedby={
                    [
                        hint
                            ? hintId
                            : null,

                        error
                            ? errorId
                            : null,
                    ]
                        .filter(
                            Boolean,
                        )
                        .join(
                            " ",
                        ) || undefined
                }
                className={`mt-2 ${fieldClassName(
                    Boolean(
                        error,
                    ),
                )}`}
            />


            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-2 text-sm font-medium text-red-600"
                >
                    {error}
                </p>
            )}
        </div>
    );
}


interface ChoiceFieldProps {
    id: RegistrationField;

    label: string;

    options: readonly {
        value: string;

        label: string;
    }[];

    columns?: 1 | 2;

    value: string;

    error?: string;

    disabled: boolean;

    onChange: (
        value: string,
    ) => void;
}


function ChoiceField({
    id,
    label,
    options,
    columns = 1,
    value,
    error,
    disabled,
    onChange,
}: ChoiceFieldProps) {
    const errorId =
        `${id}-error`;


    return (
        <fieldset
            aria-invalid={
                error
                    ? true
                    : undefined
            }
            aria-describedby={
                error
                    ? errorId
                    : undefined
            }
        >
            <legend className="text-sm font-semibold text-slate-800">
                {label}

                <span
                    aria-hidden="true"
                    className="ml-1 text-red-600"
                >
                    *
                </span>
            </legend>


            <div
                className={`mt-3 grid gap-3 ${columns === 2
                    ? "sm:grid-cols-2"
                    : ""
                    }`}
            >
                {options.map(
                    (
                        option,
                    ) => {
                        const isSelected =
                            value ===
                            option.value;


                        return (
                            <label
                                key={
                                    option.value
                                }
                                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition focus-within:ring-4 focus-within:ring-blue-100 ${isSelected
                                    ? "border-[#06154A] bg-slate-50"
                                    : "border-slate-300 bg-white hover:border-[#06154A]"
                                    } ${disabled
                                        ? "cursor-not-allowed opacity-70"
                                        : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name={id}
                                    value={
                                        option.value
                                    }
                                    checked={
                                        isSelected
                                    }
                                    disabled={
                                        disabled
                                    }
                                    onChange={() =>
                                        onChange(
                                            option.value,
                                        )
                                    }
                                    className="mt-1 h-4 w-4 shrink-0 accent-[#06154A]"
                                />


                                <span className="text-sm leading-6 text-slate-700">
                                    {
                                        option.label
                                    }
                                </span>
                            </label>
                        );
                    },
                )}
            </div>


            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-2 text-sm font-medium text-red-600"
                >
                    {error}
                </p>
            )}
        </fieldset>
    );
}


const searchingAsOptions =
    SEARCHING_AS_VALUES.map(
        (
            value,
        ) => ({
            value,

            label:
                SEARCHING_AS_LABELS[
                value
                ],
        }),
    );


const lookingForOptions =
    LOOKING_FOR_VALUES.map(
        (
            value,
        ) => ({
            value,

            label:
                LOOKING_FOR_LABELS[
                value
                ],
        }),
    );


export default function RegistrationForm() {
    const [
        values,
        setValues,
    ] =
        useState<
            RegistrationPayload
        >(
            EMPTY_VALUES,
        );


    const [
        errors,
        setErrors,
    ] =
        useState<
            RegistrationErrors
        >(
            {},
        );


    const {
        mutate:
        submitRegistration,

        isPending,

        isSuccess,

        error:
        submitError,

        reset,
    } =
        useSubmitRegistration();


    const updateField = (
        field:
            RegistrationField,
    ) => (
        value: string,
    ) => {
            setValues(
                (
                    current,
                ) => ({
                    ...current,

                    [field]:
                        value,
                }),
            );


            setErrors(
                (
                    current,
                ) => {
                    if (
                        !current[
                        field
                        ]
                    ) {
                        return current;
                    }


                    const next = {
                        ...current,
                    };


                    delete next[
                        field
                    ];


                    return next;
                },
            );


            if (submitError) {
                reset();
            }
        };


    const handleSubmit = (
        event:
            FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();


        // Guards against a double click submitting twice.
        if (
            isPending ||
            isSuccess
        ) {
            return;
        }


        const validationErrors =
            validateRegistration(
                values,
            );


        setErrors(
            validationErrors,
        );


        const firstInvalidField =
            REGISTRATION_FIELD_ORDER.find(
                (
                    field,
                ) =>
                    validationErrors[
                    field
                    ],
            );


        if (firstInvalidField) {
            document
                .getElementsByName(
                    firstInvalidField,
                )[0]
                ?.focus();


            return;
        }


        submitRegistration({
            fullName:
                values.fullName
                    .trim(),

            contactNumber:
                values.contactNumber
                    .trim(),

            email:
                values.email
                    .trim()
                    .toLowerCase(),

            searchingAs:
                values.searchingAs as
                SearchingAs,

            lookingFor:
                values.lookingFor as
                LookingFor,

            bestTimeToReach:
                values.bestTimeToReach
                    .trim(),
        });
    };


    const handleSubmitAnother =
        () => {
            setValues(
                EMPTY_VALUES,
            );


            setErrors(
                {},
            );


            reset();
        };


    /**
     * The success panel only renders once the API has
     * confirmed the registration was persisted.
     */
    if (isSuccess) {
        return (
            <div
                role="status"
                className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl lg:p-14"
            >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <CheckCircle2
                        size={32}
                        aria-hidden="true"
                    />
                </div>


                <h2 className="mt-6 text-3xl font-bold text-[#06154A]">
                    Registration received
                </h2>


                <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
                    Thank you for sharing your details with
                    GenLeaders. Our team will review your
                    submission and reach out using the contact
                    information you provided.
                </p>


                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                    A confirmation email is on its way to{" "}

                    <span className="font-medium break-all text-slate-700">
                        {
                            values.email
                                .trim()
                                .toLowerCase()
                        }
                    </span>

                    .
                </p>


                <button
                    type="button"
                    onClick={
                        handleSubmitAnother
                    }
                    className="mt-8 rounded-full border border-[#06154A] px-6 py-3 font-semibold text-[#06154A] transition hover:bg-[#06154A] hover:text-white"
                >
                    Submit another response
                </button>
            </div>
        );
    }


    return (
        <form
            onSubmit={
                handleSubmit
            }
            noValidate
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-8 lg:p-12"
        >
            <p className="text-sm text-slate-500">
                <span
                    aria-hidden="true"
                    className="text-red-600"
                >
                    *
                </span>

                {" "}Indicates a required question.
            </p>


            <div className="mt-8 space-y-8">
                <TextField
                    id="fullName"
                    label="Full Name"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={
                        values.fullName
                    }
                    error={
                        errors.fullName
                    }
                    disabled={
                        isPending
                    }
                    onChange={updateField(
                        "fullName",
                    )}
                />


                <TextField
                    id="contactNumber"
                    label="Contact No. (WhatsApp)"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 90000 00000"
                    value={
                        values.contactNumber
                    }
                    error={
                        errors.contactNumber
                    }
                    disabled={
                        isPending
                    }
                    onChange={updateField(
                        "contactNumber",
                    )}
                />


                <ChoiceField
                    id="searchingAs"
                    label="Searching for as"
                    options={
                        searchingAsOptions
                    }
                    columns={2}
                    value={
                        values.searchingAs
                    }
                    error={
                        errors.searchingAs
                    }
                    disabled={
                        isPending
                    }
                    onChange={updateField(
                        "searchingAs",
                    )}
                />


                <ChoiceField
                    id="lookingFor"
                    label="Looking For (If Specific please choose Callback)"
                    options={
                        lookingForOptions
                    }
                    value={
                        values.lookingFor
                    }
                    error={
                        errors.lookingFor
                    }
                    disabled={
                        isPending
                    }
                    onChange={updateField(
                        "lookingFor",
                    )}
                />


                <TextField
                    id="bestTimeToReach"
                    label="Best time to reach you"
                    placeholder="For example, weekdays after 6pm"
                    value={
                        values.bestTimeToReach
                    }
                    error={
                        errors.bestTimeToReach
                    }
                    disabled={
                        isPending
                    }
                    onChange={updateField(
                        "bestTimeToReach",
                    )}
                />


                <TextField
                    id="email"
                    label="Email Id"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={
                        values.email
                    }
                    error={
                        errors.email
                    }
                    disabled={
                        isPending
                    }
                    onChange={updateField(
                        "email",
                    )}
                />
            </div>


            {submitError && (
                <div
                    role="alert"
                    className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700"
                >
                    {
                        submitError.message
                    }
                </div>
            )}


            <button
                type="submit"
                disabled={
                    isPending
                }
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#06154A] px-8 py-4 font-semibold text-white transition-all duration-300 hover:gap-3 hover:bg-[#0B236E] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:gap-2"
            >
                {
                    isPending
                        ? "Submitting..."
                        : "Submit Registration"
                }


                {!isPending && (
                    <ArrowRight
                        size={18}
                        aria-hidden="true"
                    />
                )}
            </button>
        </form>
    );
}
