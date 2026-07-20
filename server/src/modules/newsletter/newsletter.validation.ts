import {
    z,
} from "zod";


export const subscribeSchema =
    z.object({
        email:
            z.string()
                .trim()
                .toLowerCase()
                .email(),
    });


export const newsletterTokenSchema =
    z.object({
        token:
            z.string()
                .min(64)
                .max(128),
    });


export const unsubscribeRequestSchema =
    z.object({
        email:
            z.string()
                .trim()
                .toLowerCase()
                .email(),
    });


export type SubscribeDto =
    z.infer<
        typeof subscribeSchema
    >;


export type NewsletterTokenDto =
    z.infer<
        typeof newsletterTokenSchema
    >;


export type UnsubscribeRequestDto =
    z.infer<
        typeof unsubscribeRequestSchema
    >;