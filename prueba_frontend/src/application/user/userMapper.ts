import { User } from "../../domain/user";

export const mapUserFromApi = (data: any): User => ({
  id: data.id,
  name: data.name,
  username: data.username,
  email: data.email,
  address: data.address,
  phone: data.phone,
  website: data.website,
  company: data.company,
});
