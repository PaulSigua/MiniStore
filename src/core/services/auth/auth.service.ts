import { API_ROUTES } from "../../../api/api-routes";
import type { UserLogin, UserRegister } from "../../types/auth";
import { apiFetch } from "../../utils/api-client";
import { TypeMethod } from "../../utils/user.auth";

export const authService = {
  login: async (user: UserLogin) => {
    const response = await apiFetch(API_ROUTES.AUTH.LOGIN, {
      method: TypeMethod.POST,
      body: JSON.stringify(user),
    });
    return response.json();
  },
  register: async (user: UserRegister) => {
    const response = await apiFetch(API_ROUTES.AUTH.REGISTER, {
      method: TypeMethod.POST,
      body: JSON.stringify(user),
    });
    return response.json();
  },
  logout: async () => {
    const response = await apiFetch(API_ROUTES.AUTH.LOGOUT, {
      method: TypeMethod.POST,
    });
    return response.json();
  },
};
