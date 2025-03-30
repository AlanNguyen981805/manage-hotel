import { create } from "zustand";

// Định nghĩa kiểu dữ liệu cho User
interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
}

// Định nghĩa kiểu dữ liệu cho State
interface UserState {
  // State
  user: User | null;
  loading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
  reset: () => void;
}

// Tạo store
const useUserStore = create<UserState>((set) => ({
  // Initial state
  user: null,
  loading: false,
  error: null,

  // Actions
  setUser: (user) =>
    set({
      user,
      error: null,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setError: (error) =>
    set({
      error,
    }),

  clearUser: () =>
    set({
      user: null,
      error: null,
    }),

  reset: () =>
    set({
      user: null,
      loading: false,
      error: null,
    }),
}));

export default useUserStore;
