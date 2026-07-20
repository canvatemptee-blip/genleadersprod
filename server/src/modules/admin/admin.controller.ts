import { Request, Response } from "express";

import { ApiResponse } from "../../shared/utils/ApiResponse.js";
import { ArticleService } from "../article/article.service.js";

import { NewsletterService } from "../newsletter/newsletter.service.js";

import { AdminService } from "./admin.service.js";

export class AdminController {
    constructor(
        private readonly articleService = new ArticleService(),
        private readonly newsletterService = new NewsletterService(),
        private readonly adminService = new AdminService(),
    ) { }

    getArticles = async (_: Request, res: Response) => {
        const articles =
            await this.articleService.getAllArticles();

        return res.json(
            ApiResponse.success(
                "Articles fetched successfully.",
                articles,
            ),
        );
    };

    getArticle = async (
        req: Request,
        res: Response,
    ) => {
        const id = Number(req.params.id);

        const article =
            await this.articleService.getArticleById(id);

        return res.json(
            ApiResponse.success(
                "Article fetched successfully.",
                article,
            ),
        );
    };

    updateArticle = async (
        req: Request,
        res: Response,
    ) => {
        const id = Number(req.params.id);

        const article =
            await this.articleService.updateArticle(
                id,
                req.body,
            );

        return res.json(
            ApiResponse.success(
                "Article updated successfully.",
                article,
            ),
        );
    };

    deleteArticle = async (
        req: Request,
        res: Response,
    ) => {
        const id = Number(req.params.id);

        await this.articleService.deleteArticle(id);

        return res.json(
            ApiResponse.success(
                "Article deleted successfully.",
            ),
        );
    };

    getSubscribers = async (
        _: Request,
        res: Response,
    ) => {
        const subscribers =
            await this.newsletterService.getSubscribers();

        return res.json(
            ApiResponse.success(
                "Subscribers fetched successfully.",
                subscribers,
            ),
        );
    };

    deleteSubscriber = async (
        req: Request,
        res: Response,
    ) => {
        const id = Number(req.params.id);

        await this.newsletterService.deleteSubscriber(id);

        return res.json(
            ApiResponse.success(
                "Subscriber deleted successfully.",
            ),
        );
    };

    getStaffAccounts = async (
        _: Request,
        res: Response,
    ) => {
        const staff =
            await this.adminService.getStaffAccounts();

        return res.json(
            ApiResponse.success(
                "Staff accounts fetched successfully.",
                staff,
            ),
        );
    };

    getStaffAccount = async (
        req: Request,
        res: Response,
    ) => {
        const id =
            Number(req.params.id);

        const staff =
            await this.adminService.getStaffAccount(
                id,
            );

        return res.json(
            ApiResponse.success(
                "Staff account fetched successfully.",
                staff,
            ),
        );
    };

    createStaffAccount = async (
        req: Request,
        res: Response,
    ) => {
        const staff =
            await this.adminService.createStaffAccount(
                req.body,
                req.user!.id,
            );

        return res.status(201).json(
            ApiResponse.success(
                "Staff account created successfully.",
                staff,
            ),
        );
    };

    updateStaffRole = async (
        req: Request,
        res: Response,
    ) => {
        const id =
            Number(req.params.id);

        const staff =
            await this.adminService.updateStaffRole(
                id,
                req.body,
                req.user!.id,
            );

        return res.json(
            ApiResponse.success(
                "Staff role updated successfully.",
                staff,
            ),
        );
    };

    updateStaffStatus = async (
        req: Request,
        res: Response,
    ) => {
        const id =
            Number(req.params.id);

        const staff =
            await this.adminService.updateStaffStatus(
                id,
                req.body,
                req.user!.id,
            );

        return res.json(
            ApiResponse.success(
                "Staff account status updated successfully.",
                staff,
            ),
        );
    };
}