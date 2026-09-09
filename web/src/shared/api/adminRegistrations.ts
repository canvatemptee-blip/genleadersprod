import {
    api,
} from "./api";

import {
    ENDPOINTS,
} from "./endpoints";

import type {
    Registration,
    UpdateRegistrationStatusPayload,
} from "@/types/registration";


export const adminRegistrationsApi = {
    getRegistrations() {
        return api.get<
            Registration[]
        >(
            ENDPOINTS.ADMIN.REGISTRATIONS.GET_ALL,
        );
    },


    updateStatus({
        id,
        status,
    }: UpdateRegistrationStatusPayload) {
        return api.patch<
            Registration
        >(
            ENDPOINTS.ADMIN.REGISTRATIONS.UPDATE_STATUS(
                id,
            ),
            {
                status,
            },
        );
    },


    deleteRegistration(
        id: number,
    ) {
        return api.delete<
            void
        >(
            ENDPOINTS.ADMIN.REGISTRATIONS.DELETE(
                id,
            ),
        );
    },
};
