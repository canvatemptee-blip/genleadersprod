import {
    Router,
} from "express";

import {
    HealthController,
} from "./health.controller.js";


const router =
    Router();


const controller =
    new HealthController();


router.get(
    "/",
    controller.live,
);


router.get(
    "/live",
    controller.live,
);


router.get(
    "/ready",
    controller.ready,
);


export default router;