import { TypeMethod, type User } from "../../utils/user.auth";
import { API_ROUTES } from "../../../api/api-routes";
import { apiFetch } from "../../utils/api-client";
import type { UserRegister } from "../../types/auth";

export const checkRole = (user: User | null) => {
  return {
    isAdmin: user?.role === "admin",
    isSuperAdmin: user?.role === "super-admin",
    isEmployee: user?.role === "empleado",
    isAnyAdmin: ["admin", "super-admin"].includes(user?.role || ""),
  };
};

export const getAllUsers = async (tokenUser: User | null) => {
  const response = await apiFetch(API_ROUTES.USERS.GET_ALL, {
    method: TypeMethod.GET,
    user: tokenUser,
  });
  return response.json();
};

export const getUserById = async (id: string, tokenUser: User | null) => {
  const response = await apiFetch(
    API_ROUTES.USERS.GET_BY_ID.replace(":id", id),
    {
      method: TypeMethod.GET,
      user: tokenUser,
    },
  );
  return response.json();
};

export const create = async (user: UserRegister, tokenUser: User | null) => {
  const response = await apiFetch(API_ROUTES.USERS.CREATE, {
    method: TypeMethod.POST,
    user: tokenUser,
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUser = async (
  id: string,
  user: User,
  tokenUser: User | null,
) => {
  const response = await apiFetch(API_ROUTES.USERS.UPDATE.replace(":id", id), {
    method: TypeMethod.PUT,
    user: tokenUser,
    body: JSON.stringify(user),
  });
  return response.json();
};
