import { getAllUsers } from "../../../core/services/user/user.service";
import type { User } from "../../../core/utils/user.auth";
import { UserRole } from "../../../core/utils/user.auth";

export const getCustomers = async (tokenUser: User | null) => {
  const response = await getAllUsers(tokenUser);
  console.log("API Response:", response); // Check if this is an array or an object

  const clientRole = UserRole.CLIENT;
  console.log("Filtering for role:", clientRole);

  // If response is an object, you might need response.data.filter(...)
  const customers = response.filter((user: User) => {
    console.log(`Checking user ${user.username} with role ${user.role}`);
    return user.role === clientRole;
  });

  console.log("Filtered Customers:", customers);

  return customers;
};
