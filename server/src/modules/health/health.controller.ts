import type {
    Request,
    Response,
} from "express";

import {
    HealthService,
} from "./health.service.js";


export class HealthController {
    constructor(
        private readonly service =
            new HealthService(),
    ) { }


    live = (
        _req: Request,
        res: Response,
    ) => {
        return res
            .status(
                200,
            )
            .json({
                success:
                    true,

                data:
                    this.service
                        .getLiveness(),
            });
    };


    ready = async (
        _req: Request,
        res: Response,
    ) => {
        try {
            const readiness =
                await this.service
                    .getReadiness();


            return res
                .status(
                    200,
                )
                .json({
                    success:
                        true,

                    data:
                        readiness,
                });
        } catch {
            return res
                .status(
                    503,
                )
                .json({
                    success:
                        false,

                    data: {
                        service:
                            "GenLeaders API",

                        status:
                            "not_ready",

                        dependencies: {
                            database:
                                "down",
                        },

                        timestamp:
                            new Date()
                                .toISOString(),
                    },
                });
        }
    };
}