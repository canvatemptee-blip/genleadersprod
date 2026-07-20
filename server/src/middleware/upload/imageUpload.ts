import multer from "multer";

const MAX_IMAGE_SIZE =
    5 * 1024 * 1024;

const allowedMimeTypes =
    new Set([
        "image/jpeg",
        "image/png",
        "image/webp",
    ]);

export const imageUpload =
    multer({
        storage:
            multer.memoryStorage(),

        limits: {
            fileSize:
                MAX_IMAGE_SIZE,

            files: 1,
        },

        fileFilter: (
            _req,
            file,
            callback,
        ) => {
            if (
                !allowedMimeTypes.has(
                    file.mimetype,
                )
            ) {
                callback(
                    new Error(
                        "INVALID_IMAGE_TYPE",
                    ),
                );

                return;
            }

            callback(
                null,
                true,
            );
        },
    });