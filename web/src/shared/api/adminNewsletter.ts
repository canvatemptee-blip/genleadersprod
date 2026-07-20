import {
    api,
} from "./api";

import {
    ENDPOINTS,
} from "./endpoints";

import type {
    NewsletterSubscriber,
} from "@/types/newsletter";


export const adminNewsletterApi = {
    getSubscribers() {
        return api.get<
            NewsletterSubscriber[]
        >(
            ENDPOINTS.ADMIN.NEWSLETTER.GET_ALL,
        );
    },


    deleteSubscriber(
        id: number,
    ) {
        return api.delete<
            void
        >(
            ENDPOINTS.ADMIN.NEWSLETTER.DELETE(
                id,
            ),
        );
    },
};