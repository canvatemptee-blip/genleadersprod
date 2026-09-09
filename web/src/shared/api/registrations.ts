import {
    api,
} from "./api";

import {
    ENDPOINTS,
} from "./endpoints";

import type {
    RegistrationPayload,
} from "@/types/registration";


export const registrationsApi = {
    submit(
        data:
            RegistrationPayload,
    ) {
        return api.post<
            void
        >(
            ENDPOINTS.REGISTRATIONS.SUBMIT,
            data,
        );
    },
};
