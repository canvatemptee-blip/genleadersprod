export const SEARCHING_AS_VALUES = [
    "individual",
    "business",
] as const;


export const LOOKING_FOR_VALUES = [
    "showcase_new_role",
    "announce_the_moment",
    "linkedin_management",
    "linkedin_makeover",
    "company_branding",
    "request_callback",
] as const;


export const REGISTRATION_STATUS_VALUES = [
    "new",
    "contacted",
    "closed",
] as const;


export type SearchingAs =
    typeof SEARCHING_AS_VALUES[number];


export type LookingFor =
    typeof LOOKING_FOR_VALUES[number];


export type RegistrationStatus =
    typeof REGISTRATION_STATUS_VALUES[number];


/**
 * Display labels sourced from the original
 * "Gen Leaders Registration Form" Google Form.
 *
 * Stored values are stable snake_case codes, so this
 * wording can change without a data migration.
 */
export const SEARCHING_AS_LABELS:
    Record<
        SearchingAs,
        string
    > = {
    individual:
        "Individual",

    business:
        "Business",
};


export const LOOKING_FOR_LABELS:
    Record<
        LookingFor,
        string
    > = {
    showcase_new_role:
        "Showcase Your New Role",

    announce_the_moment:
        "Marking the Journey. Announce the Moment.",

    linkedin_management:
        "LinkedIn Management",

    linkedin_makeover:
        "LinkedIn Makeover",

    company_branding:
        "Company Branding (Only For Business/Company)",

    request_callback:
        "Request a Callback",
};


export const REGISTRATION_STATUS_LABELS:
    Record<
        RegistrationStatus,
        string
    > = {
    new:
        "New",

    contacted:
        "Contacted",

    closed:
        "Closed",
};


export interface Registration {
    id: number;

    full_name: string;

    contact_number: string;

    email: string;

    searching_as: SearchingAs;

    looking_for: LookingFor;

    best_time_to_reach: string;

    status: RegistrationStatus;

    created_at: string;

    updated_at: string;
}


export interface RegistrationPayload {
    fullName: string;

    contactNumber: string;

    email: string;

    searchingAs:
    SearchingAs | "";

    lookingFor:
    LookingFor | "";

    bestTimeToReach: string;
}


export interface UpdateRegistrationStatusPayload {
    id: number;

    status:
    RegistrationStatus;
}
