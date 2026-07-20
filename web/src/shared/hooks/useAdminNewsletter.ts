import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    adminNewsletterApi,
} from "@/shared/api/adminNewsletter";

import {
    QUERY_KEYS,
} from "@/shared/services/queryKeys";


export function useAdminNewsletter() {
    return useQuery({
        queryKey:
            QUERY_KEYS.adminNewsletter,

        queryFn:
            adminNewsletterApi.getSubscribers,
    });
}


export function useDeleteNewsletterSubscriber() {
    const queryClient =
        useQueryClient();


    return useMutation({
        mutationFn: (
            id: number,
        ) =>
            adminNewsletterApi.deleteSubscriber(
                id,
            ),


        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.adminNewsletter,
            });
        },
    });
}