export const ROUTES = {
    HOME:
        "/",

    ARTICLES:
        "/articles",

    PODCASTS:
        "/podcasts",

    ABOUT:
        "/about",

    NEWSLETTER_VERIFY:
        "/newsletter/verify",

    NEWSLETTER_UNSUBSCRIBE:
        "/newsletter/unsubscribe",

    ADMIN_LOGIN:
        "/admin/login",

    ADMIN:
        "/admin",

    ADMIN_ARTICLES:
        "/admin/articles",

    ADMIN_ARTICLE_NEW:
        "/admin/articles/new",

    ADMIN_ARTICLE_EDIT: (
        id: number | string,
    ) =>
        `/admin/articles/${id}/edit`,

    ADMIN_CATEGORIES:
        "/admin/categories",

    ADMIN_NEWSLETTER:
        "/admin/newsletter",

    ADMIN_STAFF:
        "/admin/staff",
} as const;