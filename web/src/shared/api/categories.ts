import {
    api,
} from "./api";

import {
    ENDPOINTS,
} from "./endpoints";

import type {
    Category,
    CategoryPayload,
} from "@/types/category";


export const categoryApi = {
    getCategories() {
        return api.get<
            Category[]
        >(
            ENDPOINTS.CATEGORIES.GET_ALL,
        );
    },


    getCategoryById(
        id: number,
    ) {
        return api.get<
            Category
        >(
            ENDPOINTS.CATEGORIES.GET_BY_ID(
                id,
            ),
        );
    },


    createCategory(
        data: CategoryPayload,
    ) {
        return api.post<
            Category
        >(
            ENDPOINTS.CATEGORIES.CREATE,
            data,
        );
    },


    updateCategory(
        id: number,
        data: CategoryPayload,
    ) {
        return api.patch<
            Category
        >(
            ENDPOINTS.CATEGORIES.UPDATE(
                id,
            ),
            data,
        );
    },


    deleteCategory(
        id: number,
    ) {
        return api.delete<
            void
        >(
            ENDPOINTS.CATEGORIES.DELETE(
                id,
            ),
        );
    },
};