import type { MenuItem, MenuGroup } from "../types/menu";

import {
  HomeIcon,
  UserIcon,
  TagIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export const MENU_CONTENT = {
  superAdmin: "Super Admin",
  admin: "Admin",
  employee: "Employee",
};

export const MENU_ROUTES = {
  superAdmin: "/super-admin",
  admin: "/admin",
  employee: "/employee",
};
export const CHILDREN_SUPER_ADMIN: MenuItem[] = [
  {
    title: "Inicio",
    href: "/home",
    icon: HomeIcon,
  },
  {
    title: "Usuarios",
    href: "/users",
    icon: UserIcon,
  },
  {
    title: "Productos",
    href: "/products",
    icon: ShoppingBagIcon,
  },
  {
    title: "Categorias",
    href: "/categories",
    icon: TagIcon,
  },
  {
    title: "Pedidos",
    href: "/orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Clientes",
    href: "/customers",
    icon: UsersIcon,
  },
  {
    title: "Reportes",
    href: "/reports",
    icon: ChartBarIcon,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: CogIcon,
  },
];

export const CHILDREN_ADMIN: MenuItem[] = [
  {
    title: "Inicio",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Usuarios",
    href: "/users",
    icon: UserIcon,
  },
];

export const CHILDREN_EMPLOYEE: MenuItem[] = [
  {
    title: "Inicio",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Usuarios",
    href: "/users",
    icon: UserIcon,
  },
];

export const superAdminMenu: MenuGroup[] = [
  {
    items: CHILDREN_SUPER_ADMIN,
  },
];

export const adminMenu: MenuGroup[] = [
  {
    items: CHILDREN_ADMIN,
  },
];

export const employeeMenu: MenuGroup[] = [
  {
    items: CHILDREN_EMPLOYEE,
  },
];
