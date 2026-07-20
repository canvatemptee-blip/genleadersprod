import {
    Router,
} from "express";

import {
    validate,
} from "../../middleware/validate.js";

import {
    newsletterResendLimiter,
    newsletterSubscribeLimiter,
    newsletterTokenLimiter,
    newsletterUnsubscribeRequestLimiter,
} from "../../middleware/rateLimiters.js";

import {
    asyncHandler,
} from "../../shared/utils/asyncHandler.js";

import {
    NewsletterController,
} from "./newsletter.controller.js";

import {
    newsletterTokenSchema,
    subscribeSchema,
    unsubscribeRequestSchema,
} from "./newsletter.validation.js";


const router =
    Router();


const controller =
    new NewsletterController();


router.post(
    "/subscribe",

    validate(
        subscribeSchema,
    ),

    newsletterSubscribeLimiter,

    asyncHandler(
        controller.subscribe,
    ),
);


router.post(
    "/resend-verification",

    validate(
        subscribeSchema,
    ),

    newsletterResendLimiter,

    asyncHandler(
        controller.resendVerification,
    ),
);


router.post(
    "/verify",

    validate(
        newsletterTokenSchema,
    ),

    newsletterTokenLimiter,

    asyncHandler(
        controller.verify,
    ),
);


router.post(
    "/unsubscribe/request",

    validate(
        unsubscribeRequestSchema,
    ),

    newsletterUnsubscribeRequestLimiter,

    asyncHandler(
        controller.requestUnsubscribe,
    ),
);


router.post(
    "/unsubscribe",

    validate(
        newsletterTokenSchema,
    ),

    newsletterTokenLimiter,

    asyncHandler(
        controller.unsubscribe,
    ),
);


export default router;