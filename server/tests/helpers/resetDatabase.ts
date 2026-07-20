import {
    db,
} from "../../src/config/database.js";


export async function resetDatabase():
    Promise<void> {
    await db.query(
        `
        TRUNCATE TABLE
            newsletter_subscribers,
            articles,
            categories,
            admins
        RESTART IDENTITY
        CASCADE
        `,
    );
}