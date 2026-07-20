import type {
    AdminRole,
} from "@/types/auth";


export type Permission =
    | "article:view"
    | "article:create"
    | "article:edit"
    | "article:schedule"
    | "article:delete"
    | "category:manage"
    | "newsletter:manage"
    | "staff:manage";


const rolePermissions:
    Record<
        AdminRole,
        readonly Permission[]
    > = {
    admin: [
        "article:view",
        "article:create",
        "article:edit",
        "article:schedule",
        "article:delete",
        "category:manage",
        "newsletter:manage",
        "staff:manage",
    ],

    manager: [
        "article:view",
        "article:create",
        "article:edit",
        "article:schedule",
        "article:delete",
        "category:manage",
        "newsletter:manage",
    ],

    intern: [
        "article:view",
        "article:create",
        "article:edit",
        "article:schedule",
    ],
};


export function hasPermission(
    role: AdminRole | null | undefined,

    permission: Permission,
) {
    if (!role) {
        return false;
    }


    return rolePermissions[
        role
    ].includes(
        permission,
    );
}


export function canDeleteArticles(
    role: AdminRole | null | undefined,
) {
    return hasPermission(
        role,
        "article:delete",
    );
}


export function canManageCategories(
    role: AdminRole | null | undefined,
) {
    return hasPermission(
        role,
        "category:manage",
    );
}


export function canManageNewsletter(
    role: AdminRole | null | undefined,
) {
    return hasPermission(
        role,
        "newsletter:manage",
    );
}


export function canManageStaff(
    role: AdminRole | null | undefined,
) {
    return hasPermission(
        role,
        "staff:manage",
    );
}