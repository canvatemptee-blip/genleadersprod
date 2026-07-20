import request
    from "supertest";

import {
    describe,
    expect,
    it,
} from "vitest";

import app
    from "../src/app/app.js";

import {
    createAdminFixture,
} from "./helpers/adminFixtures.js";

import {
    createCategoryFixture,
} from "./helpers/categoryFixtures.js";

import {
    createArticleFixture,
} from "./helpers/articleFixtures.js";

import {
    loginAs,
} from "./helpers/authHelpers.js";


describe(
    "article publication lifecycle",
    () => {
        it(
            "creates a draft article through the authenticated API",
            async () => {
                const admin =
                    await createAdminFixture({
                        role:
                            "intern",
                    });


                const category =
                    await createCategoryFixture();


                const token =
                    await loginAs({
                        email:
                            admin.email,

                        password:
                            admin.password,
                    });


                const response =
                    await request(
                        app,
                    )
                        .post(
                            "/api/articles",
                        )
                        .set(
                            "Authorization",
                            `Bearer ${token}`,
                        )
                        .send({
                            title:
                                "The Future of Leadership",

                            slug:
                                "the-future-of-leadership",

                            excerpt:
                                "A practical exploration of how modern leadership is changing.",

                            content: {
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
                                                    "Leadership is evolving.",
                                            },
                                        ],
                                    },
                                ],
                            },

                            cover_image:
                                null,

                            category_id:
                                category.id,

                            reading_time:
                                6,

                            is_featured:
                                false,

                            status:
                                "draft",
                        });


                expect(
                    response.status,
                ).toBe(
                    201,
                );


                expect(
                    response.body.success,
                ).toBe(
                    true,
                );


                expect(
                    response.body.data,
                ).toMatchObject({
                    title:
                        "The Future of Leadership",

                    slug:
                        "the-future-of-leadership",

                    status:
                        "draft",

                    is_featured:
                        false,
                });


                expect(
                    response.body.data
                        .published_at,
                ).toBeNull();


                expect(
                    response.body.data
                        .scheduled_at,
                ).toBeNull();
            },
        );


        it(
            "does not expose a draft article through the public article collection",
            async () => {
                const admin =
                    await createAdminFixture();


                const category =
                    await createCategoryFixture();


                const draft =
                    await createArticleFixture({
                        authorId:
                            admin.id,

                        categoryId:
                            category.id,

                        status:
                            "draft",
                    });


                const response =
                    await request(
                        app,
                    )
                        .get(
                            "/api/articles",
                        );


                expect(
                    response.status,
                ).toBe(
                    200,
                );


                const articles =
                    response.body.data;


                expect(
                    Array.isArray(
                        articles,
                    ),
                ).toBe(
                    true,
                );


                expect(
                    articles.some(
                        (
                            article: {
                                id:
                                number |
                                string;
                            },
                        ) =>
                            Number(
                                article.id,
                            ) ===
                            Number(
                                draft.id,
                            ),
                    ),
                ).toBe(
                    false,
                );
            },
        );


        it(
            "does not expose a draft article through the public slug endpoint",
            async () => {
                const admin =
                    await createAdminFixture();


                const category =
                    await createCategoryFixture();


                const draft =
                    await createArticleFixture({
                        authorId:
                            admin.id,

                        categoryId:
                            category.id,

                        status:
                            "draft",

                        slug:
                            "private-draft-article",
                    });


                const response =
                    await request(
                        app,
                    )
                        .get(
                            `/api/articles/${draft.slug}`,
                        );


                expect(
                    response.status,
                ).toBe(
                    404,
                );
            },
        );


        it(
            "publishes an existing draft article",
            async () => {
                const admin =
                    await createAdminFixture({
                        role:
                            "intern",
                    });


                const category =
                    await createCategoryFixture();


                const draft =
                    await createArticleFixture({
                        authorId:
                            admin.id,

                        categoryId:
                            category.id,

                        status:
                            "draft",

                        slug:
                            "draft-becoming-published",
                    });


                const token =
                    await loginAs({
                        email:
                            admin.email,

                        password:
                            admin.password,
                    });


                const beforePublication =
                    new Date();


                const response =
                    await request(
                        app,
                    )
                        .patch(
                            `/api/admin/articles/${draft.id}`,
                        )
                        .set(
                            "Authorization",
                            `Bearer ${token}`,
                        )
                        .send({
                            status:
                                "published",
                        });


                const afterPublication =
                    new Date();


                expect(
                    response.status,
                ).toBe(
                    200,
                );


                expect(
                    response.body.data
                        .status,
                ).toBe(
                    "published",
                );


                expect(
                    response.body.data
                        .scheduled_at,
                ).toBeNull();


                expect(
                    response.body.data
                        .published_at,
                ).not.toBeNull();


                const publishedAt =
                    new Date(
                        response.body.data
                            .published_at,
                    );


                expect(
                    publishedAt.getTime(),
                ).toBeGreaterThanOrEqual(
                    beforePublication.getTime(),
                );


                expect(
                    publishedAt.getTime(),
                ).toBeLessThanOrEqual(
                    afterPublication.getTime(),
                );
            },
        );


        it(
            "makes an article publicly accessible after publication",
            async () => {
                const admin =
                    await createAdminFixture({
                        role:
                            "intern",
                    });


                const category =
                    await createCategoryFixture();


                const draft =
                    await createArticleFixture({
                        authorId:
                            admin.id,

                        categoryId:
                            category.id,

                        status:
                            "draft",

                        slug:
                            "public-after-publication",
                    });


                const token =
                    await loginAs({
                        email:
                            admin.email,

                        password:
                            admin.password,
                    });


                const beforeResponse =
                    await request(
                        app,
                    )
                        .get(
                            `/api/articles/${draft.slug}`,
                        );


                expect(
                    beforeResponse.status,
                ).toBe(
                    404,
                );


                const publishResponse =
                    await request(
                        app,
                    )
                        .patch(
                            `/api/admin/articles/${draft.id}`,
                        )
                        .set(
                            "Authorization",
                            `Bearer ${token}`,
                        )
                        .send({
                            status:
                                "published",
                        });


                expect(
                    publishResponse.status,
                ).toBe(
                    200,
                );


                const afterResponse =
                    await request(
                        app,
                    )
                        .get(
                            `/api/articles/${draft.slug}`,
                        );


                expect(
                    afterResponse.status,
                ).toBe(
                    200,
                );


                expect(
                    Number(
                        afterResponse.body.data.id,
                    ),
                ).toBe(
                    Number(
                        draft.id,
                    ),
                );


                expect(
                    afterResponse.body.data,
                ).toMatchObject({
                    slug:
                        "public-after-publication",

                    status:
                        "published",
                });
            },
        );


        it(
            "creates a published article with a publication timestamp",
            async () => {
                const admin =
                    await createAdminFixture({
                        role:
                            "intern",
                    });


                const category =
                    await createCategoryFixture();


                const token =
                    await loginAs({
                        email:
                            admin.email,

                        password:
                            admin.password,
                    });


                const response =
                    await request(
                        app,
                    )
                        .post(
                            "/api/articles",
                        )
                        .set(
                            "Authorization",
                            `Bearer ${token}`,
                        )
                        .send({
                            title:
                                "Published Immediately",

                            slug:
                                "published-immediately",

                            excerpt:
                                "This article should become public immediately after creation.",

                            content: {
                                type:
                                    "doc",

                                content: [],
                            },

                            cover_image:
                                null,

                            category_id:
                                category.id,

                            reading_time:
                                4,

                            is_featured:
                                false,

                            status:
                                "published",
                        });


                expect(
                    response.status,
                ).toBe(
                    201,
                );


                expect(
                    response.body.data
                        .status,
                ).toBe(
                    "published",
                );


                expect(
                    response.body.data
                        .published_at,
                ).not.toBeNull();


                expect(
                    response.body.data
                        .scheduled_at,
                ).toBeNull();


                const publicResponse =
                    await request(
                        app,
                    )
                        .get(
                            "/api/articles/published-immediately",
                        );


                expect(
                    publicResponse.status,
                ).toBe(
                    200,
                );


                expect(
                    publicResponse.body.data,
                ).toMatchObject({
                    title:
                        "Published Immediately",

                    slug:
                        "published-immediately",

                    status:
                        "published",
                });
            },
        );
    },
);