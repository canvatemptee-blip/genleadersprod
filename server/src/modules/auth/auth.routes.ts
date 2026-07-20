import { Router } from "express";

import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

import { AuthController } from "./auth.controller.js";
import { loginSchema } from "./auth.validation.js";

const router = Router();

const controller = new AuthController();

router.post(
    "/login",
    validate(loginSchema),
    asyncHandler(controller.login),
);

export default router;