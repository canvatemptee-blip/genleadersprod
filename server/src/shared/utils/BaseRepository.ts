import { Pool, QueryResultRow } from "pg";

import { db } from "../../config/database.js";

export abstract class BaseRepository {
    protected readonly db: Pool = db;

    protected async query<T extends QueryResultRow>(
        sql: string,
        params: unknown[] = [],
    ): Promise<T[]> {
        const result = await this.db.query<T>(sql, params);

        return result.rows;
    }

    protected async queryOne<T extends QueryResultRow>(
        sql: string,
        params: unknown[] = [],
    ): Promise<T | null> {
        const result = await this.db.query<T>(sql, params);

        return result.rows[0] ?? null;
    }

    protected async execute(
        sql: string,
        params: unknown[] = [],
    ): Promise<void> {
        await this.db.query(sql, params);
    }
}