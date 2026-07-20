import {
    describe,
    expect,
    it,
} from "vitest";

import {
    db,
} from "../src/config/database.js";


describe(
    "test environment",
    () => {
        it(
            "connects only to the dedicated test database",
            async () => {
                const result =
                    await db.query<{
                        database_name:
                        string;
                    }>(
                        `
                        SELECT
                            current_database()
                                AS database_name
                        `,
                    );


                expect(
                    result.rows[0]
                        ?.database_name,
                ).toBe(
                    "genleaders_test",
                );
            },
        );
    },
);