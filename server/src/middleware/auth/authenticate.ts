import {
    NextFunction,
    Request,
    Response,
} from "express";

import jwt from "jsonwebtoken";

import {
    env,
} from "../../config/env.js";

import {
    AuthRepository,
} from "../../modules/auth/auth.repository.js";

import type {
    AuthPayload,
} from "../../types/auth.types.js";


const authRepository =
    new AuthRepository();


export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader =
        req.headers.authorization;


    if (
        !authHeader?.startsWith(
            "Bearer ",
        )
    ) {
        return res
            .status(
                401,
            )
            .json({
                success:
                    false,

                message:
                    "Authentication required.",
            });
    }


    const token =
        authHeader.substring(
            7,
        );


    try {
        const payload =
            jwt.verify(
                token,
                env.JWT_SECRET,
            ) as AuthPayload;


        const adminId =
            Number(
                payload.sub,
            );


        if (
            !Number.isInteger(
                adminId,
            ) ||
            adminId <= 0
        ) {
            return res
                .status(
                    401,
                )
                .json({
                    success:
                        false,

                    message:
                        "Invalid or expired token.",
                });
        }


        const account =
            await authRepository
                .findCurrentAuthAccount(
                    adminId,
                );


        if (
            !account
        ) {
            return res
                .status(
                    401,
                )
                .json({
                    success:
                        false,

                    message:
                        "Invalid or expired token.",
                });
        }


        if (
            !account.is_active
        ) {
            return res
                .status(
                    403,
                )
                .json({
                    success:
                        false,

                    message:
                        "This account has been deactivated.",
                });
        }


        req.user = {
            id:
                Number(
                    account.id,
                ),

            email:
                account.email,

            role:
                account.role,
        };


        next();
    } catch (
    error
    ) {
        if (
            error instanceof jwt.JsonWebTokenError ||
            error instanceof jwt.TokenExpiredError
        ) {
            return res
                .status(
                    401,
                )
                .json({
                    success:
                        false,

                    message:
                        "Invalid or expired token.",
                });
        }


        next(
            error,
        );
    }
}