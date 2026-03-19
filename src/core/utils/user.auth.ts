import type { ReactNode } from "react";

export type UserRole = "admin" | "super-admin" | "employee";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    token: string;
    avatar: string;
}

export const headers = (user: User | null) => {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.token}`,
    };
};

export const TypeMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

export interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: UserRole[];
}
