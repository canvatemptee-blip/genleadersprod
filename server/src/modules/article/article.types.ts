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

    author?: string;

    category_id: number;

    category?: string;

    category_slug?: string;

    reading_time: number;

    featured_person_name: string | null;

    featured_person_linkedin: string | null;

    is_featured: boolean;

    status: ArticleStatus;

    scheduled_at: Date | null;

    published_at: Date | null;

    created_at: Date;

    updated_at: Date;
}