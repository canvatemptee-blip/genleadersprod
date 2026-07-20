BEGIN;


ALTER TABLE admins
ADD COLUMN role VARCHAR(20)
NOT NULL
DEFAULT 'intern';

ALTER TABLE admins
ADD COLUMN is_active BOOLEAN
NOT NULL
DEFAULT TRUE;

ALTER TABLE admins
ADD COLUMN last_login_at TIMESTAMP;

ALTER TABLE admins
ADD COLUMN created_by BIGINT;

ALTER TABLE admins
ADD CONSTRAINT chk_admin_role
CHECK (
    role IN (
        'admin',
        'manager',
        'intern'
    )
);

ALTER TABLE admins
ADD CONSTRAINT fk_admin_created_by
FOREIGN KEY (created_by)
REFERENCES admins(id)
ON DELETE SET NULL;


UPDATE admins
SET role = 'admin'
WHERE email = 'admin@genleaders.com';


ALTER TABLE articles
ADD COLUMN scheduled_at TIMESTAMP;

ALTER TABLE articles
DROP CONSTRAINT chk_articles_status;

ALTER TABLE articles
ADD CONSTRAINT chk_articles_status
CHECK (
    status IN (
        'draft',
        'scheduled',
        'published',
        'archived'
    )
);


ALTER TABLE articles
ADD CONSTRAINT chk_scheduled_article_time
CHECK (
    status <> 'scheduled'
    OR scheduled_at IS NOT NULL
);


CREATE INDEX idx_admins_role
ON admins(role);

CREATE INDEX idx_admins_active
ON admins(is_active);

CREATE INDEX idx_articles_scheduled
ON articles(scheduled_at)
WHERE status = 'scheduled';

COMMIT;