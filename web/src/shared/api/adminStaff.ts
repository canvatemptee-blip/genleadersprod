import {
    api,
} from "./api";

import {
    ENDPOINTS,
} from "./endpoints";

import type {
    CreateStaffPayload,
    StaffAccount,
    UpdateStaffRolePayload,
    UpdateStaffStatusPayload,
} from "@/types/staff";


export const adminStaffApi = {
    getStaffAccounts() {
        return api.get<
            StaffAccount[]
        >(
            ENDPOINTS.ADMIN.STAFF.GET_ALL,
        );
    },


    getStaffAccount(
        id: number,
    ) {
        return api.get<
            StaffAccount
        >(
            ENDPOINTS.ADMIN.STAFF.GET_BY_ID(
                id,
            ),
        );
    },


    createStaffAccount(
        data: CreateStaffPayload,
    ) {
        return api.post<
            StaffAccount
        >(
            ENDPOINTS.ADMIN.STAFF.CREATE,
            data,
        );
    },


    updateStaffRole(
        id: number,
        data: UpdateStaffRolePayload,
    ) {
        return api.patch<
            StaffAccount
        >(
            ENDPOINTS.ADMIN.STAFF.UPDATE_ROLE(
                id,
            ),
            data,
        );
    },


    updateStaffStatus(
        id: number,
        data: UpdateStaffStatusPayload,
    ) {
        return api.patch<
            StaffAccount
        >(
            ENDPOINTS.ADMIN.STAFF.UPDATE_STATUS(
                id,
            ),
            data,
        );
    },
};