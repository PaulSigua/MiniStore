import type { ElementType } from "react";
import type { User } from "../utils/user.auth";

export interface MenuGroup {
  title?: string;
  items: MenuItem[];
}

export interface SideMenuProps {
  content?: {
    title: string;
    user: User;
    logout: () => void;
  };
  groups: MenuGroup[];
}

export interface MenuItem {
  title: string;
  href: string;
  icon: ElementType;
  children?: MenuItem[];
}

export interface SidebarProps {
  title?: string;
  items: MenuItem[];
  className?: string;
}

export interface SidebarItemProps {
  item: MenuItem;
  depth?: number;
  className?: string;
}
