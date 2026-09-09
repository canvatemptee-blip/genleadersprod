import {
    db,
} from "../../src/config/database.js";

import type {
    LookingFor,
    Registration,
    RegistrationStatus,
    SearchingAs,
} from "../../src/modules/registration/registration.types.js";


export interface RegistrationFixtureOptions {
    fullName?:
    string;

    contactNumber?:
    string;

    email?:
    string;

    searchingAs?:
    SearchingAs;

    lookingFor?:
    LookingFor;

    bestTimeToReach?:
    string;

    status?:
    RegistrationStatus;
}


let fixtureCounter =
    0;


export function resetRegistrationFixtureCounter() {
    fixtureCounter =
        0;
}


export async function createRegistrationFixture(
    options:
        RegistrationFixtureOptions = {},
): Promise<Registration> {
    fixtureCounter += 1;


    const result =
        await db.query<
            Registration
        >(
            `
            INSERT INTO registrations (
                full_name,
                contact_number,
                email,
                searching_as,
                looking_for,
                best_time_to_reach,
                status
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
            )
            RETURNING *
            `,
            [
                options.fullName ??
                `Registration Fixture ${fixtureCounter}`,

                options.contactNumber ??
                "+91 9559760854",

                options.email ??
                `registration.fixture.${fixtureCounter}@example.com`,

                options.searchingAs ??
                "individual",

                options.lookingFor ??
                "linkedin_management",

                options.bestTimeToReach ??
                "Weekday evenings",

                options.status ??
                "new",
            ],
        );


    return result.rows[0]!;
}
