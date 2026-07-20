import type {
    ImgHTMLAttributes,
} from "react";

import {
    useState,
} from "react";

import clsx
    from "clsx";


interface ImageWithFallbackProps
    extends Omit<
        ImgHTMLAttributes<HTMLImageElement>,
        "className"
    > {
    className?:
    string;

    imgClassName?:
    string;

    fallbackText?:
    string;
}


export default function ImageWithFallback({
    src,
    alt,
    className,
    imgClassName,
    fallbackText =
    "Image Unavailable",
    loading =
    "lazy",
    decoding =
    "async",
    onError,
    ...props
}: ImageWithFallbackProps) {
    const [
        hasError,
        setHasError,
    ] =
        useState(
            false,
        );


    if (
        !src ||
        hasError
    ) {
        return (
            <div
                className={clsx(
                    "flex h-full w-full items-center justify-center bg-slate-200 text-center",
                    className,
                )}
            >
                <div className="px-4">
                    <p className="text-sm font-semibold text-[#06154A]">
                        GenLeaders
                    </p>


                    <p className="mt-2 text-xs text-slate-500">
                        {
                            fallbackText
                        }
                    </p>
                </div>
            </div>
        );
    }


    return (
        <img
            {...props}

            src={
                src
            }

            alt={
                alt
            }

            loading={
                loading
            }

            decoding={
                decoding
            }

            className={clsx(
                "h-full w-full",
                imgClassName,
            )}

            onError={(
                event,
            ) => {
                setHasError(
                    true,
                );


                onError?.(
                    event,
                );
            }}
        />
    );
}