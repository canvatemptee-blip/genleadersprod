import { ValidationError } from "../../shared/errors/ValidationError.js";

import {
    jwtService,
} from "../../shared/security/JwtService.js";

import {
    passwordService,
} from "../../shared/security/PasswordService.js";

import {
    AuthRepository,
} from "./auth.repository.js";

import {
    LoginDto,
} from "./auth.validation.js";

export class AuthService {
    constructor(
        private readonly repository =
            new AuthRepository(),
    ) { }

    async login(
        data: LoginDto,
    ) {
        const admin =
            await this.repository.findByEmail(
                data.email,
            );

        if (!admin) {
            throw new ValidationError(
                "Invalid email or password.",
            );
        }

        const validPassword =
            await passwordService.compare(
                data.password,
                admin.password_hash,
            );

        if (!validPassword) {
            throw new ValidationError(
                "Invalid email or password.",
            );
        }

        if (!admin.is_active) {
            throw new ValidationError(
                "This account has been deactivated.",
            );
        }

        const accessToken =
            jwtService.generateAccessToken(
                Number(
                    admin.id,
                ),

                admin.email,

                admin.role,
            );

        await this.repository.updateLastLogin(
            Number(admin.id),
        );

        return {
            accessToken,

            user: {
                id: Number(admin.id),
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        };
    }
}