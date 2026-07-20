import {
    Request,
    Response,
} from "express";

import {
    ValidationError,
} from "../../shared/errors/ValidationError.js";

import {
    ApiResponse,
} from "../../shared/utils/ApiResponse.js";

import {
    UploadService,
} from "./upload.service.js";

export class UploadController {
    constructor(
        private readonly service =
            new UploadService(),
    ) { }

    uploadArticleImage = async (
        req: Request,
        res: Response,
    ) => {
        if (!req.file) {
            throw new ValidationError(
                "Image file is required.",
            );
        }

        const image =
            await this.service
                .uploadArticleImage(
                    req.file,
                );

        return res.status(201).json(
            ApiResponse.success(
                "Image uploaded successfully.",
                image,
            ),
        );
    };
}