import axios from "axios";
import { fetchUsers } from "./userApi";
import { mockUsers } from "../utils/mock";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchUsers", () => {
  test("debe retornar la lista de usuarios desde el mock", async () => {
    // Arrange: prepara el entorno y los datos simulados
    mockedAxios.get.mockResolvedValue({ data: mockUsers });

    // Act: ejecuta la función que estás probando
    const result = await fetchUsers();

    // Assert: verifica que el resultado sea el esperado
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
    expect(result).toEqual(mockUsers);
    expect(result).toHaveLength(mockUsers.length);
  });
});
