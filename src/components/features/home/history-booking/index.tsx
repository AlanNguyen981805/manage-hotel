"use client";

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import useDialogStore from "@/store/useDialog";
import useBookingState from "@/store/useRoomState";
import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";

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
    days: any;
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
  onHistoryItemClick: (historyData: any) => void;
}

const HistoryBooking = ({ onHistoryItemClick }: HistoryBookingProps) => {
  const { user } = useUserStore();
  const {
    setResultSearchBooking,
    setNumberOfPeople,
    setNumberOfdays,
    isOpenHistory,
  } = useBookingState();
  const { setOpenDialog } = useDialogStore();

  const [codeFilter, setCodeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [histories, setHistories] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistories = async () => {
      if (!user?.documentId) return;

      setLoading(true);
      try {
        const response = await apiClient.get<{ data: HistoryData[] }>(
          `${API_ENDPOINTS.HISTORIES}?filters[users_permissions_user][id][$eq]=${user.id}&populate=users_permissions_user`
        );
        setHistories(response.data.data);
      } catch (error) {
        setError("Failed to fetch histories");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, [user?.documentId]);

  const handleClickHistoryItem = (history: HistoryData) => {
    onHistoryItemClick(history);

    setResultSearchBooking(history.history.days);
  };

  const filteredHistories = histories.filter((history) => {
    console.log("history :>> ", history);
    const matchesCode = history.code
      .toLowerCase()
      .includes(codeFilter.toLowerCase());
    const matchesDate = dateFilter
      ? new Date(history.createdAt).toLocaleDateString().includes(dateFilter)
      : true;
    return matchesCode && matchesDate;
  });

  if (!isOpenHistory || !user?.id) return null;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col w-full px-44 mb-1">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-2">Lọc theo mã booking</h3>
          <input
            type="text"
            value={codeFilter}
            onChange={(e) => setCodeFilter(e.target.value)}
            placeholder="Nhập mã booking..."
            className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
          />
        </div>

        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-2">Lọc theo ngày tạo</h3>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-col gap-2 p-4 max-h-[400px] overflow-y-auto">
          {filteredHistories.length === 0 ? (
            <div className="text-center text-gray-500">Không có lịch sử</div>
          ) : (
            filteredHistories.map((history) => (
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
