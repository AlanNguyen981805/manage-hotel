import type { Location, LocationsResponse } from "@/types/route";
import { create } from "zustand";

interface LocationsState {
  data: LocationsResponse | null;
  loading: boolean;
  error: string | null;
  selectedLocation: Location | null;

  // Actions
  setLocations: (response: LocationsResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedLocation: (location: Location | null) => void;
  reset: () => void;
}

const useLocationsStore = create<LocationsState>((set) => ({
  data: null,
  loading: false,
  error: null,
  selectedLocation: null,

  setLocations: (response) =>
    set({
      data: response,
      error: null,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setSelectedLocation: (location) => set({ selectedLocation: location }),

  reset: () =>
    set({
      data: null,
      loading: false,
      error: null,
      selectedLocation: null,
    }),
}));

export default useLocationsStore;
