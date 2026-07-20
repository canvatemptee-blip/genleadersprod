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
    updateArticleSchema,
} from "../article/article.validation.js";

import {
    AdminController,
} from "./admin.controller.js";

import {
    createStaffSchema,
    updateStaffRoleSchema,
    updateStaffStatusSchema,
} from "./admin.validation.js";


const router =
    Router();


const controller =
    new AdminController();


router.use(
    authenticate,
);

router.get(
    "/staff",

    authorizePermissions(
        "staff:manage",
    ),

    asyncHandler(
        controller.getStaffAccounts,
    ),
);


router.get(
    "/staff/:id",

    authorizePermissions(
        "staff:manage",
    ),

    asyncHandler(
        controller.getStaffAccount,
    ),
);


router.post(
    "/staff",

    authorizePermissions(
        "staff:manage",
    ),

    validate(
        createStaffSchema,
    ),

    asyncHandler(
        controller.createStaffAccount,
    ),
);


router.patch(
    "/staff/:id/role",

    authorizePermissions(
        "staff:manage",
    ),

    validate(
        updateStaffRoleSchema,
    ),

    asyncHandler(
        controller.updateStaffRole,
    ),
);


router.patch(
    "/staff/:id/status",

    authorizePermissions(
        "staff:manage",
    ),

    validate(
        updateStaffStatusSchema,
    ),

    asyncHandler(
        controller.updateStaffStatus,
    ),
);

router.get(
    "/articles",

    authorizePermissions(
        "article:read",
    ),

    asyncHandler(
        controller.getArticles,
    ),
);


router.get(
    "/articles/:id",

    authorizePermissions(
        "article:read",
    ),

    asyncHandler(
        controller.getArticle,
    ),
);


router.patch(
    "/articles/:id",

    authorizePermissions(
        "article:update",
    ),

    validate(
        updateArticleSchema,
    ),

    asyncHandler(
        controller.updateArticle,
    ),
);


router.delete(
    "/articles/:id",

    authorizePermissions(
        "article:delete",
    ),

    asyncHandler(
        controller.deleteArticle,
    ),
);

router.get(
    "/newsletter",

    authorizePermissions(
        "newsletter:manage",
    ),

    asyncHandler(
        controller.getSubscribers,
    ),
);


router.delete(
    "/newsletter/:id",

    authorizePermissions(
        "newsletter:manage",
    ),

    asyncHandler(
        controller.deleteSubscriber,
    ),
);


export default router;