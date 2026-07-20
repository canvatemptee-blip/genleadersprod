import {
    type ChangeEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    ImagePlus,
    LoaderCircle,
    Trash2,
    Upload,
} from "lucide-react";

import {
    useImageUpload,
} from "@/shared/hooks/useImageUpload";


interface ArticleCoverImagePanelProps {
    coverImage: string;

    onCoverImageChange: (
        imageUrl: string,
    ) => void;

    onUploadingChange?: (
        isUploading: boolean,
    ) => void;
}


const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const MAX_IMAGE_SIZE =
    5 * 1024 * 1024;


export default function ArticleCoverImagePanel({
    coverImage,
    onCoverImageChange,
    onUploadingChange,
}: ArticleCoverImagePanelProps) {
    const [
        localPreview,
        setLocalPreview,
    ] = useState<string | null>(
        null,
    );

    const [
        uploadError,
        setUploadError,
    ] = useState<string | null>(
        null,
    );

    const fileInputRef =
        useRef<HTMLInputElement>(
            null,
        );


    const {
        mutate: uploadImage,
        isPending:
        isUploadingImage,
    } = useImageUpload();


    useEffect(() => {
        onUploadingChange?.(
            isUploadingImage,
        );
    }, [
        isUploadingImage,
        onUploadingChange,
    ]);


    useEffect(() => {
        return () => {
            if (localPreview) {
                URL.revokeObjectURL(
                    localPreview,
                );
            }
        };
    }, [
        localPreview,
    ]);


    const clearLocalPreview =
        () => {
            if (!localPreview) {
                return;
            }

            URL.revokeObjectURL(
                localPreview,
            );

            setLocalPreview(
                null,
            );
        };


    const resetFileInput =
        () => {
            if (
                fileInputRef.current
            ) {
                fileInputRef.current.value =
                    "";
            }
        };


    const handleImageSelect = (
        event:
            ChangeEvent<HTMLInputElement>,
    ) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }


        setUploadError(
            null,
        );


        if (
            !ALLOWED_IMAGE_TYPES.includes(
                file.type,
            )
        ) {
            setUploadError(
                "Only JPEG, PNG and WebP images are allowed.",
            );

            resetFileInput();

            return;
        }


        if (
            file.size >
            MAX_IMAGE_SIZE
        ) {
            setUploadError(
                "Image cannot exceed 5 MB.",
            );

            resetFileInput();

            return;
        }


        clearLocalPreview();


        const previewUrl =
            URL.createObjectURL(
                file,
            );

        setLocalPreview(
            previewUrl,
        );


        uploadImage(
            file,
            {
                onSuccess: (
                    uploadedImage,
                ) => {
                    onCoverImageChange(
                        uploadedImage.url,
                    );

                    setUploadError(
                        null,
                    );
                },

                onError: (
                    error,
                ) => {
                    setUploadError(
                        error instanceof Error
                            ? error.message
                            : "Image upload failed.",
                    );
                },
            },
        );
    };


    const handleRemoveImage =
        () => {
            clearLocalPreview();

            onCoverImageChange(
                "",
            );

            setUploadError(
                null,
            );

            resetFileInput();
        };


    const handleImageUrlChange = (
        imageUrl: string,
    ) => {
        clearLocalPreview();

        onCoverImageChange(
            imageUrl,
        );

        setUploadError(
            null,
        );

        resetFileInput();
    };


    const previewImage =
        localPreview ||
        coverImage;


    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <ImagePlus
                        size={20}
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <h3 className="text-lg font-bold text-[#06154A]">
                        Cover Image
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        JPEG, PNG or WebP.
                        Max 5 MB.
                    </p>
                </div>
            </div>


            <input
                ref={
                    fileInputRef
                }
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={
                    handleImageSelect
                }
                className="hidden"
            />


            <button
                type="button"
                disabled={
                    isUploadingImage
                }
                onClick={() =>
                    fileInputRef.current?.click()
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-blue-50 px-4 py-4 font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isUploadingImage ? (
                    <LoaderCircle
                        size={18}
                        className="animate-spin"
                        aria-hidden="true"
                    />
                ) : (
                    <Upload
                        size={18}
                        aria-hidden="true"
                    />
                )}


                {isUploadingImage
                    ? "Uploading..."
                    : previewImage
                        ? "Replace image"
                        : "Upload from device"}
            </button>


            {uploadError && (
                <p
                    role="alert"
                    className="mt-3 text-sm leading-6 text-red-600"
                >
                    {uploadError}
                </p>
            )}


            {previewImage && (
                <div className="mt-5">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        <img
                            src={
                                previewImage
                            }
                            alt="Article cover preview"
                            className="aspect-video w-full object-cover"
                        />
                    </div>


                    <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="text-sm text-slate-500">
                            {isUploadingImage
                                ? "Uploading image..."
                                : coverImage
                                    ? "Image ready"
                                    : "Preview"}
                        </p>


                        <button
                            type="button"
                            disabled={
                                isUploadingImage
                            }
                            onClick={
                                handleRemoveImage
                            }
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Trash2
                                size={16}
                                aria-hidden="true"
                            />

                            Remove
                        </button>
                    </div>
                </div>
            )}


            <div className="mt-5 border-t border-slate-200 pt-5">
                <label
                    htmlFor="cover-image"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Or use image URL
                </label>


                <input
                    id="cover-image"
                    type="url"
                    value={
                        coverImage
                    }
                    onChange={(
                        event,
                    ) =>
                        handleImageUrlChange(
                            event.target.value,
                        )
                    }
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
            </div>
        </section>
    );
}