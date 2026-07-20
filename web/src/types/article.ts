export interface ArticleTextNode {
    type: "text";
    text: string;
}

export interface ArticleContentNode {
    type: string;
    attrs?: Record<string, unknown>;
    content?: ArticleContentNode[];
    text?: string;
}

export interface ArticleDocument {
    type: "doc";
    content?: ArticleContentNode[];
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content?: ArticleDocument;
    cover_image: string | null;
    category: string;
    author: string;
    reading_time: number;
    published_at: string;
}