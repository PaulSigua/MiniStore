import { headers, type User } from "./user.auth";

export const getFullUrl = (route: string) => {
  const baseUrl = import.meta.env.VITE_API_URL || "";
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  return `${cleanBaseUrl}${cleanRoute}`;
};

interface ApiOptions extends RequestInit {
  user?: User | null;
}

export const apiFetch = async (route: string, options: ApiOptions = {}) => {
  const { user, ...fetchOptions } = options;

  const url = getFullUrl(route);
  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      ...headers(user || null),
      ...(fetchOptions.headers || {}),
    },
  });

  if (response.status === 401) {
    console.warn("401 Unauthorized detected. Clearing session...");
    // Try to log out globally if the function is available
    const globalWindow = window as unknown as { logout?: () => void };
    if (globalWindow.logout) {
      globalWindow.logout();
    }
  }

  return response;
};
