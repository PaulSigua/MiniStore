import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../core/hooks/user.hook";
import {
  type ProtectedRouteProps,
  isTokenExpired,
} from "../../core/utils/user.auth";
import { APP_ROUTES } from "../../core/services/app-routes";
import { useEffect } from "react";

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user, loading, logout } = useUser();
  const location = useLocation();

  useEffect(() => {
    if (user && isTokenExpired(user.token)) {
      logout();
    }
  }, [user, logout]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || isTokenExpired(user.token)) {
    return (
      <Navigate to={APP_ROUTES.LOGIN} state={{ from: location }} replace />
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={APP_ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
