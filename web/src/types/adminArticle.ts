import type {
    ArticleDocument,
} from "./article";


export type ArticleStatus =
    | "draft"
    | "scheduled"
    | "published"
    | "archived";


export interface AdminArticle {
    id: number;

    title: string;

    slug: string;

    excerpt: string;

    content: ArticleDocument;

    cover_image: string | null;

    author_id: number;

    category_id: number;

    reading_time: number;

    featured_person_name: string | null;

    featured_person_linkedin: string | null;

    is_featured: boolean;

    status: ArticleStatus;

    scheduled_at: string | null;

    published_at: string | null;

    created_at: string;

    updated_at: string;
}