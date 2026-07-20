import type {
    NextFunction,
    Request,
    Response,
} from "express";

import {
    hasPermission,
} from "../../shared/security/permissions.js";

import type {
    Permission,
} from "../../shared/security/permissions.js";


export function authorizePermissions(
    ...requiredPermissions:
        Permission[]
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        if (!req.user) {
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


        const permitted =
            requiredPermissions.every(
                (
                    permission,
                ) =>
                    hasPermission(
                        req.user!.role,
                        permission,
                    ),
            );


        if (!permitted) {
            return res
                .status(
                    403,
                )
                .json({
                    success:
                        false,

                    message:
                        "You do not have permission to perform this action.",
                });
        }


        next();
    };
}