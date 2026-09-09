import type {
    RegistrationPayload,
} from "@/types/registration";


/**
 * Mirrors createRegistrationSchema on the server.
 *
 * The server remains the authoritative validator; this only
 * exists so the visitor gets immediate field level feedback.
 */
const CONTACT_NUMBER_PATTERN =
    /^[+()\d\s-]+$/;


const EMAIL_PATTERN =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export type RegistrationField =
    keyof RegistrationPayload;


export type RegistrationErrors =
    Partial<
        Record<
            RegistrationField,
            string
        >
    >;


export const REGISTRATION_FIELD_ORDER:
    readonly RegistrationField[] = [
        "fullName",
        "contactNumber",
        "searchingAs",
        "lookingFor",
        "bestTimeToReach",
        "email",
    ];


export function validateRegistration(
    values:
        RegistrationPayload,
): RegistrationErrors {
    const errors:
        RegistrationErrors = {};


    const fullName =
        values.fullName
            .trim();


    if (!fullName) {
        errors.fullName =
            "Please enter your full name.";
    } else if (
        fullName.length < 2
    ) {
        errors.fullName =
            "Your full name must be at least 2 characters.";
    } else if (
        fullName.length > 150
    ) {
        errors.fullName =
            "Your full name cannot exceed 150 characters.";
    }


    const contactNumber =
        values.contactNumber
            .trim();


    if (!contactNumber) {
        errors.contactNumber =
            "Please enter your WhatsApp contact number.";
    } else if (
        contactNumber.length < 7 ||
        contactNumber.length > 30
    ) {
        errors.contactNumber =
            "Please enter a contact number between 7 and 30 characters.";
    } else if (
        !CONTACT_NUMBER_PATTERN.test(
            contactNumber,
        )
    ) {
        errors.contactNumber =
            "Use digits and the characters + ( ) - only.";
    }


    if (
        !values.searchingAs
    ) {
        errors.searchingAs =
            "Please choose an option.";
    }


    if (
        !values.lookingFor
    ) {
        errors.lookingFor =
            "Please choose what you are looking for.";
    }


    const bestTimeToReach =
        values.bestTimeToReach
            .trim();


    if (!bestTimeToReach) {
        errors.bestTimeToReach =
            "Please tell us the best time to reach you.";
    } else if (
        bestTimeToReach.length < 2
    ) {
        errors.bestTimeToReach =
            "Please provide a little more detail.";
    } else if (
        bestTimeToReach.length > 120
    ) {
        errors.bestTimeToReach =
            "This cannot exceed 120 characters.";
    }


    const email =
        values.email
            .trim();


    if (!email) {
        errors.email =
            "Please enter your email address.";
    } else if (
        email.length > 255
    ) {
        errors.email =
            "Your email address cannot exceed 255 characters.";
    } else if (
        !EMAIL_PATTERN.test(
            email,
        )
    ) {
        errors.email =
            "Please enter a valid email address.";
    }


    return errors;
}
