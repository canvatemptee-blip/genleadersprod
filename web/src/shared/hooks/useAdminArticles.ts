import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    adminArticleApi,
} from "../api/adminArticles";

import {
    QUERY_KEYS,
} from "../services/queryKeys";

import type {
    CreateArticlePayload,
    UpdateArticlePayload,
} from "@/types/articleEditor";

async function invalidateArticleQueries(
    queryClient: ReturnType<
        typeof useQueryClient
    >,
) {
    await Promise.all([
        queryClient.invalidateQueries({
            queryKey:
                QUERY_KEYS.adminArticles,
        }),

        queryClient.invalidateQueries({
            queryKey:
                ["articles"],
        }),

        queryClient.invalidateQueries({
            queryKey:
                QUERY_KEYS.featuredArticle,
        }),
    ]);
}

export function useAdminArticles() {
    return useQuery({
        queryKey:
            QUERY_KEYS.adminArticles,

        queryFn:
            adminArticleApi.getArticles,
    });
}

export function useAdminArticle(
    id: number,
) {
    return useQuery({
        queryKey:
            QUERY_KEYS.adminArticle(id),

        queryFn: () =>
            adminArticleApi.getArticle(
                id,
            ),

        enabled:
            Number.isInteger(id) &&
            id > 0,
    });
}

export function useCreateAdminArticle() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            data: CreateArticlePayload,
        ) =>
            adminArticleApi.createArticle(
                data,
            ),

        onSuccess: async () => {
            await invalidateArticleQueries(
                queryClient,
            );
        },
    });
}

export function useUpdateAdminArticle(
    id: number,
) {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            data: UpdateArticlePayload,
        ) =>
            adminArticleApi.updateArticle(
                id,
                data,
            ),

        onSuccess: async (
            article,
        ) => {
            queryClient.setQueryData(
                QUERY_KEYS.adminArticle(id),
                article,
            );

            await invalidateArticleQueries(
                queryClient,
            );
        },
    });
}

export function useDeleteAdminArticle() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            id: number,
        ) =>
            adminArticleApi.deleteArticle(
                id,
            ),

        onSuccess: async () => {
            await invalidateArticleQueries(
                queryClient,
            );
        },
    });
}