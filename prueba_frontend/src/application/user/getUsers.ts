import { fetchUsers } from "../../infrastructure/userApi";
import { User } from "../../domain/user";
import { UserQueryParams } from "../../domain/userFilters";
import { mapUserFromApi } from "./userMapper";

export const getUsers = async (params?: UserQueryParams): Promise<User[]> => {
  const response = await fetchUsers();
  let users = response.map(mapUserFromApi);

  // Filtrar por nombre o email si existe search
  if (params?.search) {
    const term = params.search.toLowerCase();
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }

  // Paginación en cliente
  if (params?.page && params?.limit) {
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    users = users.slice(start, end);
  }

  return users;
};
