import type {
    JwtPayload,
} from "jsonwebtoken";

import type {
    AdminRole,
} from "../admin/admin.types.js";


export interface AuthPayload
    extends JwtPayload {
    sub:
    string;

    email:
    string;

    role:
    AdminRole;
}