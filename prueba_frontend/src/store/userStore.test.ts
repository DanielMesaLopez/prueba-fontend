import { useUserStore } from "./userStore";
import * as api from "../infrastructure/userApi";

jest.mock("../infrastructure/userApi");

const mockUsers = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  username: `user${i + 1}`,
  email: `user${i + 1}@mail.com`,
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: { lat: "", lng: "" },
  },
  phone: "",
  website: "",
  company: { name: "", catchPhrase: "", bs: "" },
}));

describe("userStore paginación", () => {
  it("debe cargar usuarios por páginas", async () => {
    // Arrange
    (api.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    // Act
    await useUserStore.getState().fetchAll(true); // Página 1
    expect(useUserStore.getState().users).toHaveLength(5);

    await useUserStore.getState().loadMore(); // Página 2
    expect(useUserStore.getState().users).toHaveLength(10);

    // Assert
    expect(useUserStore.getState().hasMore).toBe(false);
  });
});
