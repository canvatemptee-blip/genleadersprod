import {
    describe,
    expect,
    it,
} from "vitest";

import {
    db,
} from "../src/config/database.js";

import {
    createAdminFixture,
} from "./helpers/adminFixtures.js";

import {
    loginAs,
} from "./helpers/authHelpers.js";


describe(
    "test helpers",
    () => {
        it(
            "creates a deterministic admin fixture",
            async () => {
                const admin =
                    await createAdminFixture({
                        role:
                            "manager",
                    });


                expect(
                    admin.id,
                ).toBe(
                    1,
                );


                expect(
                    admin.role,
                ).toBe(
                    "manager",
                );


                const result =
                    await db.query<{
                        email:
                        string;

                        role:
                        string;

                        is_active:
                        boolean;
                    }>(
                        `
                        SELECT
                            email,
                            role,
                            is_active
                        FROM admins
                        WHERE id = $1
                        `,
                        [
                            admin.id,
                        ],
                    );


                expect(
                    result.rows[0],
                ).toEqual({
                    email:
                        admin.email,

                    role:
                        "manager",

                    is_active:
                        true,
                });
            },
        );


        it(
            "logs in through the real HTTP API",
            async () => {
                const admin =
                    await createAdminFixture({
                        role:
                            "admin",
                    });


                const token =
                    await loginAs({
                        email:
                            admin.email,

                        password:
                            admin.password,
                    });


                expect(
                    token,
                ).toEqual(
                    expect.any(
                        String,
                    ),
                );


                expect(
                    token.length,
                ).toBeGreaterThan(
                    20,
                );
            },
        );
    },
);