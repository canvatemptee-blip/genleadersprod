import {
    UploadApiResponse,
} from "cloudinary";

import {
    cloudinary,
} from "../../config/cloudinary.js";

export class UploadService {
    async uploadArticleImage(
        file: Express.Multer.File,
    ) {
        const result =
            await this.uploadBuffer(
                file.buffer,
            );

        return {
            url:
                result.secure_url,

            publicId:
                result.public_id,

            width:
                result.width,

            height:
                result.height,

            format:
                result.format,

            bytes:
                result.bytes,
        };
    }

    private uploadBuffer(
        buffer: Buffer,
    ): Promise<UploadApiResponse> {
        return new Promise(
            (
                resolve,
                reject,
            ) => {
                const stream =
                    cloudinary
                        .uploader
                        .upload_stream(
                            {
                                folder:
                                    "genleaders/articles",

                                resource_type:
                                    "image",
                            },
                            (
                                error,
                                result,
                            ) => {
                                if (
                                    error ||
                                    !result
                                ) {
                                    reject(
                                        error ??
                                        new Error(
                                            "Image upload failed.",
                                        ),
                                    );

                                    return;
                                }

                                resolve(
                                    result,
                                );
                            },
                        );

                stream.end(
                    buffer,
                );
            },
        );
    }
}