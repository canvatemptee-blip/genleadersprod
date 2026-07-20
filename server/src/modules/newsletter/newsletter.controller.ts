import type {
    Request,
    Response,
} from "express";

import {
    ApiResponse,
} from "../../shared/utils/ApiResponse.js";

import {
    NewsletterService,
} from "./newsletter.service.js";


export class NewsletterController {
    constructor(
        private readonly service =
            new NewsletterService(),
    ) { }


    subscribe = async (
        req: Request,
        res: Response,
    ) => {
        await this.service
            .subscribe(
                req.body.email,
            );


        return res
            .status(
                202,
            )
            .json(
                ApiResponse.success(
                    "If this email can be subscribed, a verification email has been sent.",
                ),
            );
    };


    resendVerification = async (
        req: Request,
        res: Response,
    ) => {
        await this.service
            .resendVerification(
                req.body.email,
            );


        return res.json(
            ApiResponse.success(
                "If a pending subscription exists for this email, a new verification email has been sent.",
            ),
        );
    };


    verify = async (
        req: Request,
        res: Response,
    ) => {
        await this.service
            .verify(
                req.body.token,
            );


        return res.json(
            ApiResponse.success(
                "Email verified successfully. You are now subscribed.",
            ),
        );
    };


    requestUnsubscribe = async (
        req: Request,
        res: Response,
    ) => {
        await this.service
            .requestUnsubscribe(
                req.body.email,
            );


        return res.json(
            ApiResponse.success(
                "If this email is subscribed and verified, an unsubscribe link has been sent.",
            ),
        );
    };


    unsubscribe = async (
        req: Request,
        res: Response,
    ) => {
        await this.service
            .unsubscribe(
                req.body.token,
            );


        return res.json(
            ApiResponse.success(
                "You have been unsubscribed successfully.",
            ),
        );
    };


    getSubscribers = async (
        _: Request,
        res: Response,
    ) => {
        const subscribers =
            await this.service
                .getSubscribers();


        return res.json(
            ApiResponse.success(
                "Subscribers fetched successfully.",
                subscribers,
            ),
        );
    };


    deleteSubscriber = async (
        req: Request,
        res: Response,
    ) => {
        const id =
            Number(
                req.params.id,
            );


        await this.service
            .deleteSubscriber(
                id,
            );


        return res.json(
            ApiResponse.success(
                "Subscriber deleted successfully.",
            ),
        );
    };
}