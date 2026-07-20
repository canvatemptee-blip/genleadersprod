import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    categoryApi,
} from "@/shared/api/categories";

import {
    QUERY_KEYS,
} from "@/shared/services/queryKeys";

import type {
    CategoryPayload,
} from "@/types/category";


export function useCategories() {
    return useQuery({
        queryKey:
            QUERY_KEYS.categories,

        queryFn:
            categoryApi.getCategories,
    });
}


export function useCreateCategory() {
    const queryClient =
        useQueryClient();


    return useMutation({
        mutationFn: (
            data:
                CategoryPayload,
        ) =>
            categoryApi.createCategory(
                data,
            ),


        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.categories,
            });
        },
    });
}


export function useUpdateCategory() {
    const queryClient =
        useQueryClient();


    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;

            data:
            CategoryPayload;
        }) =>
            categoryApi.updateCategory(
                id,
                data,
            ),


        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.categories,
            });


            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.articles(),
            });
        },
    });
}


export function useDeleteCategory() {
    const queryClient =
        useQueryClient();


    return useMutation({
        mutationFn: (
            id: number,
        ) =>
            categoryApi.deleteCategory(
                id,
            ),


        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.categories,
            });


            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.articles(),
            });
        },
    });
}