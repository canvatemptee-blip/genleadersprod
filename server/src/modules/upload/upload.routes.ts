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
    imageUpload,
} from "../../middleware/upload/imageUpload.js";

import {
    asyncHandler,
} from "../../shared/utils/asyncHandler.js";

import {
    UploadController,
} from "./upload.controller.js";


const router =
    Router();


const controller =
    new UploadController();


router.post(
    "/image",

    authenticate,

    authorizePermissions(
        "upload:create",
    ),

    imageUpload.single(
        "image",
    ),

    asyncHandler(
        controller.uploadArticleImage,
    ),
);


export default router;