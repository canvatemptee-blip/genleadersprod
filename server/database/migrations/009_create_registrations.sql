BEGIN;

CREATE TABLE registrations (
    id BIGSERIAL PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    contact_number VARCHAR(30) NOT NULL,

    email VARCHAR(255) NOT NULL,

    searching_as VARCHAR(20) NOT NULL,

    looking_for VARCHAR(60) NOT NULL,

    best_time_to_reach VARCHAR(120) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'new',

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_registrations_searching_as
        CHECK (
            searching_as IN (
                'individual',
                'business'
            )
        ),

    CONSTRAINT chk_registrations_looking_for
        CHECK (
            looking_for IN (
                'showcase_new_role',
                'announce_the_moment',
                'linkedin_management',
                'linkedin_makeover',
                'company_branding',
                'request_callback'
            )
        ),

    CONSTRAINT chk_registrations_status
        CHECK (
            status IN (
                'new',
                'contacted',
                'closed'
            )
        )
);

CREATE INDEX idx_registrations_created
ON registrations(created_at DESC);

CREATE INDEX idx_registrations_status
ON registrations(status);

CREATE INDEX idx_registrations_email
ON registrations(email);

COMMIT;
