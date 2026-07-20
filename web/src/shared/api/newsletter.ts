import {
    api,
} from "./api";

import {
    ENDPOINTS,
} from "./endpoints";

import type {
    NewsletterEmailPayload,
    NewsletterTokenPayload,
} from "@/types/newsletter";


export const newsletterApi = {
    subscribe(
        data:
            NewsletterEmailPayload,
    ) {
        return api.post<
            void
        >(
            ENDPOINTS.NEWSLETTER.SUBSCRIBE,
            data,
        );
    },


    resendVerification(
        data:
            NewsletterEmailPayload,
    ) {
        return api.post<
            void
        >(
            ENDPOINTS.NEWSLETTER.RESEND_VERIFICATION,
            data,
        );
    },


    verify(
        data:
            NewsletterTokenPayload,
    ) {
        return api.post<
            void
        >(
            ENDPOINTS.NEWSLETTER.VERIFY,
            data,
        );
    },


    requestUnsubscribe(
        data:
            NewsletterEmailPayload,
    ) {
        return api.post<
            void
        >(
            ENDPOINTS.NEWSLETTER.UNSUBSCRIBE_REQUEST,
            data,
        );
    },


    unsubscribe(
        data:
            NewsletterTokenPayload,
    ) {
        return api.post<
            void
        >(
            ENDPOINTS.NEWSLETTER.UNSUBSCRIBE,
            data,
        );
    },
};