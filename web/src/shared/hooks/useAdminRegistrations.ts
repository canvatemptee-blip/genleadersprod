import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    adminRegistrationsApi,
} from "@/shared/api/adminRegistrations";

import {
    QUERY_KEYS,
} from "@/shared/services/queryKeys";


export function useAdminRegistrations() {
    return useQuery({
        queryKey:
            QUERY_KEYS.adminRegistrations,

        queryFn:
            adminRegistrationsApi.getRegistrations,
    });
}


export function useUpdateRegistrationStatus() {
    const queryClient =
        useQueryClient();


    return useMutation({
        mutationFn:
            adminRegistrationsApi.updateStatus,


        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.adminRegistrations,
            });
        },
    });
}


export function useDeleteRegistration() {
    const queryClient =
        useQueryClient();


    return useMutation({
        mutationFn: (
            id: number,
        ) =>
            adminRegistrationsApi.deleteRegistration(
                id,
            ),


        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.adminRegistrations,
            });
        },
    });
}
