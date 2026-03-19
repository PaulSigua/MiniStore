import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../utils/user.auth";
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
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading] = useState(false);
  // #endregion

  useEffect(() => {
    if (import.meta.env.DEV) {
      window.setUser = setUser;
      console.log("🛠️ Debug: window.setUser disponible");
    }
  }, [setUser]);

  const login = async (data: UserLogin) => {
    const response = await authService.login(data);

    // El API devuelve 'access_token' en lugar de un objeto 'user'
    if (response.access_token) {
      const token = response.access_token;

      // Decodificamos el payload del JWT (segunda parte del token separada por puntos)
      try {
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const decoded = JSON.parse(payloadJson);

        // Mapeamos los campos del JWT a nuestra interfaz User
        const userData: User = {
          id: decoded.sub || decoded.id,
          name: decoded.username || decoded.name,
          email: decoded.email,
          // Normalizamos roles si es necesario (ej: de 'superadmin' a 'super-admin')
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading, login }}>
      {children}
    </UserContext.Provider>
  );
}
