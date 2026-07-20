export const QUERY_KEYS = {
    articles: (
        category?: string,
    ) =>
        category
            ? [
                "articles",
                {
                    category,
                },
            ] as const
            : [
                "articles",
            ] as const,


    article: (
        slug: string,
    ) =>
        [
            "articles",
            slug,
        ] as const,


    featuredArticle:
        [
            "featured-article",
        ] as const,


    categories:
        [
            "categories",
        ] as const,


    auth:
        [
            "auth",
        ] as const,


    newsletter:
        [
            "newsletter",
        ] as const,


    adminArticles:
        [
            "admin",
            "articles",
        ] as const,


    adminArticle: (
        id: number,
    ) =>
        [
            "admin",
            "articles",
            id,
        ] as const,


    adminNewsletter:
        [
            "admin",
            "newsletter",
        ] as const,


    adminStaff:
        [
            "admin",
            "staff",
        ] as const,


    adminStaffAccount: (
        id: number,
    ) =>
        [
            "admin",
            "staff",
            id,
        ] as const,
} as const;