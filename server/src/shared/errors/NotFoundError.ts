import { ApiError } from "./ApiError.js";

export class NotFoundError extends ApiError {
    constructor(resource: string) {
        super(404, `${resource} not found.`);
    }
}