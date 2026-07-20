import type {
    AdminRole,
} from "../../modules/admin/admin.types.js";


export type Permission =
    | "article:read"
    | "article:create"
    | "article:update"
    | "article:delete"
    | "category:manage"
    | "newsletter:manage"
    | "staff:manage"
    | "upload:create";


export const ROLE_PERMISSIONS:
    Record<
        AdminRole,
        readonly Permission[]
    > = {
    admin: [
        "article:read",
        "article:create",
        "article:update",
        "article:delete",
        "category:manage",
        "newsletter:manage",
        "staff:manage",
        "upload:create",
    ],

    manager: [
        "article:read",
        "article:create",
        "article:update",
        "article:delete",
        "category:manage",
        "newsletter:manage",
        "upload:create",
    ],

    intern: [
        "article:read",
        "article:create",
        "article:update",
        "upload:create",
    ],
};


export function hasPermission(
    role: AdminRole,
    permission: Permission,
): boolean {
    return ROLE_PERMISSIONS[
        role
    ].includes(
        permission,
    );
}