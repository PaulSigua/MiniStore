// hooks/useUser.ts
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { checkRole } from "../services/user.sevice";

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }

  // Extract user of context
  const { user, setUser, logout, loading, login } = context;

  // Return user and context
  return {
    user,
    setUser,
    logout,
    login,
    loading,
    ...checkRole(user), // If is isAdmin, isSuperAdmin, etc.
  };
};
