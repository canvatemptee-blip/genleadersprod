import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth";
import { authToken } from "../services/authToken";

export function useLogin() {
    return useMutation({
        mutationFn: authApi.login,

        onSuccess: (data) => {
            authToken.set(
                data.accessToken,
            );
        },
    });
}