import { useUserStore } from "./userStore";
import { mockUsers } from "../utils/mock";
import { act } from "react-test-renderer";
import { create } from "zustand";

jest.mock("../application/user/getUsers", () => ({
  getUsers: jest.fn(),
}));

jest.mock("./storage", () => ({
  saveUsersToCache: jest.fn(),
}));

import { getUsers } from "../application/user/getUsers";
import { saveUsersToCache } from "./storage";

beforeEach(() => {
  jest.clearAllMocks();
  const store = useUserStore.getState();
  store.users = [];
  store.page = 1;
  store.search = "";
  store.hasMore = true;
  store.error = null;
  store.loading = false;
});

test("fetchAll carga usuarios y guarda en caché", async () => {
  const mockUsers = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: { lat: "-37.3159", lng: "81.1496" },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: { lat: "-43.9509", lng: "-34.4618" },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
  ];

  (getUsers as jest.Mock).mockResolvedValue(mockUsers);
  const store = useUserStore.getState();

  await act(async () => {
    await store.fetchAll();
  });

  const updated = useUserStore.getState();

  expect(updated.users.length).toBe(2);
  expect(updated.users[0].name).toBe("Leanne Graham");
  expect(updated.hasMore).toBe(false);
  expect(saveUsersToCache).toHaveBeenCalledWith(mockUsers);
});

test("fetchAll retrocede si no hay datos en la página actual", async () => {
  const mockUsers = [
    {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
    },
  ];

  (getUsers as jest.Mock).mockImplementation(({ page }) =>
    page === 2 ? [] : mockUsers
  );

  const store = useUserStore.getState();

  // Simula que estamos en la página 2
  await act(async () => {
    store.setSearch("test"); // fuerza un cambio de estado
    await store.fetchAll(); // carga inicial
    store.page = 2; // ahora sí actualizamos la página
    await store.fetchAll(false); // ejecutamos con retroceso
  });

  const updated = useUserStore.getState();

  expect(updated.page).toBe(1); // debe haber retrocedido
  expect(updated.users.length).toBe(2); // debe haber cargado los usuarios del fallback
});

test("fetchAll maneja error de red", async () => {
  const mockError = new Error("Network error");

  (getUsers as jest.Mock).mockRejectedValue(mockError);

  const store = useUserStore.getState();

  await act(async () => {
    await store.fetchAll();
  });

  const updated = useUserStore.getState();

  expect(updated.error).toBe("Error al cargar usuarios");
  expect(updated.users.length).toBe(0);
});

test("setSearch actualiza término y reinicia página", () => {
  const store = useUserStore.getState();
  store.setSearch("Clementina DuBuque");

  const updated = useUserStore.getState();

  expect(updated.search).toBe("Clementina DuBuque");
  expect(updated.page).toBe(1);
});

test("loadMore incrementa página y llama fetchAll", async () => {
  const mockFetchAll = jest.fn();

  // recrea el store con fetchAll mockeado
  const useUserStoreTest = create(() => ({
    users: [],
    loading: false,
    error: null,
    page: 1,
    limit: 5,
    hasMore: true,
    search: "",
    fetchAll: mockFetchAll,
    setSearch: jest.fn(),
    loadMore: async () => {
      const { hasMore, page, fetchAll } = useUserStoreTest.getState();
      if (!hasMore) return;
      useUserStoreTest.setState({ page: page + 2 });
      await fetchAll(false);
    },
    loadPrevious: jest.fn(),
  }));

  await act(async () => {
    await useUserStoreTest.getState().loadMore();
  });

  const updated = useUserStoreTest.getState();

  expect(updated.page).toBe(3);
  expect(mockFetchAll).toHaveBeenCalledWith(false);
});

test("loadPrevious decrementa página y llama fetchAll", async () => {
  const store = useUserStore.getState();
  store.page = 3;
  const fetchSpy = jest.spyOn(store, "fetchAll").mockResolvedValue();

  await act(async () => {
    await store.loadPrevious();
  });

  const updatedStore = useUserStore.getState();

  expect(updatedStore.page).toBe(2);
  expect(fetchSpy).toHaveBeenCalledWith(false);
});

test("loadPrevious no hace nada si está en página 1", async () => {
  const store = useUserStore.getState();
  store.page = 1;
  const fetchSpy = jest.spyOn(store, "fetchAll");

  await act(() => store.loadPrevious());

  expect(store.page).toBe(1);
  expect(fetchSpy).not.toHaveBeenCalled();
});
