"use client";

import useDebounce from "@/hooks/useAebounce";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import useBookingState from "@/store/useRoomState";
import useUserStore from "@/store/useUserStore";
import { useEffect, useState, useMemo } from "react";
import { IFormSearchResult } from "../result-search-booking/defination";
import { Dialog } from "@headlessui/react";
import useToastStore from "@/store/useToastStore";

export interface HistoryData {
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
    vendor: {
      name: string;
      address: string;
      phone: string;
      email: string;
    };
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
  isOpenHistory: boolean;
  setIsOpenHistory: (isOpen: boolean) => void;
}

const HistoryBooking = ({
  onHistoryItemClick,
  isOpenHistory,
  setIsOpenHistory,
}: HistoryBookingProps) => {
  const { user } = useUserStore();
  const { setResultSearchBooking } = useBookingState();
  const { addToast } = useToastStore();

  const [usernameFilter, setUsernameFilter] = useState("");
  const [monthYearFilter, setMonthYearFilter] = useState("");
  const [allHistories, setAllHistories] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the debounce hook for both filters
  const debouncedUsername = useDebounce(usernameFilter, 500);
  const debouncedMonthYear = useDebounce(monthYearFilter, 500);

  const fetchAllHistories = async () => {
    setLoading(true);
    try {
      // Always populate user data
      const queryParams = "?populate=users_permissions_user";

      const response = await apiClient.get<{ data: HistoryData[] }>(
        `${API_ENDPOINTS.HISTORIES}${queryParams}`
      );

      setAllHistories(response.data.data);
    } catch (err) {
      setError("Failed to fetch histories");
      addToast("Không thể tải lịch sử. Vui lòng thử lại sau.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch all data when dialog opens
  useEffect(() => {
    if (isOpenHistory) {
      fetchAllHistories();
    }
  }, [isOpenHistory]);

  // Filter histories based on username and month/year
  const filteredHistories = useMemo(() => {
    return allHistories.filter((history) => {
      // Filter by username if provided
      const usernameMatch =
        !debouncedUsername ||
        history.users_permissions_user?.username
          .toLowerCase()
          .includes(debouncedUsername.toLowerCase());

      // Filter by month/year if provided
      let monthYearMatch = true;
      if (debouncedMonthYear) {
        const historyDate = new Date(history.createdAt);
        const [year, month] = debouncedMonthYear.split("-").map(Number);

        monthYearMatch =
          historyDate.getFullYear() === year &&
          historyDate.getMonth() === month - 1; // JavaScript months are 0-indexed
      }

      return usernameMatch && monthYearMatch;
    });
  }, [allHistories, debouncedUsername, debouncedMonthYear]);

  const handleClickHistoryItem = (history: HistoryData) => {
    onHistoryItemClick(history);
    setResultSearchBooking(history.history.days as IFormSearchResult);
    setIsOpenHistory(false);
    addToast("Applied search from history", "success");
  };

  const handleMonthYearFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMonthYearFilter(e.target.value);
  };

  const closeDialog = () => {
    setIsOpenHistory(false);
  };

  if (!user?.id) return null;

  const dialogContent = () => {
    if (loading) {
      return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 p-4">Error: {error}</div>;
    }

    return (
      <>
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Filter by username</h3>
            <input
              type="text"
              value={usernameFilter}
              onChange={(e) => setUsernameFilter(e.target.value)}
              placeholder="Enter username..."
              className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
            />
          </div>

          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Filter by month/year</h3>
            <input
              type="month"
              value={monthYearFilter}
              onChange={handleMonthYearFilterChange}
              className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="flex flex-col gap-2 p-4 max-h-[400px] overflow-y-auto">
            {filteredHistories.length === 0 ? (
              <div className="text-center text-gray-500">No history found</div>
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
                      Time:{" "}
                      {new Date(history.time_search).toLocaleString("en-US")}
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-sm">
                      People: {history?.history?.numberOfPeople}
                    </div>
                    <div className="text-sm">
                      Days: {history?.history?.numberOfDays}
                    </div>
                    <div className="text-sm">
                      Vendor: {history?.history?.vendor?.name}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <Dialog
      open={isOpenHistory}
      onClose={closeDialog}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900 mb-4"
          >
            Booking History
          </Dialog.Title>

          <div className="mt-2">{dialogContent()}</div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 focus:outline-none"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default HistoryBooking;
