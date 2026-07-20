import { api } from "./api";
import { ENDPOINTS } from "./endpoints";

import type {
    AdminArticle,
} from "@/types/adminArticle";

import type {
    CreateArticlePayload,
    UpdateArticlePayload,
} from "@/types/articleEditor";

export const adminArticleApi = {
    getArticles() {
        return api.get<AdminArticle[]>(
            ENDPOINTS.ADMIN.ARTICLES.GET_ALL,
        );
    },

    getArticle(
        id: number,
    ) {
        return api.get<AdminArticle>(
            ENDPOINTS.ADMIN.ARTICLES.GET_BY_ID(
                id,
            ),
        );
    },

    createArticle(
        data: CreateArticlePayload,
    ) {
        return api.post<AdminArticle>(
            ENDPOINTS.ARTICLES.CREATE,
            data,
        );
    },

    updateArticle(
        id: number,
        data: UpdateArticlePayload,
    ) {
        return api.patch<AdminArticle>(
            ENDPOINTS.ADMIN.ARTICLES.UPDATE(
                id,
            ),
            data,
        );
    },

    deleteArticle(
        id: number,
    ) {
        return api.delete<unknown>(
            ENDPOINTS.ADMIN.ARTICLES.DELETE(
                id,
            ),
        );
    },
};