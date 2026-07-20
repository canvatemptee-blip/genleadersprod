import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import { ROUTES } from "@/config/routes";

import { authToken } from "@/shared/services/authToken";

export default function ProtectedRoute() {
    const location = useLocation();

    const authenticated =
        authToken.clearIfInvalid();

    if (!authenticated) {
        return (
            <Navigate
                to={ROUTES.ADMIN_LOGIN}
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    return <Outlet />;
}