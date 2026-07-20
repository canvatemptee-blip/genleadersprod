import {
    db,
} from "../../src/config/database.js";

import {
    passwordService,
} from "../../src/shared/security/PasswordService.js";

import type {
    AdminRole,
} from "../../src/modules/admin/admin.types.js";


export interface AdminFixtureOptions {
    name?:
    string;

    email?:
    string;

    password?:
    string;

    role?:
    AdminRole;

    isActive?:
    boolean;
}


export interface AdminFixture {
    id:
    number;

    name:
    string;

    email:
    string;

    password:
    string;

    role:
    AdminRole;

    isActive:
    boolean;
}


let fixtureCounter =
    0;


export function resetAdminFixtureCounter() {
    fixtureCounter =
        0;
}


export async function createAdminFixture(
    options:
        AdminFixtureOptions = {},
):
    Promise<AdminFixture> {
    fixtureCounter +=
        1;


    const name =
        options.name ??
        `Test Admin ${fixtureCounter}`;


    const email =
        options.email ??
        `test-admin-${fixtureCounter}@genleaders.test`;


    const password =
        options.password ??
        "TestPassword123!";


    const role =
        options.role ??
        "intern";


    const isActive =
        options.isActive ??
        true;


    const passwordHash =
        await passwordService.hash(
            password,
        );


    const result =
        await db.query<{
            id:
            number;
        }>(
            `
            INSERT INTO admins (
                name,
                email,
                password_hash,
                role,
                is_active
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING id
            `,
            [
                name,
                email,
                passwordHash,
                role,
                isActive,
            ],
        );


    return {
        id:
            Number(
                result.rows[0].id,
            ),

        name,

        email,

        password,

        role,

        isActive,
    };
}