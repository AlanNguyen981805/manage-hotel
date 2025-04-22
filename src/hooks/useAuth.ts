import { create } from "zustand";
import { API_ENDPOINTS } from "@/lib/api/config";
import { apiClient } from "@/lib/api/client";
import useUserStore from "@/store/useUserStore";

interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
  };
}

export const useAuth = create((set) => ({
  loading: false,
  error: null,

  login: async (username: string, password: string) => {
    const setUser = useUserStore.getState().setUser;
    set({ loading: true, error: null });

    try {
      // Sử dụng domain hiện tại để login
      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.LOGIN, {
        identifier: username,
        password,
      });

      localStorage.setItem("jwt", response.data.jwt);

      setUser({
        id: response.data.user.id,
        documentId: response.data.user.documentId,
        username: response.data.user.username,
        email: response.data.user.email,
      });

      set({ loading: false });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.error?.status === 400
            ? error.response?.data?.error?.message
            : "Có lỗi xảy ra, vui lòng liên hệ admin",
        loading: false,
      });
      throw error;
    }
  },

  register: async (username: string, email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.REGISTER,
        {
          username,
          email,
          password,
        }
      );

      // Lưu JWT token vào localStorage
      localStorage.setItem("jwt", response.data.jwt);

      // Lưu thông tin user vào state
      set({
        user: response.data.user,
        loading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.error?.status === 400
            ? error.response?.data?.error?.message
            : "Có lỗi xảy ra, vui lòng liên hệ admin",
        loading: false,
      });
      throw error;
    }
  },

  logout: () => {
    const setUser = useUserStore.getState().setUser;
    localStorage.removeItem("jwt");
    setUser(null);
    set({ error: null });
  },

  checkAuth: async () => {
    const setUser = useUserStore.getState().setUser;
    const token = localStorage.getItem("jwt");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      // Sử dụng domain hiện tại để check auth
      const response = await apiClient.get(API_ENDPOINTS.ME);
      setUser({
        id: response.data.id,
        documentId: response.data.documentId,
        username: response.data.username,
        email: response.data.email,
      });
    } catch (error) {
      localStorage.removeItem("jwt");
      setUser(null);
    }
  },
}));
