import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUsersToCache = async (users: any[]) => {
  try {
    await AsyncStorage.setItem("cachedUsers", JSON.stringify(users));
  } catch (error) {
    console.error("Error al guardar usuarios en caché", error);
  }
};

export const getUsersFromCache = async (): Promise<any[] | null> => {
  try {
    const data = await AsyncStorage.getItem("cachedUsers");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error al leer usuarios desde caché", error);
    return null;
  }
};
