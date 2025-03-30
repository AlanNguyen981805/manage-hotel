import { useState } from "react";
import useUserStore from "@/store/useUserStore";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";

export const useUserInput = () => {
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUserSubmit = async (name: string) => {
    try {
      setLoading(true);
      setError(null);

      // Kiểm tra user có tồn tại không
      try {
        const userResponse = await apiClient.get(
          `${API_ENDPOINTS.USER_HISTORY(name)}`
        );

        if (userResponse.data) {
          // User đã tồn tại, lưu vào store
          setUser({
            documentId: userResponse.data.documentId,
            name_user: name,
            createdAt: userResponse.data.createdAt,
            updatedAt: userResponse.data.updatedAt,
          });
          return true;
        }
      } catch (error) {
        // User chưa tồn tại, tạo mới
        const newUserResponse = await apiClient.post(
          API_ENDPOINTS.USER_HISTORIES,
          {
            data: {
              name_user: name,
            },
          }
        );

        // Lưu user mới vào store
        setUser({
          documentId: newUserResponse.data.documentId,
          name_user: name,
          createdAt: newUserResponse.data.createdAt,
          updatedAt: newUserResponse.data.updatedAt,
        });
        return true;
      }
    } catch (error) {
      setError("Có lỗi xảy ra khi xử lý thông tin người dùng");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleUserSubmit,
  };
};
