export const ENDPOINTS = {
    AUTH: {
        LOGIN:
            "/auth/login",

        REFRESH:
            "/auth/refresh",

        LOGOUT:
            "/auth/logout",

        ME:
            "/auth/me",
    },


    ARTICLES: {
        GET_ALL:
            "/articles",

        GET_BY_SLUG: (
            slug: string,
        ) =>
            `/articles/${slug}`,

        FEATURED:
            "/articles/featured",

        CREATE:
            "/articles",
    },


    CATEGORIES: {
        GET_ALL:
            "/categories",

        GET_BY_ID: (
            id: number,
        ) =>
            `/categories/${id}`,

        CREATE:
            "/categories",

        UPDATE: (
            id: number,
        ) =>
            `/categories/${id}`,

        DELETE: (
            id: number,
        ) =>
            `/categories/${id}`,
    },


    NEWSLETTER: {
        SUBSCRIBE:
            "/newsletter/subscribe",

        RESEND_VERIFICATION:
            "/newsletter/resend-verification",

        VERIFY:
            "/newsletter/verify",

        UNSUBSCRIBE_REQUEST:
            "/newsletter/unsubscribe/request",

        UNSUBSCRIBE:
            "/newsletter/unsubscribe",
    },


    REGISTRATIONS: {
        SUBMIT:
            "/registrations",
    },


    ADMIN: {
        ARTICLES: {
            GET_ALL:
                "/admin/articles",

            GET_BY_ID: (
                id: number,
            ) =>
                `/admin/articles/${id}`,

            CREATE:
                "/admin/articles",

            UPDATE: (
                id: number,
            ) =>
                `/admin/articles/${id}`,

            DELETE: (
                id: number,
            ) =>
                `/admin/articles/${id}`,
        },


        NEWSLETTER: {
            GET_ALL:
                "/admin/newsletter",

            DELETE: (
                id: number,
            ) =>
                `/admin/newsletter/${id}`,
        },


        REGISTRATIONS: {
            GET_ALL:
                "/admin/registrations",

            GET_BY_ID: (
                id: number,
            ) =>
                `/admin/registrations/${id}`,

            UPDATE_STATUS: (
                id: number,
            ) =>
                `/admin/registrations/${id}/status`,

            DELETE: (
                id: number,
            ) =>
                `/admin/registrations/${id}`,
        },


        STAFF: {
            GET_ALL:
                "/admin/staff",

            GET_BY_ID: (
                id: number,
            ) =>
                `/admin/staff/${id}`,

            CREATE:
                "/admin/staff",

            UPDATE_ROLE: (
                id: number,
            ) =>
                `/admin/staff/${id}/role`,

            UPDATE_STATUS: (
                id: number,
            ) =>
                `/admin/staff/${id}/status`,
        },
    },


    UPLOADS: {
        IMAGE:
            "/uploads/image",
    },
} as const;