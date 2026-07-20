import dotenv
    from "dotenv";

import {
    z,
} from "zod";

import type {
    StringValue,
} from "ms";


if (process.env.NODE_ENV !== "production") {
    dotenv.config({
        path:
            process.env.NODE_ENV === "test"
                ? ".env.test"
                : ".env",
    });
}


const envSchema =
    z.object({
        NODE_ENV:
            z.enum([
                "development",
                "production",
                "test",
            ])
                .default(
                    "development",
                ),


        PORT:
            z.coerce
                .number()
                .int()
                .positive(),


        DATABASE_URL:
            z.string()
                .min(
                    1,
                ),


        JWT_SECRET:
            z.string()
                .min(
                    32,
                ),


        JWT_EXPIRES_IN:
            z.string()
                .min(
                    1,
                )
                .transform(
                    (
                        value,
                    ) =>
                        value as StringValue,
                ),


        CLIENT_URL:
            z.string()
                .url(),


        CLOUDINARY_CLOUD_NAME:
            z.string()
                .min(
                    1,
                ),


        CLOUDINARY_API_KEY:
            z.string()
                .min(
                    1,
                ),


        CLOUDINARY_API_SECRET:
            z.string()
                .min(
                    1,
                ),


        SMTP_HOST:
            z.string()
                .min(
                    1,
                ),


        SMTP_PORT:
            z.coerce
                .number()
                .int()
                .positive(),


        SMTP_SECURE:
            z.enum([
                "true",
                "false",
            ])
                .transform(
                    (
                        value,
                    ) =>
                        value ===
                        "true",
                ),


        SMTP_USER:
            z.string()
                .min(
                    1,
                ),


        SMTP_PASSWORD:
            z.string()
                .min(
                    1,
                ),


        MAIL_FROM:
            z.string()
                .min(
                    1,
                ),
    });


export const env =
    envSchema.parse(
        process.env,
    );