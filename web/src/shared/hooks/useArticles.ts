import { useQuery } from "@tanstack/react-query";

import { articleApi } from "../api/articles";
import { QUERY_KEYS } from "../services/queryKeys";

export function useArticles(
    category?: string,
) {
    return useQuery({
        queryKey:
            QUERY_KEYS.articles(category),

        queryFn: () =>
            articleApi.getArticles(
                category,
            ),
    });
}

export function useArticle(
    slug: string,
) {
    return useQuery({
        queryKey:
            QUERY_KEYS.article(slug),

        queryFn: () =>
            articleApi.getArticle(slug),

        enabled: Boolean(slug),
    });
}

export function useFeaturedArticle() {
    return useQuery({
        queryKey:
            QUERY_KEYS.featuredArticle,

        queryFn:
            articleApi.getFeaturedArticle,
    });
}