import {
    logger,
} from "../config/logger.js";

import {
    NewsletterService,
} from "../modules/newsletter/newsletter.service.js";


const CHECK_INTERVAL_MS =
    6 * 60 * 60 * 1000;


const newsletterService =
    new NewsletterService();


let isRunning =
    false;


async function cleanupNewsletterState() {
    if (
        isRunning
    ) {
        return;
    }


    isRunning =
        true;


    try {
        const result =
            await newsletterService
                .cleanupExpiredState();


        const totalChanges =
            result
                .deletedPendingSubscribers +
            result
                .clearedUnsubscribeTokens;


        if (
            totalChanges >
            0
        ) {
            logger.info(
                [
                    "[Newsletter Cleanup]",
                    `Deleted ${result.deletedPendingSubscribers}`,
                    "expired pending subscriber(s),",
                    `cleared ${result.clearedUnsubscribeTokens}`,
                    "expired unsubscribe token(s).",
                ].join(
                    " ",
                ),
            );
        }
    } catch (
    error
    ) {
        logger.error(
            "Newsletter cleanup job failed.",
            error,
        );
    } finally {
        isRunning =
            false;
    }
}


export function startNewsletterCleanupJob() {
    logger.info(
        "Newsletter cleanup job started.",
    );


    void cleanupNewsletterState();


    const interval =
        setInterval(
            () => {
                void cleanupNewsletterState();
            },
            CHECK_INTERVAL_MS,
        );


    interval.unref();
}