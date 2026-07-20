import { api } from "./api";
import { ENDPOINTS } from "./endpoints";

import type { Article } from "@/types/article";

export const articleApi = {
    getArticles(
        category?: string,
    ) {
        const endpoint = category
            ? `${ENDPOINTS.ARTICLES.GET_ALL}?category=${encodeURIComponent(
                category,
            )}`
            : ENDPOINTS.ARTICLES.GET_ALL;

        return api.get<Article[]>(
            endpoint,
        );
    },

    getArticle(
        slug: string,
    ) {
        return api.get<Article>(
            ENDPOINTS.ARTICLES.GET_BY_SLUG(
                slug,
            ),
        );
    },

    getFeaturedArticle() {
        return api.get<Article>(
            ENDPOINTS.ARTICLES.FEATURED,
        );
    },
};