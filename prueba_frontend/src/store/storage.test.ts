import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUsersToCache, getUsersFromCache } from "./storage";
import { mockUsers } from "../utils/mock";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe("storage utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe guardar usuarios en caché correctamente", async () => {
    // Arrange
    const json = JSON.stringify(mockUsers);

    // Act
    await saveUsersToCache(mockUsers);

    // Assert
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("cachedUsers", json);
  });

  test("debe recuperar usuarios desde caché correctamente", async () => {
    // Arrange
    const json = JSON.stringify(mockUsers);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(json);

    // Act
    const result = await getUsersFromCache();

    // Assert
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("cachedUsers");
    expect(result).toEqual(mockUsers);
  });

  test("debe retornar null si no hay datos en caché", async () => {
    // Arrange
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    // Act
    const result = await getUsersFromCache();

    // Assert
    expect(result).toBeNull();
  });

  test("debe manejar errores al guardar en caché", async () => {
    // Arrange
    const error = new Error("Storage error");
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    // Act
    await saveUsersToCache(mockUsers);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error al guardar usuarios en caché",
      error
    );
    consoleSpy.mockRestore();
  });

  test("debe manejar errores al leer desde caché", async () => {
    // Arrange
    const error = new Error("Read error");
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    // Act
    const result = await getUsersFromCache();

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error al leer usuarios desde caché",
      error
    );
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });
});
