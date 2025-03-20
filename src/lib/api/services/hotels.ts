import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";

export interface Hotel {
  id: string;
  name: string;
  type: string;
  price: number;
  // ... other hotel properties
}

export const hotelService = {
  getAll: async () => {
    const response = await apiClient.get<Hotel[]>(API_ENDPOINTS.HOTELS);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Hotel>(API_ENDPOINTS.HOTEL_DETAIL(id));
    return response.data;
  },

  create: async (data: Omit<Hotel, "id">) => {
    const response = await apiClient.post<Hotel>(API_ENDPOINTS.HOTELS, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Hotel>) => {
    const response = await apiClient.put<Hotel>(
      API_ENDPOINTS.HOTEL_DETAIL(id),
      data
    );
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(API_ENDPOINTS.HOTEL_DETAIL(id));
  },
};
