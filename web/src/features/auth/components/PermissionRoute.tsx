import {
    Navigate,
    Outlet,
} from "react-router-dom";

import {
    ROUTES,
} from "@/config/routes";

import {
    hasPermission,
} from "@/features/auth/permissions";

import {
    authToken,
} from "@/shared/services/authToken";

import type {
    Permission,
} from "@/features/auth/permissions";


interface PermissionRouteProps {
    permission: Permission;
}


export default function PermissionRoute({
    permission,
}: PermissionRouteProps) {
    const role =
        authToken.getRole();


    const allowed =
        hasPermission(
            role,
            permission,
        );


    if (!allowed) {
        return (
            <Navigate
                to={
                    ROUTES.ADMIN_ARTICLES
                }
                replace
            />
        );
    }


    return <Outlet />;
}