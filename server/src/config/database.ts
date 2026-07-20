import {
    Pool,
    types,
} from "pg";

import {
    env,
} from "./env.js";

import {
    logger,
} from "./logger.js";


const POSTGRES_BIGINT_OID =
    20;


types.setTypeParser(
    POSTGRES_BIGINT_OID,
    (
        value,
    ) => {
        const parsed =
            Number(
                value,
            );


        if (
            !Number.isSafeInteger(
                parsed,
            )
        ) {
            throw new Error(
                `PostgreSQL BIGINT value exceeds JavaScript safe integer range: ${value}`,
            );
        }


        return parsed;
    },
);


export const db = new Pool({
    connectionString: env.DATABASE_URL,
    ssl:
        process.env.NODE_ENV === "production"
            ? {
                  rejectUnauthorized: false,
              }
            : false,
});


db.on(
    "connect",
    () => {
        logger.info(
            "PostgreSQL connection established.",
        );
    },
);


db.on(
    "error",
    (
        error,
    ) => {
        logger.error(
            "Unexpected PostgreSQL pool error.",
            error,
        );
    },
);


export async function closeDatabase() {
    logger.info(
        "Closing PostgreSQL connection pool...",
    );


    await db.end();


    logger.info(
        "PostgreSQL connection pool closed.",
    );
}