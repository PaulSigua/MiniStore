import type { User } from "./user.auth";

export const setUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
    localStorage.removeItem("user");
};
