import { create } from "../../../core/services/user/user.service";
import type { UserRegister } from "../../../core/types/auth";
import type { User } from "../../../core/utils/user.auth";

export const createuser = async (
  user: UserRegister,
  tokenUser: User | null,
) => {
  const response = await create(user, tokenUser);
  return response;
};
