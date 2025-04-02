"use client";

import useDebounce from "@/hooks/useAebounce";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import useBookingState from "@/store/useRoomState";
import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { IFormSearchResult } from "../result-search-booking/defination";

interface HistoryData {
  id: number;
  documentId: string;
  code: string;
  time_search: string;
  history: {
    dateCheckIn: string;
    dateCheckOut: string;
    numberOfDays: number;
    numberOfPeople: number;
    days: Record<string, unknown>;
  };
  createdAt: string;
  updatedAt: string;
  users_permissions_user: {
    id: number;
    username: string;
    email: string;
  };
}

interface HistoryBookingProps {
  onHistoryItemClick: (historyData: HistoryData) => void;
}

const HistoryBooking = ({ onHistoryItemClick }: HistoryBookingProps) => {
  const { user } = useUserStore();
  const { setResultSearchBooking, isOpenHistory } = useBookingState();

  const [usernameFilter, setUsernameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [histories, setHistories] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the debounce hook for both filters
  const debouncedUsername = useDebounce(usernameFilter, 500);
  const debouncedDate = useDebounce(dateFilter, 500);

  const fetchHistories = async (username?: string, date?: string) => {
    const searchUsername = username || user?.username;
    const searchDate = date || "";

    if (!searchUsername && !searchDate) return;

    setLoading(true);
    try {
      let queryParams = "";

      // Build query based on filters
      if (searchUsername) {
        queryParams = `?filters[users_permissions_user][username][$eq]=${searchUsername}`;
      }

      // Add date filter if present
      if (searchDate) {
        const startDate = new Date(searchDate);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(searchDate);
        endDate.setHours(23, 59, 59, 999);

        const startDateISO = startDate.toISOString();
        const endDateISO = endDate.toISOString();

        const dateQuery = `filters[createdAt][$gte]=${startDateISO}&filters[createdAt][$lte]=${endDateISO}`;

        queryParams = queryParams
          ? `${queryParams}&${dateQuery}`
          : `?${dateQuery}`;
      }

      // Always populate user data
      queryParams = queryParams
        ? `${queryParams}&populate=users_permissions_user`
        : "?populate=users_permissions_user";

      const response = await apiClient.get<{ data: HistoryData[] }>(
        `${API_ENDPOINTS.HISTORIES}${queryParams}`
      );

      setHistories(response.data.data);
    } catch (error) {
      setError("Failed to fetch histories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when debounced values change
  useEffect(() => {
    if (isOpenHistory) {
      fetchHistories(debouncedUsername, debouncedDate);
    }
  }, [debouncedUsername, debouncedDate, isOpenHistory]);

  const handleClickHistoryItem = (history: HistoryData) => {
    onHistoryItemClick(history);
    setResultSearchBooking(history.history.days as IFormSearchResult);
  };

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
  };

  if (!isOpenHistory || !user?.id) return null;

  if (loading) {
    return (
      <div className="flex flex-col w-full px-44 mb-1">
        <div className="text-center p-4">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full px-44 mb-1">
        <div className="text-center text-red-500 p-4">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-44 mb-1">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-2">Lọc theo tên user</h3>
          <input
            type="text"
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
            placeholder="Nhập tên user..."
            className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
          />
        </div>

        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-2">Lọc theo ngày tạo</h3>
          <input
            type="date"
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-col gap-2 p-4 max-h-[400px] overflow-y-auto">
          {histories.length === 0 ? (
            <div className="text-center text-gray-500">Không có lịch sử</div>
          ) : (
            histories.map((history) => (
              <div
                key={history.id}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer"
                onClick={() => handleClickHistoryItem(history)}
              >
                <div className="flex-1">
                  <div className="font-medium">{history.code}</div>
                  <div className="text-sm text-gray-500">
                    Thời gian:{" "}
                    {new Date(history.time_search).toLocaleString("vi-VN")}
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm">
                    Số người: {history.history.numberOfPeople}
                  </div>
                  <div className="text-sm">
                    Số ngày: {history.history.numberOfDays}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryBooking;
