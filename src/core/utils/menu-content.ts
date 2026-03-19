import type { MenuItem, MenuGroup } from "../types/menu";

import {
  HomeIcon,
  UserIcon,
  TagIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UsersIcon,
  TruckIcon,
  ChartBarIcon,
  CogIcon,
  PlusIcon,
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
    title: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    title: "Users",
    href: "/users",
    icon: UserIcon,
  },
  {
    title: "Products",
    href: "/products",
    icon: ShoppingBagIcon,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: TagIcon,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: UsersIcon,
  },
  {
    title: "Suppliers",
    href: "/suppliers",
    icon: TruckIcon,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: ChartBarIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: CogIcon,
  },
];

export const CHILDREN_SUPER_ADMIN_OPTIONS: MenuItem[] = [
  {
    title: "Add Product",
    href: "/products/add",
    icon: PlusIcon,
  },
];

export const CHILDREN_ADMIN: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Users",
    href: "/users",
    icon: UserIcon,
  },
];

export const CHILDREN_EMPLOYEE: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Users",
    href: "/users",
    icon: UserIcon,
  },
];

export const superAdminMenu: MenuGroup[] = [
  {
    items: CHILDREN_SUPER_ADMIN,
  },
  {
    title: "Opciones",
    items: CHILDREN_SUPER_ADMIN_OPTIONS,
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
