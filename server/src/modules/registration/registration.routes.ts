import {
    Router,
} from "express";

import {
    registrationSubmitLimiter,
} from "../../middleware/rateLimiters.js";

import {
    validate,
} from "../../middleware/validate.js";

import {
    asyncHandler,
} from "../../shared/utils/asyncHandler.js";

import {
    RegistrationController,
} from "./registration.controller.js";

import {
    createRegistrationSchema,
} from "./registration.validation.js";


const router =
    Router();


const controller =
    new RegistrationController();


router.post(
    "/",

    validate(
        createRegistrationSchema,
    ),

    registrationSubmitLimiter,

    asyncHandler(
        controller.create,
    ),
);


export default router;
