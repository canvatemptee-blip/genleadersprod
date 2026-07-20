import jwt
    from "jsonwebtoken";

import {
    env,
} from "../../config/env.js";

import type {
    AdminRole,
} from "../../modules/admin/admin.types.js";


export class JwtService {
    generateAccessToken(
        adminId:
            number,

        email:
            string,

        role:
            AdminRole,
    ):
        string {
        return jwt.sign(
            {
                sub:
                    adminId,

                email,

                role,
            },
            env.JWT_SECRET,
            {
                expiresIn:
                    env.JWT_EXPIRES_IN,
            },
        );
    }
}


export const jwtService =
    new JwtService();