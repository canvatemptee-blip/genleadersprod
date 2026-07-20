import {
    useMutation,
} from "@tanstack/react-query";

import {
    newsletterApi,
} from "@/shared/api/newsletter";


export function useSubscribeNewsletter() {
    return useMutation({
        mutationFn:
            newsletterApi.subscribe,
    });
}


export function useResendNewsletterVerification() {
    return useMutation({
        mutationFn:
            newsletterApi.resendVerification,
    });
}


export function useVerifyNewsletter() {
    return useMutation({
        mutationFn:
            newsletterApi.verify,
    });
}


export function useRequestNewsletterUnsubscribe() {
    return useMutation({
        mutationFn:
            newsletterApi.requestUnsubscribe,
    });
}


export function useUnsubscribeNewsletter() {
    return useMutation({
        mutationFn:
            newsletterApi.unsubscribe,
    });
}