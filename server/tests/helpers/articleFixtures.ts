import {
    db,
} from "../../src/config/database.js";

import type {
    ArticleStatus,
} from "../../src/modules/article/article.types.js";


let articleSequence = 0;


interface CreateArticleFixtureOptions {
    title?:
        string;

    slug?:
        string;

    excerpt?:
        string;

    content?:
        unknown;

    coverImage?:
        string | null;

    authorId:
        number;

    categoryId:
        number;

    readingTime?:
        number;

    isFeatured?:
        boolean;

    status?:
        ArticleStatus;

    scheduledAt?:
        Date | null;

    publishedAt?:
        Date | null;
}


export interface ArticleFixture {
    id:
        number;

    title:
        string;

    slug:
        string;

    excerpt:
        string;

    content:
        unknown;

    cover_image:
        string | null;

    author_id:
        number;

    category_id:
        number;

    reading_time:
        number;

    is_featured:
        boolean;

    status:
        ArticleStatus;

    scheduled_at:
        Date | null;

    published_at:
        Date | null;

    created_at:
        Date;

    updated_at:
        Date;
}


export async function createArticleFixture(
    options:
        CreateArticleFixtureOptions,
): Promise<ArticleFixture> {
    articleSequence += 1;


    const status =
        options.status ??
        "draft";


    const title =
        options.title ??
        `Test Article ${articleSequence}`;


    const slug =
        options.slug ??
        `test-article-${articleSequence}`;


    const excerpt =
        options.excerpt ??
        `Test article excerpt number ${articleSequence}.`;


    const content =
        options.content ?? {
            type:
                "doc",

            content: [
                {
                    type:
                        "paragraph",

                    content: [
                        {
                            type:
                                "text",

                            text:
                                `Test article content ${articleSequence}.`,
                        },
                    ],
                },
            ],
        };


    let publishedAt =
        options.publishedAt ??
        null;


    if (
        status === "published" &&
        options.publishedAt === undefined
    ) {
        publishedAt =
            new Date();
    }


    const result =
        await db.query<ArticleFixture>(
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
                $4::jsonb,
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
                title,

                slug,

                excerpt,

                JSON.stringify(
                    content,
                ),

                options.coverImage ??
                null,

                options.authorId,

                options.categoryId,

                options.readingTime ??
                5,

                options.isFeatured ??
                false,

                status,

                options.scheduledAt ??
                null,

                publishedAt,
            ],
        );


    return result.rows[0];
}