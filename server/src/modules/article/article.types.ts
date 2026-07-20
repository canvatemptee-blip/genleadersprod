export type ArticleStatus =
    | "draft"
    | "scheduled"
    | "published"
    | "archived";

export interface Article {
    id: number;

    title: string;

    slug: string;

    excerpt: string;

    content: unknown;

    cover_image: string | null;

    author_id: number;

    category_id: number;

    reading_time: number;

    is_featured: boolean;

    status: ArticleStatus;

    scheduled_at: Date | null;

    published_at: Date | null;

    created_at: Date;

    updated_at: Date;
}