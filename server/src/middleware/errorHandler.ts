import {
    NextFunction,
    Request,
    Response,
} from "express";

import multer from "multer";

import {
    ApiError,
} from "../shared/errors/ApiError.js";

import {
    logger,
} from "../config/logger.js";

export function errorHandler(
    error: Error,
    _: Request,
    res: Response,
    __: NextFunction,
) {

    if (
        error instanceof
        multer.MulterError
    ) {
        if (
            error.code ===
            "LIMIT_FILE_SIZE"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Image cannot exceed 5 MB.",
            });
        }

        if (
            error.code ===
            "LIMIT_FILE_COUNT"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Only one image can be uploaded at a time.",
            });
        }

        if (
            error.code ===
            "LIMIT_UNEXPECTED_FILE"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Unexpected upload field. Use the field name 'image'.",
            });
        }

        return res.status(400).json({
            success: false,
            message:
                "Invalid image upload request.",
        });
    }

    if (
        error.message ===
        "INVALID_IMAGE_TYPE"
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Only JPEG, PNG and WebP images are allowed.",
        });
    }

    if (
        error instanceof ApiError
    ) {
        return res
            .status(error.statusCode)
            .json({
                success: false,
                message:
                    error.message,
            });
    }

    logger.error(
        "Unhandled application error.",
        error,
    );

    return res.status(500).json({
        success: false,
        message:
            "Internal Server Error",
    });
}