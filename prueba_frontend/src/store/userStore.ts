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
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  page: 1,
  limit: 5, // default: 5 usuarios por página
  hasMore: true,
  search: "",
  fetchAll: async (reset = true) => {
    const { page, limit, search } = get();
    set({ loading: true, error: null });

    try {
      const data = await getUsers({ page, limit, search });
      set((state) => ({
        users: reset ? data : [...state.users, ...data],
        hasMore: data.length === limit,
      }));
    } catch (err) {
      set({ error: "Error al cargar usuarios" });
    } finally {
      set({ loading: false });
    }
  },
  setSearch: (term: string) => {
    set({ search: term, page: 1 }); // Reinicia a la página 1
    get().fetchAll(true);
  },
  loadMore: async () => {
    if (!get().hasMore) return;
    set({ page: get().page + 1 });
    await get().fetchAll(false);
  },
}));
