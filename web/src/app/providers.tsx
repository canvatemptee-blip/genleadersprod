import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import {
    ReactQueryDevtools,
} from "@tanstack/react-query-devtools";

import { HelmetProvider } from "react-helmet-async";

import { AppRouter } from "./router";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchOnMount: false,
        },
        mutations: {
            retry: 0,
        },
    },
});

export function AppProviders() {
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <AppRouter />

                {import.meta.env.DEV && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </QueryClientProvider>
        </HelmetProvider>
    );
}