import type {
    Request,
    Response,
} from "express";

import {
    ApiResponse,
} from "../../shared/utils/ApiResponse.js";

import {
    RegistrationService,
} from "./registration.service.js";


export class RegistrationController {
    constructor(
        private readonly service =
            new RegistrationService(),
    ) { }


    create = async (
        req: Request,
        res: Response,
    ) => {
        await this.service
            .createRegistration(
                req.body,
            );


        return res
            .status(
                201,
            )
            .json(
                ApiResponse.success(
                    "Your registration has been received.",
                ),
            );
    };
}
