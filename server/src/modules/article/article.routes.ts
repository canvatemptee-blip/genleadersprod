import {
    Router,
} from "express";

import {
    authenticate,
} from "../../middleware/auth/authenticate.js";

import {
    authorizePermissions,
} from "../../middleware/auth/authorizePermissions.js";

import {
    validate,
} from "../../middleware/validate.js";

import {
    asyncHandler,
} from "../../shared/utils/asyncHandler.js";

import {
    ArticleController,
} from "./article.controller.js";

import {
    createArticleSchema,
} from "./article.validation.js";


const router =
    Router();


const controller =
    new ArticleController();


router.get(
    "/",
    asyncHandler(
        controller.getPublished,
    ),
);


router.get(
    "/featured",
    asyncHandler(
        controller.getFeatured,
    ),
);


router.get(
    "/:slug",
    asyncHandler(
        controller.getBySlug,
    ),
);


router.post(
    "/",

    authenticate,

    authorizePermissions(
        "article:create",
    ),

    validate(
        createArticleSchema,
    ),

    asyncHandler(
        controller.create,
    ),
);


export default router;