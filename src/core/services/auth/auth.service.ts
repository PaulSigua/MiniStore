import { API_ROUTES } from "../../../api/api-routes";
import type { UserLogin, UserRegister } from "../../types/auth";
import { headers, TypeMethod } from "../../utils/user.auth";

const getFullUrl = (route: string) => {
  const baseUrl = import.meta.env.VITE_API_URL || "";
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  return `${cleanBaseUrl}${cleanRoute}`;
};

export const authService = {
  login: async (user: UserLogin) => {
    const response = await fetch(getFullUrl(API_ROUTES.AUTH.LOGIN), {
      method: TypeMethod.POST,
      headers: headers(null),
      body: JSON.stringify(user),
    });
    return response.json();
  },
  register: async (user: UserRegister) => {
    const response = await fetch(getFullUrl(API_ROUTES.AUTH.REGISTER), {
      method: TypeMethod.POST,
      headers: headers(null),
      body: JSON.stringify(user),
    });
    return response.json();
  },
  logout: async () => {
    const response = await fetch(getFullUrl(API_ROUTES.AUTH.LOGOUT), {
      method: TypeMethod.POST,
      headers: headers(null),
    });
    return response.json();
  },
};
