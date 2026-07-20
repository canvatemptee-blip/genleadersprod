import {
    ApiError,
} from "./ApiError.js";


export class MailDeliveryError
    extends ApiError {

    constructor(
        message =
            "Email delivery is temporarily unavailable. Please try again later.",
    ) {
        super(
            503,
            message,
        );
    }
}