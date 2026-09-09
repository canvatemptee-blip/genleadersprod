import request
    from "supertest";

import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import app
    from "../src/app/app.js";

import {
    db,
} from "../src/config/database.js";

import {
    MailService,
} from "../src/shared/services/mail.service.js";

import type {
    AdminRole,
} from "../src/modules/admin/admin.types.js";

import {
    createAdminFixture,
} from "./helpers/adminFixtures.js";

import {
    loginAs,
} from "./helpers/authHelpers.js";

import {
    createRegistrationFixture,
} from "./helpers/registrationFixtures.js";


/**
 * express-rate-limit keeps its counters in a module level
 * memory store that survives database resets, so every
 * VALID public submission in this file shares one budget of
 * five requests per window. Invalid payloads are rejected by
 * the validate() middleware before the limiter runs and
 * therefore cost nothing.
 *
 * The rate limit test is intentionally the last block in
 * this file because it exhausts that budget.
 */
const VALID_PAYLOAD = {
    fullName:
        "Ada Lovelace",

    contactNumber:
        "+91 9559760854",

    email:
        "Ada.Lovelace@Example.com",

    searchingAs:
        "individual",

    lookingFor:
        "linkedin_makeover",

    bestTimeToReach:
        "Weekday evenings after 6pm",
} as const;


function bearer(
    token: string,
) {
    return {
        Authorization:
            `Bearer ${token}`,
    };
}


async function tokenFor(
    role: AdminRole,
): Promise<string> {
    const account =
        await createAdminFixture({
            role,
        });


    return loginAs({
        email:
            account.email,

        password:
            account.password,
    });
}


describe(
    "public registration submission",
    () => {
        let sendConfirmation:
            ReturnType<
                typeof vi.spyOn
            >;


        beforeEach(
            () => {
                sendConfirmation =
                    vi.spyOn(
                        MailService.prototype,
                        "sendRegistrationConfirmation",
                    )
                        .mockResolvedValue(
                            undefined,
                        );
            },
        );


        afterEach(
            () => {
                vi.restoreAllMocks();
            },
        );


        it(
            "accepts a valid submission, persists it and emails the submitter",
            async () => {
                const response =
                    await request(
                        app,
                    )
                        .post(
                            "/api/registrations",
                        )
                        .send(
                            VALID_PAYLOAD,
                        );


                expect(
                    response.status,
                ).toBe(
                    201,
                );


                expect(
                    response.body.success,
                ).toBe(
                    true,
                );


                // The public endpoint must not echo the record back.
                expect(
                    response.body.data,
                ).toBeUndefined();


                const rows =
                    await db.query(
                        "SELECT * FROM registrations",
                    );


                expect(
                    rows.rowCount,
                ).toBe(
                    1,
                );


                const stored =
                    rows.rows[0];


                expect(
                    stored.full_name,
                ).toBe(
                    "Ada Lovelace",
                );


                // The email address is normalised to lowercase.
                expect(
                    stored.email,
                ).toBe(
                    "ada.lovelace@example.com",
                );


                expect(
                    stored.looking_for,
                ).toBe(
                    "linkedin_makeover",
                );


                expect(
                    stored.status,
                ).toBe(
                    "new",
                );


                expect(
                    sendConfirmation,
                ).toHaveBeenCalledTimes(
                    1,
                );


                expect(
                    sendConfirmation,
                ).toHaveBeenCalledWith(
                    "ada.lovelace@example.com",
                    "Ada Lovelace",
                    "LinkedIn Makeover",
                );
            },
        );


        it(
            "still reports success when the confirmation email fails",
            async () => {
                sendConfirmation
                    .mockRejectedValue(
                        new Error(
                            "SMTP unavailable",
                        ),
                    );


                const response =
                    await request(
                        app,
                    )
                        .post(
                            "/api/registrations",
                        )
                        .send({
                            ...VALID_PAYLOAD,

                            email:
                                "resilient@example.com",
                        });


                expect(
                    response.status,
                ).toBe(
                    201,
                );


                const rows =
                    await db.query(
                        "SELECT * FROM registrations",
                    );


                expect(
                    rows.rowCount,
                ).toBe(
                    1,
                );
            },
        );


        const invalidCases:
            Array<
                [
                    string,
                    Record<
                        string,
                        unknown
                    >,
                ]
            > = [
                [
                    "a full name below the minimum length",
                    {
                        fullName:
                            "A",
                    },
                ],

                [
                    "a full name above the maximum length",
                    {
                        fullName:
                            "a".repeat(
                                151,
                            ),
                    },
                ],

                [
                    "a malformed email address",
                    {
                        email:
                            "not-an-email",
                    },
                ],

                [
                    "a contact number containing letters",
                    {
                        contactNumber:
                            "call me maybe",
                    },
                ],

                [
                    "a contact number below the minimum length",
                    {
                        contactNumber:
                            "12345",
                    },
                ],

                [
                    "an unknown searchingAs value",
                    {
                        searchingAs:
                            "charity",
                    },
                ],

                [
                    "an unknown lookingFor value",
                    {
                        lookingFor:
                            "free_publicity",
                    },
                ],

                [
                    "an empty best time to reach",
                    {
                        bestTimeToReach:
                            "",
                    },
                ],
            ];


        for (
            const [
                description,
                override,
            ] of invalidCases
        ) {
            it(
                `rejects ${description}`,
                async () => {
                    const response =
                        await request(
                            app,
                        )
                            .post(
                                "/api/registrations",
                            )
                            .send({
                                ...VALID_PAYLOAD,

                                ...override,
                            });


                    expect(
                        response.status,
                    ).toBe(
                        400,
                    );


                    const rows =
                        await db.query(
                            "SELECT * FROM registrations",
                        );


                    expect(
                        rows.rowCount,
                    ).toBe(
                        0,
                    );


                    expect(
                        sendConfirmation,
                    ).not
                        .toHaveBeenCalled();
                },
            );
        }


        const requiredFields = [
            "fullName",
            "contactNumber",
            "email",
            "searchingAs",
            "lookingFor",
            "bestTimeToReach",
        ] as const;


        for (
            const field of requiredFields
        ) {
            it(
                `rejects a submission missing ${field}`,
                async () => {
                    const payload:
                        Record<
                            string,
                            unknown
                        > = {
                        ...VALID_PAYLOAD,
                    };


                    delete payload[
                        field
                    ];


                    const response =
                        await request(
                            app,
                        )
                            .post(
                                "/api/registrations",
                            )
                            .send(
                                payload,
                            );


                    expect(
                        response.status,
                    ).toBe(
                        400,
                    );
                },
            );
        }


        it(
            "ignores a client supplied status and id",
            async () => {
                const response =
                    await request(
                        app,
                    )
                        .post(
                            "/api/registrations",
                        )
                        .send({
                            ...VALID_PAYLOAD,

                            email:
                                "massassignment@example.com",

                            id:
                                999,

                            status:
                                "closed",
                        });


                expect(
                    response.status,
                ).toBe(
                    201,
                );


                const rows =
                    await db.query(
                        "SELECT * FROM registrations",
                    );


                expect(
                    rows.rows[0].status,
                ).toBe(
                    "new",
                );


                expect(
                    rows.rows[0].id,
                ).not
                    .toBe(
                        999,
                    );
            },
        );


        it(
            "does not expose a public listing endpoint",
            async () => {
                await createRegistrationFixture();


                const response =
                    await request(
                        app,
                    )
                        .get(
                            "/api/registrations",
                        );


                expect(
                    response.status,
                ).toBe(
                    404,
                );
            },
        );
    },
);


describe(
    "admin registration access",
    () => {
        it(
            "rejects unauthenticated requests",
            async () => {
                await createRegistrationFixture();


                const response =
                    await request(
                        app,
                    )
                        .get(
                            "/api/admin/registrations",
                        );


                expect(
                    response.status,
                ).toBe(
                    401,
                );
            },
        );


        const allowedRoles:
            AdminRole[] = [
                "admin",
                "manager",
            ];


        for (
            const role of allowedRoles
        ) {
            it(
                `allows ${role} to list registrations`,
                async () => {
                    await createRegistrationFixture();


                    const token =
                        await tokenFor(
                            role,
                        );


                    const response =
                        await request(
                            app,
                        )
                            .get(
                                "/api/admin/registrations",
                            )
                            .set(
                                bearer(
                                    token,
                                ),
                            );


                    expect(
                        response.status,
                    ).toBe(
                        200,
                    );


                    expect(
                        response.body.data,
                    ).toHaveLength(
                        1,
                    );
                },
            );
        }


        it(
            "rejects an intern on every registration endpoint",
            async () => {
                const registration =
                    await createRegistrationFixture();


                const token =
                    await tokenFor(
                        "intern",
                    );


                const responses =
                    await Promise.all([
                        request(
                            app,
                        )
                            .get(
                                "/api/admin/registrations",
                            )
                            .set(
                                bearer(
                                    token,
                                ),
                            ),

                        request(
                            app,
                        )
                            .get(
                                `/api/admin/registrations/${registration.id}`,
                            )
                            .set(
                                bearer(
                                    token,
                                ),
                            ),

                        request(
                            app,
                        )
                            .patch(
                                `/api/admin/registrations/${registration.id}/status`,
                            )
                            .set(
                                bearer(
                                    token,
                                ),
                            )
                            .send({
                                status:
                                    "contacted",
                            }),

                        request(
                            app,
                        )
                            .delete(
                                `/api/admin/registrations/${registration.id}`,
                            )
                            .set(
                                bearer(
                                    token,
                                ),
                            ),
                    ]);


                for (
                    const response of responses
                ) {
                    expect(
                        response.status,
                    ).toBe(
                        403,
                    );
                }


                const rows =
                    await db.query(
                        "SELECT * FROM registrations",
                    );


                expect(
                    rows.rowCount,
                ).toBe(
                    1,
                );


                expect(
                    rows.rows[0].status,
                ).toBe(
                    "new",
                );
            },
        );


        it(
            "returns a single registration by id",
            async () => {
                const registration =
                    await createRegistrationFixture({
                        fullName:
                            "Grace Hopper",
                    });


                const token =
                    await tokenFor(
                        "admin",
                    );


                const response =
                    await request(
                        app,
                    )
                        .get(
                            `/api/admin/registrations/${registration.id}`,
                        )
                        .set(
                            bearer(
                                token,
                            ),
                        );


                expect(
                    response.status,
                ).toBe(
                    200,
                );


                expect(
                    response.body.data
                        .full_name,
                ).toBe(
                    "Grace Hopper",
                );
            },
        );


        it(
            "returns 404 for an unknown registration id",
            async () => {
                const token =
                    await tokenFor(
                        "admin",
                    );


                const response =
                    await request(
                        app,
                    )
                        .get(
                            "/api/admin/registrations/999999",
                        )
                        .set(
                            bearer(
                                token,
                            ),
                        );


                expect(
                    response.status,
                ).toBe(
                    404,
                );
            },
        );


        it(
            "updates a registration status",
            async () => {
                const registration =
                    await createRegistrationFixture();


                const token =
                    await tokenFor(
                        "manager",
                    );


                const response =
                    await request(
                        app,
                    )
                        .patch(
                            `/api/admin/registrations/${registration.id}/status`,
                        )
                        .set(
                            bearer(
                                token,
                            ),
                        )
                        .send({
                            status:
                                "contacted",
                        });


                expect(
                    response.status,
                ).toBe(
                    200,
                );


                expect(
                    response.body.data
                        .status,
                ).toBe(
                    "contacted",
                );
            },
        );


        it(
            "rejects an unknown status value",
            async () => {
                const registration =
                    await createRegistrationFixture();


                const token =
                    await tokenFor(
                        "admin",
                    );


                const response =
                    await request(
                        app,
                    )
                        .patch(
                            `/api/admin/registrations/${registration.id}/status`,
                        )
                        .set(
                            bearer(
                                token,
                            ),
                        )
                        .send({
                            status:
                                "archived",
                        });


                expect(
                    response.status,
                ).toBe(
                    400,
                );


                const rows =
                    await db.query(
                        "SELECT * FROM registrations",
                    );


                expect(
                    rows.rows[0].status,
                ).toBe(
                    "new",
                );
            },
        );


        it(
            "returns 404 when updating the status of an unknown registration",
            async () => {
                const token =
                    await tokenFor(
                        "admin",
                    );


                const response =
                    await request(
                        app,
                    )
                        .patch(
                            "/api/admin/registrations/999999/status",
                        )
                        .set(
                            bearer(
                                token,
                            ),
                        )
                        .send({
                            status:
                                "closed",
                        });


                expect(
                    response.status,
                ).toBe(
                    404,
                );
            },
        );


        it(
            "deletes a registration",
            async () => {
                const registration =
                    await createRegistrationFixture();


                const token =
                    await tokenFor(
                        "admin",
                    );


                const response =
                    await request(
                        app,
                    )
                        .delete(
                            `/api/admin/registrations/${registration.id}`,
                        )
                        .set(
                            bearer(
                                token,
                            ),
                        );


                expect(
                    response.status,
                ).toBe(
                    200,
                );


                const rows =
                    await db.query(
                        "SELECT * FROM registrations",
                    );


                expect(
                    rows.rowCount,
                ).toBe(
                    0,
                );
            },
        );


        it(
            "returns 404 when deleting an unknown registration",
            async () => {
                const token =
                    await tokenFor(
                        "admin",
                    );


                const response =
                    await request(
                        app,
                    )
                        .delete(
                            "/api/admin/registrations/999999",
                        )
                        .set(
                            bearer(
                                token,
                            ),
                        );


                expect(
                    response.status,
                ).toBe(
                    404,
                );
            },
        );
    },
);


/**
 * Must remain the final describe block in this file: it
 * deliberately exhausts the shared public submission rate
 * limit window.
 */
describe(
    "public registration rate limiting",
    () => {
        it(
            "eventually rejects repeated submissions with 429",
            async () => {
                vi.spyOn(
                    MailService.prototype,
                    "sendRegistrationConfirmation",
                )
                    .mockResolvedValue(
                        undefined,
                    );


                let limitedStatus:
                    number | null =
                    null;


                for (
                    let attempt = 0;
                    attempt < 12;
                    attempt += 1
                ) {
                    const response =
                        await request(
                            app,
                        )
                            .post(
                                "/api/registrations",
                            )
                            .send({
                                ...VALID_PAYLOAD,

                                email:
                                    `burst.${attempt}@example.com`,
                            });


                    if (
                        response.status ===
                        429
                    ) {
                        limitedStatus =
                            response.status;


                        break;
                    }
                }


                expect(
                    limitedStatus,
                ).toBe(
                    429,
                );


                vi.restoreAllMocks();
            },
        );
    },
);
