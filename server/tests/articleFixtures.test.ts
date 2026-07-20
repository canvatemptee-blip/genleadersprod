import {
    describe,
    expect,
    it,
} from "vitest";

import {
    createAdminFixture,
} from "./helpers/adminFixtures.js";

import {
    createCategoryFixture,
} from "./helpers/categoryFixtures.js";

import {
    createArticleFixture,
} from "./helpers/articleFixtures.js";


describe(
    "article domain fixtures",
    () => {
        it(
            "creates a category fixture",
            async () => {
                const category =
                    await createCategoryFixture();


                expect(
                    category.id,
                ).toEqual(
                    expect.any(
                        Number,
                    ),
                );


                expect(
                    category.name,
                ).toContain(
                    "Test Category",
                );


                expect(
                    category.slug,
                ).toContain(
                    "test-category",
                );
            },
        );


        it(
            "creates a draft article fixture",
            async () => {
                const admin =
                    await createAdminFixture();


                const category =
                    await createCategoryFixture();


                const article =
                    await createArticleFixture({
                        authorId:
                            admin.id,

                        categoryId:
                            category.id,

                        status:
                            "draft",
                    });


                expect(
                    article,
                ).toMatchObject({
                    author_id:
                        admin.id,

                    category_id:
                        category.id,

                    status:
                        "draft",

                    is_featured:
                        false,

                    published_at:
                        null,

                    scheduled_at:
                        null,
                });
            },
        );


        it(
            "creates a published article with a publication timestamp",
            async () => {
                const admin =
                    await createAdminFixture();


                const category =
                    await createCategoryFixture();


                const article =
                    await createArticleFixture({
                        authorId:
                            admin.id,

                        categoryId:
                            category.id,

                        status:
                            "published",
                    });


                expect(
                    article.status,
                ).toBe(
                    "published",
                );


                expect(
                    article.published_at,
                ).not.toBeNull();
            },
        );


        it(
            "creates a scheduled article",
            async () => {
                const admin =
                    await createAdminFixture();


                const category =
                    await createCategoryFixture();


                const scheduledAt =
                    new Date(
                        Date.now() +
                        60 * 60 * 1000,
                    );


                const article =
                    await createArticleFixture({
                        authorId:
                            admin.id,

                        categoryId:
                            category.id,

                        status:
                            "scheduled",

                        scheduledAt,
                    });


                expect(
                    article.status,
                ).toBe(
                    "scheduled",
                );


                expect(
                    article.scheduled_at,
                ).not.toBeNull();


                expect(
                    article.published_at,
                ).toBeNull();
            },
        );
    },
);