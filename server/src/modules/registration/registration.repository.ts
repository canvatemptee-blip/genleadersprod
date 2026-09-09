import {
    BaseRepository,
} from "../../shared/utils/BaseRepository.js";

import type {
    Registration,
    RegistrationStatus,
} from "./registration.types.js";

import type {
    CreateRegistrationDto,
} from "./registration.validation.js";


export class RegistrationRepository
    extends BaseRepository {

    async findAll():
        Promise<
            Registration[]
        > {
        return this.query<
            Registration
        >(
            `
            SELECT *
            FROM registrations
            ORDER BY created_at DESC
            `,
        );
    }


    async findById(
        id: number,
    ):
        Promise<
            Registration | null
        > {
        return this.queryOne<
            Registration
        >(
            `
            SELECT *
            FROM registrations
            WHERE id = $1
            `,
            [
                id,
            ],
        );
    }


    async create(
        data:
            CreateRegistrationDto,
    ):
        Promise<
            Registration
        > {
        return (
            await this.queryOne<
                Registration
            >(
                `
                INSERT INTO registrations (
                    full_name,
                    contact_number,
                    email,
                    searching_as,
                    looking_for,
                    best_time_to_reach
                )
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                )
                RETURNING *
                `,
                [
                    data.fullName,

                    data.contactNumber,

                    data.email,

                    data.searchingAs,

                    data.lookingFor,

                    data.bestTimeToReach,
                ],
            )
        )!;
    }


    async updateStatus(
        id: number,

        status:
            RegistrationStatus,
    ):
        Promise<
            Registration | null
        > {
        return this.queryOne<
            Registration
        >(
            `
            UPDATE registrations
            SET
                status = $1,
                updated_at = NOW()
            WHERE id = $2
            RETURNING *
            `,
            [
                status,

                id,
            ],
        );
    }


    async delete(
        id: number,
    ):
        Promise<boolean> {
        const result =
            await this.db.query(
                `
                DELETE FROM registrations
                WHERE id = $1
                `,
                [
                    id,
                ],
            );


        return (
            result.rowCount ===
            1
        );
    }
}
