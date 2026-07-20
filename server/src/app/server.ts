import {
    createServer,
} from "node:http";

import app
    from "./app.js";

import {
    env,
} from "../config/env.js";

import {
    logger,
} from "../config/logger.js";

import {
    closeDatabase,
} from "../config/database.js";

import {
    startArticleScheduler,
} from "../jobs/publishScheduledArticles.job.js";

import {
    startNewsletterCleanupJob,
} from "../jobs/cleanupNewsletterState.job.js";


export function startServer() {
    const server =
        createServer(
            app,
        );


    let isShuttingDown =
        false;


    server.listen(
        env.PORT,
        () => {
            logger.info(
                `GenLeaders API running on http://localhost:${env.PORT}`,
            );


            startArticleScheduler();


            startNewsletterCleanupJob();
        },
    );


    const shutdown =
        async (
            signal:
                NodeJS.Signals,
        ) => {
            if (
                isShuttingDown
            ) {
                return;
            }


            isShuttingDown =
                true;


            logger.info(
                `${signal} received. Starting graceful shutdown...`,
            );


            server.close(
                async (
                    error,
                ) => {
                    if (
                        error
                    ) {
                        logger.error(
                            "HTTP server failed to close cleanly.",
                            error,
                        );


                        process.exitCode =
                            1;
                    } else {
                        logger.info(
                            "HTTP server closed.",
                        );
                    }


                    try {
                        await closeDatabase();
                    } catch (
                    error
                    ) {
                        logger.error(
                            "PostgreSQL pool failed to close cleanly.",
                            error,
                        );


                        process.exitCode =
                            1;
                    }


                    logger.info(
                        "Graceful shutdown complete.",
                    );
                },
            );
        };


    process.once(
        "SIGINT",
        () => {
            void shutdown(
                "SIGINT",
            );
        },
    );


    process.once(
        "SIGTERM",
        () => {
            void shutdown(
                "SIGTERM",
            );
        },
    );
}