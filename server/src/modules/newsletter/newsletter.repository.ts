import {
    BaseRepository,
} from "../../shared/utils/BaseRepository.js";

import type {
    NewsletterSubscriber,
} from "./newsletter.types.js";


interface CreatePendingSubscriberData {
    email: string;

    verificationTokenHash:
    string;

    verificationExpiresAt:
    Date;
}


interface RefreshVerificationData {
    verificationTokenHash:
    string;

    verificationExpiresAt:
    Date;
}


interface SetUnsubscribeTokenData {
    unsubscribeTokenHash:
    string;

    unsubscribeExpiresAt:
    Date;
}


export interface NewsletterCleanupResult {
    deletedPendingSubscribers:
    number;

    clearedUnsubscribeTokens:
    number;
}


export class NewsletterRepository
    extends BaseRepository {

    async findAll():
        Promise<
            NewsletterSubscriber[]
        > {
        return this.query<
            NewsletterSubscriber
        >(
            `
            SELECT
                id,
                email,
                subscribed_at,
                is_verified,
                verification_expires_at,
                verified_at
            FROM newsletter_subscribers
            ORDER BY subscribed_at DESC
            `,
        );
    }


    async findById(
        id: number,
    ):
        Promise<
            NewsletterSubscriber | null
        > {
        return this.queryOne<
            NewsletterSubscriber
        >(
            `
            SELECT *
            FROM newsletter_subscribers
            WHERE id = $1
            `,
            [
                id,
            ],
        );
    }


    async findByEmail(
        email: string,
    ):
        Promise<
            NewsletterSubscriber | null
        > {
        return this.queryOne<
            NewsletterSubscriber
        >(
            `
            SELECT *
            FROM newsletter_subscribers
            WHERE email = $1
            `,
            [
                email,
            ],
        );
    }


    async findByVerificationTokenHash(
        tokenHash:
            string,
    ):
        Promise<
            NewsletterSubscriber | null
        > {
        return this.queryOne<
            NewsletterSubscriber
        >(
            `
            SELECT *
            FROM newsletter_subscribers
            WHERE verification_token_hash = $1
            `,
            [
                tokenHash,
            ],
        );
    }


    async findByUnsubscribeTokenHash(
        tokenHash:
            string,
    ):
        Promise<
            NewsletterSubscriber | null
        > {
        return this.queryOne<
            NewsletterSubscriber
        >(
            `
            SELECT *
            FROM newsletter_subscribers
            WHERE unsubscribe_token_hash = $1
            `,
            [
                tokenHash,
            ],
        );
    }


    async createPending(
        data:
            CreatePendingSubscriberData,
    ):
        Promise<
            NewsletterSubscriber
        > {
        return (
            await this.queryOne<
                NewsletterSubscriber
            >(
                `
                INSERT INTO newsletter_subscribers (
                    email,
                    is_verified,
                    verification_token_hash,
                    verification_expires_at
                )
                VALUES (
                    $1,
                    FALSE,
                    $2,
                    $3
                )
                RETURNING *
                `,
                [
                    data.email,

                    data
                        .verificationTokenHash,

                    data
                        .verificationExpiresAt,
                ],
            )
        )!;
    }


    async refreshVerification(
        id: number,

        data:
            RefreshVerificationData,
    ):
        Promise<
            NewsletterSubscriber | null
        > {
        return this.queryOne<
            NewsletterSubscriber
        >(
            `
            UPDATE newsletter_subscribers
            SET
                verification_token_hash = $1,
                verification_expires_at = $2
            WHERE id = $3
            RETURNING *
            `,
            [
                data
                    .verificationTokenHash,

                data
                    .verificationExpiresAt,

                id,
            ],
        );
    }


    async markVerified(
        id: number,
    ):
        Promise<
            NewsletterSubscriber | null
        > {
        return this.queryOne<
            NewsletterSubscriber
        >(
            `
            UPDATE newsletter_subscribers
            SET
                is_verified = TRUE,
                verified_at = NOW(),
                verification_token_hash = NULL,
                verification_expires_at = NULL
            WHERE id = $1
            RETURNING *
            `,
            [
                id,
            ],
        );
    }


    async setUnsubscribeToken(
        id: number,

        data:
            SetUnsubscribeTokenData,
    ):
        Promise<
            NewsletterSubscriber | null
        > {
        return this.queryOne<
            NewsletterSubscriber
        >(
            `
            UPDATE newsletter_subscribers
            SET
                unsubscribe_token_hash = $1,
                unsubscribe_expires_at = $2
            WHERE id = $3
            RETURNING *
            `,
            [
                data
                    .unsubscribeTokenHash,

                data
                    .unsubscribeExpiresAt,

                id,
            ],
        );
    }


    async cleanupExpiredState():
        Promise<
            NewsletterCleanupResult
        > {
        const client =
            await this.db.connect();


        try {
            await client.query(
                "BEGIN",
            );


            const deletedPending =
                await client.query(
                    `
                    DELETE FROM newsletter_subscribers
                    WHERE
                        is_verified = FALSE
                        AND verification_expires_at IS NOT NULL
                        AND verification_expires_at <= NOW()
                    `,
                );


            const clearedUnsubscribe =
                await client.query(
                    `
                    UPDATE newsletter_subscribers
                    SET
                        unsubscribe_token_hash = NULL,
                        unsubscribe_expires_at = NULL
                    WHERE
                        is_verified = TRUE
                        AND unsubscribe_expires_at IS NOT NULL
                        AND unsubscribe_expires_at <= NOW()
                    `,
                );


            await client.query(
                "COMMIT",
            );


            return {
                deletedPendingSubscribers:
                    deletedPending.rowCount ??
                    0,

                clearedUnsubscribeTokens:
                    clearedUnsubscribe.rowCount ??
                    0,
            };
        } catch (
        error
        ) {
            await client.query(
                "ROLLBACK",
            );


            throw error;
        } finally {
            client.release();
        }
    }


    async delete(
        id: number,
    ):
        Promise<boolean> {
        const result =
            await this.db.query(
                `
                DELETE FROM newsletter_subscribers
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