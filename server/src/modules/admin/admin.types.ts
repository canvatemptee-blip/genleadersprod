export type AdminRole =
    | "admin"
    | "manager"
    | "intern";

export interface Admin {
    id: number;

    name: string;

    email: string;

    password_hash: string;

    role: AdminRole;

    is_active: boolean;

    last_login_at: Date | null;

    created_by: number | null;

    created_at: Date;

    updated_at: Date;
}