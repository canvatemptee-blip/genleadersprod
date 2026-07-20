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
    CategoryController,
} from "./category.controller.js";

import {
    createCategorySchema,
} from "./category.validation.js";


const router =
    Router();


const controller =
    new CategoryController();


router.get(
    "/",
    asyncHandler(
        controller.getAll,
    ),
);


router.get(
    "/:id",
    asyncHandler(
        controller.getById,
    ),
);


router.post(
    "/",

    authenticate,

    authorizePermissions(
        "category:manage",
    ),

    validate(
        createCategorySchema,
    ),

    asyncHandler(
        controller.create,
    ),
);


router.patch(
    "/:id",

    authenticate,

    authorizePermissions(
        "category:manage",
    ),

    validate(
        createCategorySchema,
    ),

    asyncHandler(
        controller.update,
    ),
);


router.delete(
    "/:id",

    authenticate,

    authorizePermissions(
        "category:manage",
    ),

    asyncHandler(
        controller.delete,
    ),
);


export default router;