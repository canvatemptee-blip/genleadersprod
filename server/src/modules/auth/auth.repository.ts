import {
    AdminRepository,
} from "../admin/admin.repository.js";

import type {
    AdminRole,
} from "../admin/admin.types.js";


export interface CurrentAuthAccount {
    id:
    number;

    email:
    string;

    role:
    AdminRole;

    is_active:
    boolean;
}


export class AuthRepository
    extends AdminRepository {

    async findCurrentAuthAccount(
        id: number,
    ):
        Promise<
            CurrentAuthAccount | null
        > {
        return this.queryOne<
            CurrentAuthAccount
        >(
            `
            SELECT
                id,
                email,
                role,
                is_active
            FROM admins
            WHERE id = $1
            `,
            [
                id,
            ],
        );
    }
}