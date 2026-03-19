import type { ReactNode } from "react";
import type { UserRole } from "../utils/user.auth";
import { APP_ROUTES } from "../services/app-routes";
import { Login } from "../../pages/auth/Login";
import { AdminPage } from "../../pages/admin/AdminPage";
import { SuperAdminPage } from "../../pages/super-admin/SuperAdminPage";

export interface AppRoute {
  path: string;
  element: ReactNode;
  isPrivate: boolean;
  allowedRoles: UserRole[];
  title: string;
  description: string;
  icon: string;
}

export const routesConfig: AppRoute[] = [
  {
    path: APP_ROUTES.LOGIN,
    element: <Login />,
    isPrivate: false,
    allowedRoles: [],
    title: "Login",
    description: "Login",
    icon: "login",
  },
  {
    path: APP_ROUTES.ADMIN,
    element: <AdminPage />,
    isPrivate: true,
    allowedRoles: ["super-admin", "admin"],
    title: "Admin",
    description: "Admin",
    icon: "admin",
  },
  {
    path: APP_ROUTES.SUPER_ADMIN,
    element: <SuperAdminPage />,
    isPrivate: true,
    allowedRoles: ["super-admin"],
    title: "Super Admin",
    description: "Super Admin",
    icon: "super-admin",
  },
];
