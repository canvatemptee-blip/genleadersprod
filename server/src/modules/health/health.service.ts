import {
    HealthRepository,
} from "./health.repository.js";


export interface LivenessResult {
    service:
    string;

    status:
    "alive";

    version:
    string;

    uptimeSeconds:
    number;

    timestamp:
    string;
}


export interface ReadinessResult {
    service:
    string;

    status:
    "ready";

    dependencies: {
        database:
        "up";
    };

    timestamp:
    string;
}


export class HealthService {
    constructor(
        private readonly repository =
            new HealthRepository(),
    ) { }


    getLiveness():
        LivenessResult {
        return {
            service:
                "GenLeaders API",

            status:
                "alive",

            version:
                "1.0.0",

            uptimeSeconds:
                Math.floor(
                    process.uptime(),
                ),

            timestamp:
                new Date()
                    .toISOString(),
        };
    }


    async getReadiness():
        Promise<
            ReadinessResult
        > {
        await this.repository
            .checkDatabase();


        return {
            service:
                "GenLeaders API",

            status:
                "ready",

            dependencies: {
                database:
                    "up",
            },

            timestamp:
                new Date()
                    .toISOString(),
        };
    }
}