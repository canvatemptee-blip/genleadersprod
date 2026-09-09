import nodemailer
    from "nodemailer";

import {
    env,
} from "../../config/env.js";

import {
    MailDeliveryError,
} from "../errors/MailDeliveryError.js";


function escapeHtml(
    value: string,
): string {
    return value
        .replace(
            /&/g,
            "&amp;",
        )
        .replace(
            /</g,
            "&lt;",
        )
        .replace(
            />/g,
            "&gt;",
        )
        .replace(
            /"/g,
            "&quot;",
        )
        .replace(
            /'/g,
            "&#39;",
        );
}


const transporter =
    nodemailer.createTransport({
        host:
            env.SMTP_HOST,

        port:
            env.SMTP_PORT,

        secure:
            env.SMTP_SECURE,

        auth: {
            user:
                env.SMTP_USER,

            pass:
                env.SMTP_PASSWORD,
        },
    });


export class MailService {
    async verifyConnection() {
        await transporter.verify();
    }


    async sendNewsletterVerification(
        email: string,
        token: string,
    ) {
        const verificationUrl =
            `${env.CLIENT_URL}/newsletter/verify?token=${encodeURIComponent(
                token,
            )}`;


        try {
            await transporter.sendMail({
                from:
                    env.MAIL_FROM,

                to:
                    email,

                subject:
                    "Confirm your GenLeaders newsletter subscription",

                text:
                    [
                        "Welcome to GenLeaders.",
                        "",
                        "Confirm your newsletter subscription by opening this link:",
                        verificationUrl,
                        "",
                        "This verification link expires in 24 hours.",
                        "",
                        "If you did not request this subscription, you can ignore this email.",
                    ].join(
                        "\n",
                    ),

                html:
                    `
                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 32px;
                        color: #0f172a;
                    "
                >
                    <h1
                        style="
                            color: #06154A;
                            margin-bottom: 16px;
                        "
                    >
                        Confirm your subscription
                    </h1>

                    <p
                        style="
                            line-height: 1.7;
                        "
                    >
                        Thank you for subscribing to the
                        GenLeaders newsletter.
                    </p>

                    <p
                        style="
                            line-height: 1.7;
                        "
                    >
                        Confirm your email address to start
                        receiving new stories and updates.
                    </p>

                    <a
                        href="${verificationUrl}"
                        style="
                            display: inline-block;
                            margin-top: 16px;
                            padding: 14px 22px;
                            border-radius: 8px;
                            background: #06154A;
                            color: #ffffff;
                            text-decoration: none;
                            font-weight: 700;
                        "
                    >
                        Verify Email
                    </a>

                    <p
                        style="
                            margin-top: 28px;
                            color: #64748b;
                            font-size: 14px;
                            line-height: 1.6;
                        "
                    >
                        This verification link expires in
                        24 hours.
                    </p>

                    <p
                        style="
                            margin-top: 12px;
                            color: #64748b;
                            font-size: 14px;
                            line-height: 1.6;
                        "
                    >
                        If you did not request this
                        subscription, you can safely ignore
                        this email.
                    </p>
                </div>
                `,
            });
        } catch (error) {
            console.error(
                "Newsletter verification email delivery failed:",
                error,
            );


            throw new MailDeliveryError(
                "Unable to send the verification email right now. Please try again later.",
            );
        }
    }

    async sendNewsletterUnsubscribe(
        email: string,
        token: string,
    ) {
        const unsubscribeUrl =
            `${env.CLIENT_URL}/newsletter/unsubscribe?token=${encodeURIComponent(
                token,
            )}`;


        try {
            await transporter.sendMail({
                from:
                    env.MAIL_FROM,

                to:
                    email,

                subject:
                    "Confirm your GenLeaders newsletter unsubscribe request",

                text:
                    [
                        "We received a request to unsubscribe this email address from the GenLeaders newsletter.",
                        "",
                        "Confirm the request by opening this link:",
                        unsubscribeUrl,
                        "",
                        "This unsubscribe link expires in 24 hours.",
                        "",
                        "If you did not request this, you can ignore this email and remain subscribed.",
                    ].join(
                        "\n",
                    ),

                html:
                    `
                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 32px;
                        color: #0f172a;
                    "
                >
                    <h1
                        style="
                            color: #06154A;
                            margin-bottom: 16px;
                        "
                    >
                        Confirm unsubscribe request
                    </h1>

                    <p
                        style="
                            line-height: 1.7;
                        "
                    >
                        We received a request to remove this
                        email address from the GenLeaders
                        newsletter.
                    </p>

                    <p
                        style="
                            line-height: 1.7;
                        "
                    >
                        Confirm the request below. You will
                        remain subscribed until you confirm.
                    </p>

                    <a
                        href="${unsubscribeUrl}"
                        style="
                            display: inline-block;
                            margin-top: 16px;
                            padding: 14px 22px;
                            border-radius: 8px;
                            background: #06154A;
                            color: #ffffff;
                            text-decoration: none;
                            font-weight: 700;
                        "
                    >
                        Confirm Unsubscribe
                    </a>

                    <p
                        style="
                            margin-top: 28px;
                            color: #64748b;
                            font-size: 14px;
                            line-height: 1.6;
                        "
                    >
                        This unsubscribe link expires in
                        24 hours.
                    </p>

                    <p
                        style="
                            margin-top: 12px;
                            color: #64748b;
                            font-size: 14px;
                            line-height: 1.6;
                        "
                    >
                        If you did not request this, ignore
                        this email and your subscription will
                        remain active.
                    </p>
                </div>
                `,
            });
        } catch (error) {
            console.error(
                "Newsletter unsubscribe email delivery failed:",
                error,
            );


            throw new MailDeliveryError(
                "Unable to send the unsubscribe confirmation email right now. Please try again later.",
            );
        }
    }

    async sendRegistrationConfirmation(
        email: string,

        fullName: string,

        lookingForLabel: string,
    ) {
        try {
            await transporter.sendMail({
                from:
                    env.MAIL_FROM,

                to:
                    email,

                subject:
                    "We have received your GenLeaders registration",

                text:
                    [
                        `Hi ${fullName},`,
                        "",
                        "Thank you for registering with GenLeaders.",
                        "",
                        `We have received your request for: ${lookingForLabel}.`,
                        "",
                        "Our team will review your submission and reach out using the contact details you provided.",
                        "",
                        "Your Role. Your Story. Amplified With Us.",
                        "",
                        "GenLeaders",
                    ].join(
                        "\n",
                    ),

                html:
                    `
                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 32px;
                        color: #0f172a;
                    "
                >
                    <h1
                        style="
                            color: #06154A;
                            margin-bottom: 16px;
                        "
                    >
                        Registration received
                    </h1>

                    <p
                        style="
                            line-height: 1.7;
                        "
                    >
                        Hi ${escapeHtml(
                            fullName,
                        )},
                    </p>

                    <p
                        style="
                            line-height: 1.7;
                        "
                    >
                        Thank you for registering with
                        GenLeaders and for sharing your
                        details with us.
                    </p>

                    <p
                        style="
                            line-height: 1.7;
                        "
                    >
                        We have received your request for
                        <strong>${escapeHtml(
                            lookingForLabel,
                        )}</strong>.
                    </p>

                    <p
                        style="
                            line-height: 1.7;
                        "
                    >
                        Our team will review your submission
                        and reach out using the contact
                        details you provided.
                    </p>

                    <p
                        style="
                            margin-top: 28px;
                            color: #64748b;
                            font-size: 14px;
                            line-height: 1.6;
                        "
                    >
                        Your Role. Your Story. Amplified
                        With Us.
                    </p>

                    <p
                        style="
                            margin-top: 12px;
                            color: #64748b;
                            font-size: 14px;
                            line-height: 1.6;
                        "
                    >
                        GenLeaders
                    </p>
                </div>
                `,
            });
        } catch (error) {
            console.error(
                "Registration confirmation email delivery failed:",
                error,
            );


            throw new MailDeliveryError(
                "Unable to send the registration confirmation email right now.",
            );
        }
    }
}
