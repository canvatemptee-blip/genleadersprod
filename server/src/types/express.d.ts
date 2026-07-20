import "express";

import type {
    AdminRole,
} from "../modules/admin/admin.types.js";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;

                email: string;

                role: AdminRole;
            };
        }
    }
}

export { };