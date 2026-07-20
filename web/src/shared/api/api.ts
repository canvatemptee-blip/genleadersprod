const BASE_URL =
    import.meta.env.VITE_API_URL;

if (!BASE_URL) {
    throw new Error(
        "Missing VITE_API_URL."
    );
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface ApiErrorResponse {
    success: false;
    message: string;
}

class ApiClient {
    private async request<T>(
        endpoint: string,
        options: RequestInit = {},
    ): Promise<T> {
        const token =
            localStorage.getItem("token");

        const isFormData =
            options.body instanceof FormData;

        const response = await fetch(
            `${BASE_URL}${endpoint}`,
            {
                ...options,

                headers: {
                    ...(!isFormData && {
                        "Content-Type":
                            "application/json",
                    }),

                    ...(token && {
                        Authorization:
                            `Bearer ${token}`,
                    }),

                    ...options.headers,
                },
            },
        );

        let json:
            | ApiResponse<T>
            | ApiErrorResponse;

        try {
            json = await response.json();
        } catch {
            throw new Error(
                "The server returned an invalid response."
            );
        }

        return (
            json as ApiResponse<T>
        ).data;
    }

    get<T>(
        endpoint: string,
    ) {
        return this.request<T>(
            endpoint,
        );
    }

    post<T>(
        endpoint: string,
        body: unknown,
    ) {
        return this.request<T>(
            endpoint,
            {
                method: "POST",

                body:
                    JSON.stringify(
                        body,
                    ),
            },
        );
    }

    postForm<T>(
        endpoint: string,
        body: FormData,
    ) {
        return this.request<T>(
            endpoint,
            {
                method: "POST",
                body,
            },
        );
    }

    patch<T>(
        endpoint: string,
        body: unknown,
    ) {
        return this.request<T>(
            endpoint,
            {
                method: "PATCH",

                body:
                    JSON.stringify(
                        body,
                    ),
            },
        );
    }

    delete<T>(
        endpoint: string,
    ) {
        return this.request<T>(
            endpoint,
            {
                method: "DELETE",
            },
        );
    }
}

export const api =
    new ApiClient();