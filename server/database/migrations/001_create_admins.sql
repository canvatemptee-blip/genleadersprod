CREATE TABLE admins (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_email
ON admins(email);