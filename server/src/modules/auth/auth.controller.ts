import { Request, Response } from "express";

import { ApiResponse } from "../../shared/utils/ApiResponse.js";

import { AuthService } from "./auth.service.js";

export class AuthController {
    constructor(
        private readonly service = new AuthService(),
    ) { }

    login = async (req: Request, res: Response) => {
        const token = await this.service.login(req.body);

        return res.json(
            ApiResponse.success(
                "Login successful.",
                token,
            ),
        );
    };
}