CREATE TABLE articles (
    id BIGSERIAL PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL UNIQUE,

    excerpt TEXT NOT NULL,

    content JSONB NOT NULL,

    cover_image TEXT,

    author_id BIGINT NOT NULL,

    category_id BIGINT NOT NULL,

    reading_time INTEGER NOT NULL,

    is_featured BOOLEAN NOT NULL DEFAULT FALSE,

    status VARCHAR(20) NOT NULL DEFAULT 'draft',

    published_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_articles_author
        FOREIGN KEY (author_id)
        REFERENCES admins(id),

    CONSTRAINT fk_articles_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id),

    CONSTRAINT chk_articles_status
        CHECK (
            status IN (
                'draft',
                'published',
                'archived'
            )
        )
);

CREATE INDEX idx_articles_slug
ON articles(slug);

CREATE INDEX idx_articles_category
ON articles(category_id);

CREATE INDEX idx_articles_status
ON articles(status);

CREATE INDEX idx_articles_published
ON articles(published_at DESC);