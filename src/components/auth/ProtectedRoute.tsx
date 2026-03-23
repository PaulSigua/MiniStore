import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../core/hooks/user.hook";
import type { ProtectedRouteProps } from "../../core/utils/user.auth";
import { APP_ROUTES } from "../../core/services/app-routes";

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, loading } = useUser();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to={APP_ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to={APP_ROUTES.HOME} state={{ from: location }} replace />;
    }

    return <>{children}</>;
}