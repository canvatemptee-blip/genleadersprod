import {
    rateLimit,
} from "express-rate-limit";


const fifteenMinutes =
    15 * 60 * 1000;


const oneHour =
    60 * 60 * 1000;


export const newsletterSubscribeLimiter =
    rateLimit({
        windowMs:
            fifteenMinutes,

        limit:
            5,

        standardHeaders:
            "draft-8",

        legacyHeaders:
            false,

        message: {
            success:
                false,

            message:
                "Too many subscription requests. Please try again later.",
        },
    });


export const newsletterResendLimiter =
    rateLimit({
        windowMs:
            oneHour,

        limit:
            3,

        standardHeaders:
            "draft-8",

        legacyHeaders:
            false,

        message: {
            success:
                false,

            message:
                "Too many verification email requests. Please try again later.",
        },
    });


export const newsletterUnsubscribeRequestLimiter =
    rateLimit({
        windowMs:
            fifteenMinutes,

        limit:
            5,

        standardHeaders:
            "draft-8",

        legacyHeaders:
            false,

        message: {
            success:
                false,

            message:
                "Too many unsubscribe requests. Please try again later.",
        },
    });


export const newsletterTokenLimiter =
    rateLimit({
        windowMs:
            fifteenMinutes,

        limit:
            10,

        standardHeaders:
            "draft-8",

        legacyHeaders:
            false,

        message: {
            success:
                false,

            message:
                "Too many confirmation attempts. Please try again later.",
        },
    });