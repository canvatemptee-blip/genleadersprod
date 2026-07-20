import { Request, Response } from "express";

import { ApiResponse } from "../../shared/utils/ApiResponse.js";

import { ArticleService } from "./article.service.js";

export class ArticleController {
    constructor(
        private readonly service = new ArticleService(),
    ) { }

    getPublished = async (
        req: Request,
        res: Response,
    ) => {
        const categoryParam = req.query.category;

        const category =
            typeof categoryParam === "string"
                ? categoryParam.trim()
                : undefined;

        const articles =
            await this.service.getPublishedArticles(
                category,
            );

        return res.json(
            ApiResponse.success(
                "Articles fetched successfully.",
                articles,
            ),
        );
    };

    getBySlug = async (
        req: Request,
        res: Response,
    ) => {
        const slugParam = req.params.slug;

        if (Array.isArray(slugParam)) {
            return res.status(400).json(
                ApiResponse.error(
                    "Invalid article slug.",
                ),
            );
        }

        const article =
            await this.service.getArticleBySlug(
                slugParam,
            );

        return res.json(
            ApiResponse.success(
                "Article fetched successfully.",
                article,
            ),
        );
    };

    create = async (
        req: Request,
        res: Response,
    ) => {
        const article =
            await this.service.createArticle(
                req.body,
                req.user!.id,
            );

        return res.status(201).json(
            ApiResponse.success(
                "Article created successfully.",
                article,
            ),
        );
    };

    getFeatured = async (
        _: Request,
        res: Response,
    ) => {
        const article =
            await this.service.getFeaturedArticle();

        return res.json(
            ApiResponse.success(
                "Featured article fetched successfully.",
                article,
            ),
        );
    };
}