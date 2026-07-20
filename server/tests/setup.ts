import {
    afterAll,
    beforeAll,
    beforeEach,
} from "vitest";

import {
    db,
} from "../src/config/database.js";

import {
    resetDatabase,
} from "./helpers/resetDatabase.js";

import {
    resetAdminFixtureCounter,
} from "./helpers/adminFixtures.js";


beforeAll(
    async () => {
        if (
            process.env.NODE_ENV !==
            "test"
        ) {
            throw new Error(
                "Tests must run with NODE_ENV=test.",
            );
        }


        const databaseResult =
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


        const databaseName =
            databaseResult.rows[0]
                ?.database_name;


        if (
            databaseName !==
            "genleaders_test"
        ) {
            throw new Error(
                `Unsafe test database: ${databaseName}. Expected genleaders_test.`,
            );
        }
    },
);


beforeEach(
    async () => {
        await resetDatabase();

        resetAdminFixtureCounter();
    },
);


afterAll(
    async () => {
        await db.end();
    },
);