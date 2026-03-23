import type { ReactNode } from "react";
import type { UserRole } from "../utils/user.auth";
import { APP_ROUTES } from "../services/app-routes";
import { Login } from "../../pages/auth/Login";
import { Home } from "../../pages/menu/Home/Home";
import { Users } from "../../pages/menu/User/User";
import { Product } from "../../pages/menu/Product/Product";
import { Categorie } from "../../pages/menu/Categorie/Categorie";
import { Order } from "../../pages/menu/Order/Order";
import { Customer } from "../../pages/menu/Customer/Customer";
import { Report } from "../../pages/menu/Reports/Report";
import { Settings } from "../../pages/menu/Settings/Settings";
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
    path: APP_ROUTES.HOME,
    element: <Home />,
    isPrivate: true,
    allowedRoles: ["super-admin", "admin", "employee"],
    title: "Home",
    description: "Home",
    icon: "home",
  },
  {
    path: APP_ROUTES.USERS,
    element: <Users />,
    isPrivate: true,
    allowedRoles: ["super-admin", "admin", "employee"],
    title: "Users",
    description: "Users",
    icon: "users",
  },
  {
    path: APP_ROUTES.PRODUCTS,
    element: <Product />,
    isPrivate: true,
    allowedRoles: ["super-admin", "admin", "employee"],
    title: "Products",
    description: "Products",
    icon: "products",
  },
  {
    path: APP_ROUTES.CATEGORIES,
    element: <Categorie />,
    isPrivate: true,
    allowedRoles: ["super-admin", "admin", "employee"],
    title: "Categories",
    description: "Categories",
    icon: "categories",
  },
  {
    path: APP_ROUTES.ORDERS,
    element: <Order />,
    isPrivate: true,
    allowedRoles: ["super-admin", "admin", "employee"],
    title: "Orders",
    description: "Orders",
    icon: "orders",
  },
  {
    path: APP_ROUTES.CUSTOMERS,
    element: <Customer />,
    isPrivate: true,
    allowedRoles: ["super-admin", "admin", "employee"],
    title: "Customers",
    description: "Customers",
    icon: "customers",
  },
  {
    path: APP_ROUTES.REPORTS,
    element: <Report />,
    isPrivate: true,
    allowedRoles: ["super-admin", "admin", "employee"],
    title: "Reports",
    description: "Reports",
    icon: "reports",
  },
  {
    path: APP_ROUTES.SETTINGS,
    element: <Settings />,
    isPrivate: true,
    allowedRoles: ["super-admin", "admin", "employee"],
    title: "Settings",
    description: "Settings",
    icon: "settings",
  }
];
