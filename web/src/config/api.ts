const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
    throw new Error(
        "Missing VITE_API_URL environment variable. Please configure it before starting the application."
    );
}

export const API = {
    BASE_URL: apiUrl,
} as const;