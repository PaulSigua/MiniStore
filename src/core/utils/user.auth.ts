import type { ReactNode } from "react";

export enum UserRole {
  ADMIN = "admin",
  SUPER_ADMIN = "super-admin",
  EMPLOYEE = "empleado",
  CLIENT = "cliente",
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  token: string;
  avatar: string;
  phone?: string;
  address?: string;
}

export const headers = (user: User | null) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
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

export const isTokenExpired = (token: string | null | undefined): boolean => {
  if (!token) return true;

  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return true;

    // Add padding if missing (atob requires correct padding)
    const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const normalizedBase64 = base64 + padding;

    const payloadJson = atob(normalizedBase64);
    const decoded = JSON.parse(payloadJson);

    if (!decoded.exp) return false; // If it doesn't have exp, we assume it doesn't expire (or we handle it according to policy)

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};
