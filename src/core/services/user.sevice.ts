import type { User } from "../utils/user.auth";

export const checkRole = (user: User | null) => {
  return {
    isAdmin: user?.role === "admin",
    isSuperAdmin: user?.role === "super-admin",
    isEmployee: user?.role === "employee",
    isAnyAdmin: ["admin", "super-admin"].includes(user?.role || ""),
  };
};