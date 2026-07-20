import type {
    ArticleStatus,
} from "./adminArticle";


export interface ArticleTextNode {
    type: "text";

    text: string;
}


export interface ArticleParagraphNode {
    type: "paragraph";

    content: ArticleTextNode[];
}


export interface ArticleDocument {
    type: "doc";

    content: ArticleParagraphNode[];
}


export interface ArticleEditorValues {
    title: string;

    slug: string;

    excerpt: string;

    content: string;

    cover_image: string;

    category_id: number;

    reading_time: number;

    is_featured: boolean;

    status: ArticleStatus;

    scheduled_at: string;
}


export interface CreateArticlePayload {
    title: string;

    slug: string;

    excerpt: string;

    content: ArticleDocument;

    cover_image?: string | null;

    category_id: number;

    reading_time: number;

    is_featured: boolean;

    status: ArticleStatus;

    scheduled_at?: string | null;
}


export type UpdateArticlePayload =
    Partial<CreateArticlePayload>;