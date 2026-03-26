import { createContext, useEffect, useState, type ReactNode } from "react";
import { type User, isTokenExpired } from "../utils/user.auth";
import type { UserLogin } from "../types/auth";
import { authService } from "../services/auth/auth.service";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
  login: (user: UserLogin) => void;
}

declare global {
  interface Window {
    setUser: (user: import("../utils/user.auth").User | null) => void;
    logout: () => void;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: { children: ReactNode }) {
  // #region inicialize user with localstorage ...
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      if (isTokenExpired(parsedUser.token)) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return null;
      }
      return parsedUser;
    }
    return null;
  });

  const [loading] = useState(false);
  // #endregion

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (import.meta.env.DEV) {
      window.setUser = setUser;
      window.logout = logout;
      console.log("🛠️ Debug: window.setUser y window.logout disponibles");
    }

    // Verify token expiration every minute
    const interval = setInterval(() => {
      if (user && isTokenExpired(user.token)) {
        console.warn("Token expired detected in periodic verification");
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [user, setUser]);

  const login = async (data: UserLogin) => {
    const response = await authService.login(data);

    // The API returns 'access_token' instead of a 'user' object
    if (response.access_token) {
      const token = response.access_token;

      // Decode the JWT payload (second part of the token separated by dots)
      try {
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const decoded = JSON.parse(payloadJson);

        // Map JWT fields to our User interface
        const userData: User = {
          id: decoded.sub || decoded.id,
          username: decoded.username || decoded.name,
          email: decoded.email,
          // Normalize roles if necessary (e.g., from 'superadmin' to 'super-admin')
          role: decoded.role === "superadmin" ? "super-admin" : decoded.role,
          token: token,
          avatar: decoded.avatar,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        throw new Error("Error en el formato del token recibido");
      }
    } else {
      throw new Error(response.message || "Credenciales inválidas");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading, login }}>
      {children}
    </UserContext.Provider>
  );
}
