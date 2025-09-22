import { create } from "zustand";
import { getUsers } from "../application/user/getUsers";
import { User } from "../domain/user";

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

      // 🔑 Solo actualiza si hay datos o si es la primera página
      if (data.length > 0 || page === 1) {
        set({
          users: data,
          hasMore: data.length === limit, // hay más solo si el lote está completo
        });
      } else {
        // Si no hay datos y no es la página 1, vuelve a la página anterior
        set((state) => ({
          page: Math.max(state.page - 1, 1),
          hasMore: false,
        }));
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
    if (!get().hasMore) return;
    set({ page: get().page + 1 });
    await get().fetchAll(false);
  },

  loadPrevious: async () => {
    const { page } = get();
    if (page <= 1) return;

    set({ page: page - 1 });
    await get().fetchAll(false);
  },
}));
