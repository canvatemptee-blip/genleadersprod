export interface NewsletterSubscriber {
    id: number;

    email: string;

    subscribed_at: string;

    is_verified: boolean;

    verification_expires_at:
    string | null;

    verified_at:
    string | null;
}


export interface NewsletterEmailPayload {
    email: string;
}


export interface NewsletterTokenPayload {
    token: string;
}