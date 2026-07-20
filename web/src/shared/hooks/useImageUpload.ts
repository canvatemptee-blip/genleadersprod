import {
    useMutation,
} from "@tanstack/react-query";

import {
    uploadApi,
} from "../api/uploads";

export function useImageUpload() {
    return useMutation({
        mutationFn: (
            file: File,
        ) =>
            uploadApi.uploadImage(
                file,
            ),
    });
}