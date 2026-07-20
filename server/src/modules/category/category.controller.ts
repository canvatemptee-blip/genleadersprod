import { Request, Response } from "express";

import { ApiResponse } from "../../shared/utils/ApiResponse.js";

import { CategoryService } from "./category.service.js";

export class CategoryController {
    constructor(
        private readonly service = new CategoryService(),
    ) { }

    getAll = async (_: Request, res: Response) => {
        const categories = await this.service.getAllCategories();

        return res.json(
            ApiResponse.success(
                "Categories fetched successfully.",
                categories,
            ),
        );
    };

    getById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const category = await this.service.getCategoryById(id);

        return res.json(
            ApiResponse.success(
                "Category fetched successfully.",
                category,
            ),
        );
    };

    create = async (req: Request, res: Response) => {
        const category = await this.service.createCategory(req.body);

        return res.status(201).json(
            ApiResponse.success(
                "Category created successfully.",
                category,
            ),
        );
    };

    update = async (req: Request, res: Response) => {
        const category =
            await this.service.updateCategory(
                Number(req.params.id),
                req.body,
            );

        return res.json(
            ApiResponse.success(
                "Category updated successfully.",
                category,
            ),
        );
    };

    delete = async (req: Request, res: Response) => {
        await this.service.deleteCategory(
            Number(req.params.id),
        );

        return res.json(
            ApiResponse.success(
                "Category deleted successfully.",
            ),
        );
    };
}