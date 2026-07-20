import {
    logger,
} from "../config/logger.js";

import {
    ArticleService,
} from "../modules/article/article.service.js";


const CHECK_INTERVAL_MS =
    60 * 1000;


const articleService =
    new ArticleService();


let isRunning =
    false;


async function publishDueArticles() {
    if (
        isRunning
    ) {
        return;
    }


    isRunning =
        true;


    try {
        const publishedArticles =
            await articleService
                .publishDueScheduledArticles();


        if (
            publishedArticles.length >
            0
        ) {
            logger.info(
                `[Article Scheduler] Published ${publishedArticles.length} scheduled article(s).`,
            );
        }
    } catch (
    error
    ) {
        logger.error(
            "Article scheduler failed to publish scheduled articles.",
            error,
        );
    } finally {
        isRunning =
            false;
    }
}


export function startArticleScheduler() {
    logger.info(
        "Article scheduler started.",
    );


    void publishDueArticles();


    const interval =
        setInterval(
            () => {
                void publishDueArticles();
            },
            CHECK_INTERVAL_MS,
        );


    interval.unref();
}