import {
    RequestHandler,
    ParamsDictionary,
} from "express-serve-static-core";
import { ParsedQs } from "qs";

export function asyncHandler<
    P = ParamsDictionary,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = ParsedQs,
    Locals extends Record<string, unknown> = Record<string, unknown>,
>(
    handler: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {
    return (req, res, next) =>
        Promise.resolve(handler(req, res, next)).catch(next);
}