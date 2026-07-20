import { BaseRepository } from "../../shared/utils/BaseRepository.js";

import type {
    Admin,
    AdminRole,
} from "./admin.types.js";

interface CreateStaffRecord {
    name: string;

    email: string;

    password_hash: string;

    role: AdminRole;

    created_by: number;
}

export class AdminRepository extends BaseRepository {
    async findAll(): Promise<Admin[]> {
        return this.query<Admin>(
            `
            SELECT
                id,
                name,
                email,
                role,
                is_active,
                last_login_at,
                created_by,
                created_at,
                updated_at
            FROM admins
            ORDER BY created_at DESC
            `,
        );
    }

    async findByEmail(
        email: string,
    ): Promise<Admin | null> {
        return this.queryOne<Admin>(
            `
            SELECT *
            FROM admins
            WHERE LOWER(email) = LOWER($1)
            `,
            [email],
        );
    }

    async findById(
        id: number,
    ): Promise<Admin | null> {
        return this.queryOne<Admin>(
            `
            SELECT *
            FROM admins
            WHERE id = $1
            `,
            [id],
        );
    }

    async createStaff(
        data: CreateStaffRecord,
    ): Promise<Admin> {
        return this.queryOne<Admin>(
            `
            INSERT INTO admins (
                name,
                email,
                password_hash,
                role,
                created_by
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING
                id,
                name,
                email,
                role,
                is_active,
                last_login_at,
                created_by,
                created_at,
                updated_at
            `,
            [
                data.name,
                data.email,
                data.password_hash,
                data.role,
                data.created_by,
            ],
        ) as Promise<Admin>;
    }

    async updateRole(
        id: number,
        role: AdminRole,
    ): Promise<Admin> {
        return this.queryOne<Admin>(
            `
            UPDATE admins
            SET
                role = $1,
                updated_at = NOW()
            WHERE id = $2
            RETURNING
                id,
                name,
                email,
                role,
                is_active,
                last_login_at,
                created_by,
                created_at,
                updated_at
            `,
            [
                role,
                id,
            ],
        ) as Promise<Admin>;
    }

    async updateStatus(
        id: number,
        isActive: boolean,
    ): Promise<Admin> {
        return this.queryOne<Admin>(
            `
            UPDATE admins
            SET
                is_active = $1,
                updated_at = NOW()
            WHERE id = $2
            RETURNING
                id,
                name,
                email,
                role,
                is_active,
                last_login_at,
                created_by,
                created_at,
                updated_at
            `,
            [
                isActive,
                id,
            ],
        ) as Promise<Admin>;
    }

    async updateLastLogin(
        id: number,
    ): Promise<void> {
        await this.db.query(
            `
            UPDATE admins
            SET
                last_login_at = NOW(),
                updated_at = NOW()
            WHERE id = $1
            `,
            [id],
        );
    }
}