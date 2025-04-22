import { create } from "zustand";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import { AxiosError } from "axios";

interface Vendor {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  documentId: string;
}

interface CreateVendorForm {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface VendorState {
  vendors: Vendor[];
  selectedVendor: Vendor | null;
  loading: boolean;
  error: string | null;
  // Actions
  fetchVendors: () => Promise<void>;
  createVendor: (formData: CreateVendorForm) => Promise<void>;
  updateVendor: (vendorId: string, formData: CreateVendorForm) => Promise<void>;
  selectVendor: (vendor: Vendor) => void;
  clearSelectedVendor: () => void;
}

export const useVendorStore = create<VendorState>((set, get) => ({
  vendors: [],
  selectedVendor: null,
  loading: false,
  error: null,

  fetchVendors: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.VENDORS}`);
      set({ vendors: response.data.data, loading: false });
    } catch (error) {
      console.error("Error fetching vendors:", error);
      set({
        error: "Failed to fetch vendors",
        loading: false,
      });
    }
  },

  createVendor: async (formData: CreateVendorForm) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post(API_ENDPOINTS.VENDORS, {
        data: formData,
      });
      set((state) => ({
        vendors: [...state.vendors, response.data.data],
        loading: false,
      }));
    } catch (error) {
      console.error("Error creating vendor:", error);
      if (error instanceof AxiosError) {
        set({
          error:
            error.response?.data.error.status === 400
              ? "Name or Phone And Email must be unique"
              : "Failed to create vendor",
          loading: false,
        });
      } else {
        set({
          error: "Failed to create vendor",
          loading: false,
        });
      }
    }
  },

  updateVendor: async (vendorId: string, formData: CreateVendorForm) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.put(
        `${API_ENDPOINTS.VENDORS}/${vendorId}`,
        { data: formData }
      );

      set((state) => ({
        vendors: state.vendors.map((vendor) =>
          vendor.documentId === vendorId ? response.data.data : vendor
        ),
        selectedVendor:
          state.selectedVendor?.documentId === vendorId
            ? response.data.data
            : state.selectedVendor,
        loading: false,
      }));
    } catch (error) {
      console.error("Error updating vendor:", error);
      set({
        error: "Failed to update vendor",
        loading: false,
      });
    }
  },

  selectVendor: (vendor: Vendor) => {
    set({ selectedVendor: vendor });
  },

  clearSelectedVendor: () => {
    set({ selectedVendor: null });
  },
}));
