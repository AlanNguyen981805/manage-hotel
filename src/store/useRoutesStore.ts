import { create } from "zustand";
import type { RoutesResponse, Route } from "@/types/route";

interface RoutesState {
  data: Route[] | null;
  meta: RoutesResponse["meta"] | null;
  loading: boolean;
  error: string | null;
  selectedRoute: Route | null;

  // Actions
  setRoutes: (response: RoutesResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedRoute: (route: Route | null) => void;
  reset: () => void;
}

const useRoutesStore = create<RoutesState>((set) => ({
  data: null,
  meta: null,
  loading: false,
  error: null,
  selectedRoute: null,

  setRoutes: (response) =>
    set({
      data: response.data,
      meta: response.meta,
      error: null,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setSelectedRoute: (route) => set({ selectedRoute: route }),

  reset: () =>
    set({
      data: null,
      meta: null,
      loading: false,
      error: null,
      selectedRoute: null,
    }),
}));

export default useRoutesStore;
