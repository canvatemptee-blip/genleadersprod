import {
    useMutation,
} from "@tanstack/react-query";

import {
    registrationsApi,
} from "@/shared/api/registrations";


export function useSubmitRegistration() {
    return useMutation({
        mutationFn:
            registrationsApi.submit,
    });
}
