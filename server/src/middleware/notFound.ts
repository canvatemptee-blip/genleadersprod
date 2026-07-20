import { Request, Response } from "express";

export function notFound(_: Request, res: Response) {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
}