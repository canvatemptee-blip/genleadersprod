import {
    z,
} from "zod";

import {
    LOOKING_FOR_VALUES,
    REGISTRATION_STATUS_VALUES,
    SEARCHING_AS_VALUES,
} from "./registration.types.js";


const CONTACT_NUMBER_PATTERN =
    /^[+()\d\s-]+$/;


export const createRegistrationSchema =
    z.object({
        fullName:
            z.string()
                .trim()
                .min(2)
                .max(150),


        contactNumber:
            z.string()
                .trim()
                .min(7)
                .max(30)
                .regex(
                    CONTACT_NUMBER_PATTERN,
                ),


        email:
            z.string()
                .trim()
                .toLowerCase()
                .email()
                .max(255),


        searchingAs:
            z.enum(
                SEARCHING_AS_VALUES,
            ),


        lookingFor:
            z.enum(
                LOOKING_FOR_VALUES,
            ),


        bestTimeToReach:
            z.string()
                .trim()
                .min(2)
                .max(120),
    });


export const updateRegistrationStatusSchema =
    z.object({
        status:
            z.enum(
                REGISTRATION_STATUS_VALUES,
            ),
    });


export type CreateRegistrationDto =
    z.infer<
        typeof createRegistrationSchema
    >;


export type UpdateRegistrationStatusDto =
    z.infer<
        typeof updateRegistrationStatusSchema
    >;
