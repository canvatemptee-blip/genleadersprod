import { ValidationError } from "../../shared/errors/ValidationError.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";

import { CategoryRepository } from "./category.repository.js";
import { CreateCategoryDto } from "./category.validation.js";

export class CategoryService {
    constructor(
        private readonly repository = new CategoryRepository(),
    ) { }

    async getAllCategories() {
        return this.repository.findAll();
    }

    async getCategoryById(id: number) {
        const category = await this.repository.findById(id);

        if (!category) {
            throw new NotFoundError("Category");
        }

        return category;
    }

    async createCategory(data: CreateCategoryDto) {
        const existing = await this.repository.findBySlug(data.slug);

        if (existing) {
            throw new ValidationError("Category slug already exists.");
        }

        return this.repository.create(data);
    }

    async updateCategory(
        id: number,
        data: CreateCategoryDto,
    ) {
        const existing = await this.repository.findById(id);

        if (!existing) {
            throw new NotFoundError("Category");
        }

        const duplicate = await this.repository.findBySlug(data.slug);

        if (duplicate && Number(duplicate.id) !== id) {
            throw new ValidationError(
                "Category slug already exists.",
            );
        }

        return this.repository.update(id, data);
    }

    async deleteCategory(
        id: number,
    ) {
        const existing = await this.repository.findById(id);

        if (!existing) {
            throw new NotFoundError("Category");
        }

        await this.repository.delete(id);
    }
}