ALTER TABLE newsletter_subscribers
ADD COLUMN is_verified BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN verification_token_hash VARCHAR(64),
ADD COLUMN verification_expires_at TIMESTAMP,
ADD COLUMN unsubscribe_token_hash VARCHAR(64),
ADD COLUMN verified_at TIMESTAMP;


CREATE UNIQUE INDEX
newsletter_verification_token_hash_unique
ON newsletter_subscribers (
    verification_token_hash
)
WHERE verification_token_hash IS NOT NULL;


CREATE UNIQUE INDEX
newsletter_unsubscribe_token_hash_unique
ON newsletter_subscribers (
    unsubscribe_token_hash
)
WHERE unsubscribe_token_hash IS NOT NULL;


UPDATE newsletter_subscribers
SET
    is_verified = TRUE,
    verified_at = subscribed_at
WHERE is_verified = FALSE;