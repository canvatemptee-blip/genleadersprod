import {
    logger,
} from "../../config/logger.js";

import {
    NotFoundError,
} from "../../shared/errors/NotFoundError.js";

import {
    MailService,
} from "../../shared/services/mail.service.js";

import {
    RegistrationRepository,
} from "./registration.repository.js";

import {
    LOOKING_FOR_LABELS,
} from "./registration.types.js";

import type {
    Registration,
    RegistrationStatus,
} from "./registration.types.js";

import type {
    CreateRegistrationDto,
} from "./registration.validation.js";


export class RegistrationService {
    constructor(
        private readonly repository =
            new RegistrationRepository(),

        private readonly mailService =
            new MailService(),
    ) { }


    async getRegistrations():
        Promise<
            Registration[]
        > {
        return this.repository
            .findAll();
    }


    async getRegistrationById(
        id: number,
    ):
        Promise<
            Registration
        > {
        const registration =
            await this.repository
                .findById(
                    id,
                );


        if (
            !registration
        ) {
            throw new NotFoundError(
                "Registration",
            );
        }


        return registration;
    }


    async createRegistration(
        data:
            CreateRegistrationDto,
    ):
        Promise<void> {
        const registration =
            await this.repository
                .create(
                    data,
                );


        /**
         * The registration is already persisted at this
         * point. A failed confirmation email must never
         * make the submission look unsuccessful, so the
         * delivery error is logged and swallowed.
         */
        try {
            await this.mailService
                .sendRegistrationConfirmation(
                    registration.email,

                    registration.full_name,

                    LOOKING_FOR_LABELS[
                        registration
                            .looking_for
                    ],
                );
        } catch (
        error
        ) {
            logger.error(
                `Registration ${registration.id} was saved but its confirmation email could not be delivered.`,
                error,
            );
        }
    }


    async updateRegistrationStatus(
        id: number,

        status:
            RegistrationStatus,
    ):
        Promise<
            Registration
        > {
        const registration =
            await this.repository
                .updateStatus(
                    id,
                    status,
                );


        if (
            !registration
        ) {
            throw new NotFoundError(
                "Registration",
            );
        }


        return registration;
    }


    async deleteRegistration(
        id: number,
    ):
        Promise<void> {
        const deleted =
            await this.repository
                .delete(
                    id,
                );


        if (
            !deleted
        ) {
            throw new NotFoundError(
                "Registration",
            );
        }
    }
}
