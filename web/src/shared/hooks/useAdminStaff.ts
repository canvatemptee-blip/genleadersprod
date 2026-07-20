import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    adminStaffApi,
} from "../api/adminStaff";

import {
    QUERY_KEYS,
} from "../services/queryKeys";

import type {
    CreateStaffPayload,
    UpdateStaffRolePayload,
    UpdateStaffStatusPayload,
} from "@/types/staff";


export function useAdminStaff() {
    return useQuery({
        queryKey:
            QUERY_KEYS.adminStaff,

        queryFn:
            adminStaffApi.getStaffAccounts,
    });
}


export function useAdminStaffAccount(
    id: number,
) {
    return useQuery({
        queryKey:
            QUERY_KEYS.adminStaffAccount(
                id,
            ),

        queryFn: () =>
            adminStaffApi.getStaffAccount(
                id,
            ),

        enabled:
            Number.isInteger(
                id,
            ) &&
            id > 0,
    });
}


export function useCreateStaffAccount() {
    const queryClient =
        useQueryClient();


    return useMutation({
        mutationFn: (
            data:
                CreateStaffPayload,
        ) =>
            adminStaffApi.createStaffAccount(
                data,
            ),


        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.adminStaff,
            });
        },
    });
}


export function useUpdateStaffRole() {
    const queryClient =
        useQueryClient();


    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;

            data:
            UpdateStaffRolePayload;
        }) =>
            adminStaffApi.updateStaffRole(
                id,
                data,
            ),


        onSuccess: async (
            staff,
        ) => {
            queryClient.setQueryData(
                QUERY_KEYS.adminStaffAccount(
                    staff.id,
                ),
                staff,
            );


            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.adminStaff,
            });
        },
    });
}


export function useUpdateStaffStatus() {
    const queryClient =
        useQueryClient();


    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;

            data:
            UpdateStaffStatusPayload;
        }) =>
            adminStaffApi.updateStaffStatus(
                id,
                data,
            ),


        onSuccess: async (
            staff,
        ) => {
            queryClient.setQueryData(
                QUERY_KEYS.adminStaffAccount(
                    staff.id,
                ),
                staff,
            );


            await queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.adminStaff,
            });
        },
    });
}