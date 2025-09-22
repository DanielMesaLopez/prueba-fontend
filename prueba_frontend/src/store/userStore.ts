import { create } from "zustand";
import { getUsers } from "../application/user/getUsers";
import { User } from "../domain/user";
import { saveUsersToCache } from "./storage";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
  search: string;
  fetchAll: (reset?: boolean) => Promise<void>;
  setSearch: (term: string) => void;
  loadMore: () => Promise<void>;
  loadPrevious: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  page: 1,
  limit: 5,
  hasMore: true,
  search: "",
  fetchAll: async (reset = true) => {
    const { page, limit, search } = get();
    set({ loading: true, error: null });

    try {
      const data = await getUsers({ page, limit, search });

      if (data.length > 0) {
        set({
          users: data,
          hasMore: data.length === limit,
        });
        await saveUsersToCache(data); // guarda en caché
        console.log("Guardando caché para página", data);
      } else {
        // Si no hay datos en la página actual, retrocede y vuelve a intentar
        const previousPage = Math.max(page - 1, 1);
        const fallbackData = await getUsers({
          page: previousPage,
          limit,
          search,
        });

        set({
          page: previousPage,
          users: fallbackData,
          hasMore: false,
        });
      }
    } catch (err) {
      set({ error: "Error al cargar usuarios" });
    } finally {
      set({ loading: false });
    }
  },

  setSearch: (term: string) => {
    set({ search: term, page: 1 });
  },

  loadMore: async () => {
    const { hasMore, page } = get();
    if (!hasMore) return;
    set({ page: page + 2 });
    await get().fetchAll(false);
  },

  loadPrevious: async () => {
    const { page } = get();
    if (page <= 1) return;

    set({ page: page - 1 });
    await get().fetchAll(false);
  },
}));
