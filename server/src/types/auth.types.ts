import {
    JwtPayload,
} from "jsonwebtoken";

import type {
    AdminRole,
} from "../modules/admin/admin.types.js";

export interface AuthPayload
    extends JwtPayload {
    sub: string;

    email: string;

    role: AdminRole;
}