import { api } from "./api";
import { ENDPOINTS } from "./endpoints";

import type {
    LoginRequest,
    LoginResponse,
} from "@/types/auth";

export const authApi = {
    login(data: LoginRequest) {
        return api.post<LoginResponse>(
            ENDPOINTS.AUTH.LOGIN,
            data,
        );
    },
};