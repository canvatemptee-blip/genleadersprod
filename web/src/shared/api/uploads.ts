import { api } from "./api";
import { ENDPOINTS } from "./endpoints";

export interface UploadedImage {
    url: string;

    publicId: string;

    width: number;

    height: number;

    format: string;

    bytes: number;
}

export const uploadApi = {
    uploadImage(
        file: File,
    ) {
        const formData =
            new FormData();

        formData.append(
            "image",
            file,
        );

        return api.postForm<UploadedImage>(
            ENDPOINTS.UPLOADS.IMAGE,
            formData,
        );
    },
};