export interface NewsletterSubscriber {
    id: number;

    email: string;

    subscribed_at: Date;

    is_verified: boolean;

    verification_token_hash:
    string | null;

    verification_expires_at:
    Date | null;

    unsubscribe_token_hash:
    string | null;

    unsubscribe_expires_at:
    Date | null;

    verified_at:
    Date | null;
}