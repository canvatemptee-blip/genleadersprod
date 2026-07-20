import {
    db,
} from "../../config/database.js";


export class HealthRepository {
    async checkDatabase():
        Promise<void> {
        await db.query(
            "SELECT 1",
        );
    }
}