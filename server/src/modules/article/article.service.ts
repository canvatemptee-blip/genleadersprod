import {
    NotFoundError,
} from "../../shared/errors/NotFoundError.js";

import {
    ValidationError,
} from "../../shared/errors/ValidationError.js";

import {
    CategoryRepository,
} from "../category/category.repository.js";

import {
    ArticleRepository,
} from "./article.repository.js";

import type {
    Article,
} from "./article.types.js";

import {
    CreateArticleDto,
    UpdateArticleDto,
} from "./article.validation.js";

export class ArticleService {
    constructor(
        private readonly repository =
            new ArticleRepository(),

        private readonly categoryRepository =
            new CategoryRepository(),
    ) { }

    async getPublishedArticles(
        category?: string,
    ) {
        return this.repository
            .findPublished(
                category,
            );
    }

    async getArticleBySlug(
        slug: string,
    ) {
        const article =
            await this.repository
                .findBySlug(slug);

        if (
            !article ||
            article.status !==
            "published"
        ) {
            throw new NotFoundError(
                "Article",
            );
        }

        return article;
    }

    async createArticle(
        dto: CreateArticleDto,
        authorId: number,
    ) {
        await this.validateCategory(
            dto.category_id,
        );

        const existing =
            await this.repository
                .findBySlug(
                    dto.slug,
                );

        if (existing) {
            throw new ValidationError(
                "Slug already exists.",
            );
        }

        const now =
            new Date();

        let publishedAt:
            Date | null = null;

        let scheduledAt:
            Date | null = null;

        if (
            dto.status ===
            "published"
        ) {
            publishedAt = now;
        }

        if (
            dto.status ===
            "scheduled"
        ) {
            if (
                !dto.scheduled_at
            ) {
                throw new ValidationError(
                    "Scheduled date and time are required.",
                );
            }

            scheduledAt =
                new Date(
                    dto.scheduled_at,
                );

            this.validateFutureSchedule(
                scheduledAt,
            );
        }

        dto.featured_person_name =
            dto.featured_person_name?.trim() || null;

        dto.featured_person_linkedin =
            dto.featured_person_linkedin?.trim() || null;

        return this.repository.create(
            dto,
            authorId,
            publishedAt,
            scheduledAt,
        );
    }

    async updateArticle(
        id: number,
        dto: UpdateArticleDto,
    ) {
        const article =
            await this.repository
                .findById(id);

        if (!article) {
            throw new NotFoundError(
                "Article",
            );
        }

        if (
            dto.category_id &&
            dto.category_id !==
            article.category_id
        ) {
            await this.validateCategory(
                dto.category_id,
            );
        }

        if (
            dto.slug &&
            dto.slug !==
            article.slug
        ) {
            const existing =
                await this.repository
                    .findBySlug(
                        dto.slug,
                    );

            if (
                existing &&
                Number(
                    existing.id,
                ) !==
                Number(
                    article.id,
                )
            ) {
                throw new ValidationError(
                    "Slug already exists.",
                );
            }
        }

        dto.featured_person_name =
            dto.featured_person_name?.trim() || null;

        dto.featured_person_linkedin =
            dto.featured_person_linkedin?.trim() || null;

        const updated:
            Article = {
            ...article,
            ...dto,

            scheduled_at:
                dto.scheduled_at !==
                    undefined
                    ? dto.scheduled_at
                        ? new Date(
                            dto.scheduled_at,
                        )
                        : null
                    : article.scheduled_at,
        };

        this.applyLifecycleTransition(
            article,
            updated,
        );

        return this.repository.update(
            updated,
        );
    }

    async deleteArticle(
        id: number,
    ) {
        const article =
            await this.repository
                .findById(id);

        if (!article) {
            throw new NotFoundError(
                "Article",
            );
        }

        const deleted =
            await this.repository
                .delete(id);

        if (!deleted) {
            throw new ValidationError(
                "Failed to delete article.",
            );
        }
    }

    async getAllArticles() {
        return this.repository
            .findAllForAdmin();
    }

    async getArticleById(
        id: number,
    ) {
        const article =
            await this.repository
                .findById(id);

        if (!article) {
            throw new NotFoundError(
                "Article",
            );
        }

        return article;
    }

    async getFeaturedArticle() {
        return this.repository
            .findFeatured();
    }

    private async validateCategory(
        categoryId: number,
    ) {
        const category =
            await this.categoryRepository
                .findById(
                    categoryId,
                );

        if (!category) {
            throw new ValidationError(
                "Category does not exist.",
            );
        }
    }

    private validateFutureSchedule(
        scheduledAt: Date,
    ) {
        if (
            Number.isNaN(
                scheduledAt.getTime(),
            )
        ) {
            throw new ValidationError(
                "Invalid scheduled date and time.",
            );
        }

        if (
            scheduledAt <= new Date()
        ) {
            throw new ValidationError(
                "Scheduled date and time must be in the future.",
            );
        }
    }

    private applyLifecycleTransition(
        original: Article,
        updated: Article,
    ) {
        switch (
        updated.status
        ) {
            case "draft":
                updated.scheduled_at =
                    null;

                break;

            case "scheduled":
                if (
                    !updated.scheduled_at
                ) {
                    throw new ValidationError(
                        "Scheduled date and time are required.",
                    );
                }

                this.validateFutureSchedule(
                    new Date(
                        updated.scheduled_at,
                    ),
                );

                updated.published_at =
                    null;

                break;

            case "published":
                updated.scheduled_at =
                    null;

                if (
                    original.status !==
                    "published" ||
                    !original.published_at
                ) {
                    updated.published_at =
                        new Date();
                }

                break;

            case "archived":
                updated.scheduled_at =
                    null;

                break;
        }
    }

    async publishDueScheduledArticles() {
        return this.repository
            .publishDueScheduledArticles();
    }
}