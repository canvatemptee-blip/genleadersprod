import {
    NotFoundError,
} from "../../shared/errors/NotFoundError.js";

import {
    ValidationError,
} from "../../shared/errors/ValidationError.js";

import {
    MailService,
} from "../../shared/services/mail.service.js";

import {
    createNewsletterToken,
    hashNewsletterToken,
} from "../../shared/utils/newsletterToken.js";

import {
    NewsletterRepository,
} from "./newsletter.repository.js";


const VERIFICATION_EXPIRY_HOURS =
    24;


const UNSUBSCRIBE_EXPIRY_HOURS =
    24;


function createExpiryDate(
    hours: number,
) {
    const expiresAt =
        new Date();


    expiresAt.setHours(
        expiresAt.getHours() +
        hours,
    );


    return expiresAt;
}


export class NewsletterService {
    constructor(
        private readonly repository =
            new NewsletterRepository(),

        private readonly mailService =
            new MailService(),
    ) { }


    async getSubscribers() {
        return this.repository
            .findAll();
    }


    async subscribe(
        email: string,
    ) {
        const normalizedEmail =
            email
                .trim()
                .toLowerCase();

        const existing =
            await this.repository
                .findByEmail(
                    normalizedEmail,
                );

        if (
            existing?.is_verified
        ) {
            return;
        }

        const verificationToken =
            createNewsletterToken();

        const verificationExpiresAt =
            createExpiryDate(
                VERIFICATION_EXPIRY_HOURS,
            );

        if (
            existing
        ) {
            await this.repository
                .refreshVerification(
                    existing.id,
                    {
                        verificationTokenHash:
                            verificationToken.hash,

                        verificationExpiresAt,
                    },
                );
        } else {
            await this.repository
                .createPending({
                    email:
                        normalizedEmail,

                    verificationTokenHash:
                        verificationToken.hash,

                    verificationExpiresAt,
                });
        }

        try {
            await this.mailService
                .sendNewsletterVerification(
                    normalizedEmail,
                    verificationToken.token,
                );
        } catch (error) {
            console.error(
                "Failed to send verification email:",
                error,
            );
        }
    }


    async resendVerification(
        email: string,
    ) {
        const normalizedEmail =
            email
                .trim()
                .toLowerCase();


        const subscriber =
            await this.repository
                .findByEmail(
                    normalizedEmail,
                );


        if (
            !subscriber ||
            subscriber.is_verified
        ) {
            return;
        }


        const verificationToken =
            createNewsletterToken();


        const verificationExpiresAt =
            createExpiryDate(
                VERIFICATION_EXPIRY_HOURS,
            );


        await this.mailService
            .sendNewsletterVerification(
                subscriber.email,
                verificationToken.token,
            );


        await this.repository
            .refreshVerification(
                subscriber.id,
                {
                    verificationTokenHash:
                        verificationToken.hash,

                    verificationExpiresAt,
                },
            );
    }


    async verify(
        token: string,
    ) {
        const tokenHash =
            hashNewsletterToken(
                token,
            );


        const subscriber =
            await this.repository
                .findByVerificationTokenHash(
                    tokenHash,
                );


        if (
            !subscriber
        ) {
            throw new ValidationError(
                "Verification link is invalid or has already been used.",
            );
        }


        if (
            subscriber.is_verified
        ) {
            throw new ValidationError(
                "Email is already verified.",
            );
        }


        if (
            !subscriber
                .verification_expires_at ||
            new Date(
                subscriber
                    .verification_expires_at,
            ).getTime() <
            Date.now()
        ) {
            throw new ValidationError(
                "Verification link has expired. Request a new verification email.",
            );
        }


        await this.repository
            .markVerified(
                subscriber.id,
            );
    }


    async requestUnsubscribe(
        email: string,
    ) {
        const normalizedEmail =
            email
                .trim()
                .toLowerCase();


        const subscriber =
            await this.repository
                .findByEmail(
                    normalizedEmail,
                );


        if (
            !subscriber ||
            !subscriber.is_verified
        ) {
            return;
        }


        const unsubscribeToken =
            createNewsletterToken();


        const unsubscribeExpiresAt =
            createExpiryDate(
                UNSUBSCRIBE_EXPIRY_HOURS,
            );


        await this.mailService
            .sendNewsletterUnsubscribe(
                subscriber.email,
                unsubscribeToken.token,
            );


        await this.repository
            .setUnsubscribeToken(
                subscriber.id,
                {
                    unsubscribeTokenHash:
                        unsubscribeToken.hash,

                    unsubscribeExpiresAt,
                },
            );
    }


    async unsubscribe(
        token: string,
    ) {
        const tokenHash =
            hashNewsletterToken(
                token,
            );


        const subscriber =
            await this.repository
                .findByUnsubscribeTokenHash(
                    tokenHash,
                );


        if (
            !subscriber
        ) {
            throw new ValidationError(
                "Unsubscribe link is invalid or has already been used.",
            );
        }


        if (
            !subscriber
                .unsubscribe_expires_at ||
            new Date(
                subscriber
                    .unsubscribe_expires_at,
            ).getTime() <
            Date.now()
        ) {
            throw new ValidationError(
                "Unsubscribe link has expired. Request a new unsubscribe email.",
            );
        }


        const deleted =
            await this.repository
                .delete(
                    subscriber.id,
                );


        if (
            !deleted
        ) {
            throw new ValidationError(
                "Failed to unsubscribe.",
            );
        }
    }


    async deleteSubscriber(
        id: number,
    ) {
        const subscriber =
            await this.repository
                .findById(
                    id,
                );


        if (
            !subscriber
        ) {
            throw new NotFoundError(
                "Subscriber",
            );
        }


        const deleted =
            await this.repository
                .delete(
                    id,
                );


        if (
            !deleted
        ) {
            throw new ValidationError(
                "Failed to delete subscriber.",
            );
        }
    }

    async cleanupExpiredState() {
        return this.repository
            .cleanupExpiredState();
    }
}