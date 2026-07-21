import {
    BaseRepository,
} from "../../shared/utils/BaseRepository.js";

import {
    Article,
} from "./article.types.js";

import {
    CreateArticleDto,
} from "./article.validation.js";

export class ArticleRepository
    extends BaseRepository {

    async findAll(): Promise<Article[]> {
        const result =
            await this.db.query<Article>(
                `
                SELECT *
                FROM articles
                ORDER BY created_at DESC
                `,
            );

        return result.rows;
    }

    async findPublished(
        category?: string,
    ): Promise<Article[]> {
        const values:
            unknown[] = [];


        let categoryFilter =
            "";


        if (
            category
        ) {
            values.push(
                category,
            );


            categoryFilter =
                `
            AND LOWER(c.slug) =
                LOWER($1)
            `;
        }


        const result =
            await this.db.query<Article>(
                `
            SELECT
                a.id,
                a.title,
                a.slug,
                a.excerpt,
                a.cover_image,
                a.reading_time,
                a.published_at,

                c.name AS category,
                c.slug AS category_slug,

                ad.name AS author

            FROM articles a

            INNER JOIN categories c
                ON c.id = a.category_id

            INNER JOIN admins ad
                ON ad.id = a.author_id

            WHERE
                a.status = 'published'

                ${categoryFilter}

            ORDER BY
                a.published_at DESC
            `,
                values,
            );


        return result.rows;
    }

    async findById(
        id: number,
    ): Promise<Article | null> {
        return this.queryOne<Article>(
            `
            SELECT *
            FROM articles
            WHERE id = $1
            `,
            [id],
        );
    }

    async findBySlug(
        slug: string,
    ): Promise<Article | null> {
        return this.queryOne<Article>(
            `
            SELECT
                a.id,
                a.title,
                a.slug,
                a.excerpt,
                a.content,
                a.cover_image,
                a.reading_time,
                a.status,
                a.scheduled_at,
                a.published_at,

                c.name AS category,

                ad.name AS author

            FROM articles a

            INNER JOIN categories c
                ON c.id = a.category_id

            INNER JOIN admins ad
                ON ad.id = a.author_id

            WHERE a.slug = $1
            `,
            [slug],
        );
    }

    async create(
        data: CreateArticleDto,
        authorId: number,
        publishedAt: Date | null,
        scheduledAt: Date | null,
    ): Promise<Article> {
        return this.queryOne<Article>(
            `
            INSERT INTO articles (
                title,
                slug,
                excerpt,
                content,
                cover_image,
                author_id,
                category_id,
                reading_time,
                is_featured,
                status,
                scheduled_at,
                published_at
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11,
                $12
            )
            RETURNING *
            `,
            [
                data.title,
                data.slug,
                data.excerpt,
                JSON.stringify(
                    data.content,
                ),
                data.cover_image ??
                null,
                authorId,
                data.category_id,
                data.reading_time,
                data.is_featured,
                data.status,
                scheduledAt,
                publishedAt,
            ],
        ) as Promise<Article>;
    }

    async update(
        article: Article,
    ): Promise<Article> {
        const result =
            await this.db.query<Article>(
                `
                UPDATE articles
                SET
                    title = $1,
                    slug = $2,
                    excerpt = $3,
                    content = $4,
                    cover_image = $5,
                    category_id = $6,
                    reading_time = $7,
                    is_featured = $8,
                    status = $9,
                    scheduled_at = $10,
                    published_at = $11,
                    updated_at = NOW()
                WHERE id = $12
                RETURNING *
                `,
                [
                    article.title,
                    article.slug,
                    article.excerpt,
                    article.content,
                    article.cover_image,
                    article.category_id,
                    article.reading_time,
                    article.is_featured,
                    article.status,
                    article.scheduled_at,
                    article.published_at,
                    article.id,
                ],
            );

        return result.rows[0];
    }

    async delete(
        id: number,
    ): Promise<boolean> {
        const result =
            await this.db.query(
                `
                DELETE FROM articles
                WHERE id = $1
                `,
                [id],
            );

        return (
            result.rowCount === 1
        );
    }

    async findAllForAdmin():
        Promise<Article[]> {
        const result =
            await this.db.query<Article>(
                `
                SELECT *
                FROM articles
                ORDER BY updated_at DESC
                `,
            );

        return result.rows;
    }

    async findFeatured():
        Promise<Article | null> {
        return this.queryOne<Article>(
            `
            SELECT
                a.id,
                a.title,
                a.slug,
                a.excerpt,
                a.cover_image,
                a.reading_time,
                a.published_at,

                c.name AS category,

                ad.name AS author

            FROM articles a

            INNER JOIN categories c
                ON c.id = a.category_id

            INNER JOIN admins ad
                ON ad.id = a.author_id

            WHERE
                a.status = 'published'
                AND a.is_featured = TRUE

            ORDER BY
                a.published_at DESC

            LIMIT 1
            `,
        );
    }

    async publishDueScheduledArticles():
        Promise<Article[]> {
        const result =
            await this.db.query<Article>(
                `
            UPDATE articles
            SET
                status = 'published',
                published_at = scheduled_at,
                scheduled_at = NULL,
                updated_at = NOW()
            WHERE
                status = 'scheduled'
                AND scheduled_at IS NOT NULL
                AND scheduled_at <= NOW()
            RETURNING *
            `,
            );

        return result.rows;
    }
}