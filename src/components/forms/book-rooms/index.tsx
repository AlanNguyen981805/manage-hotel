"use client";

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import useDialogStore from "@/store/useDialog";
import useBookingState from "@/store/useRoomState";
import useRoutesStore from "@/store/useRoutesStore";
import type { RoutesResponse } from "@/types/route";
import NumberOfPeople from "../../features/home/number-of-people";
import CheckInAndOut from "../../ui/input/checkin-and-out";

const BookRoomForm = () => {
  const { getNumberOfDays } = useBookingState();
  const { setOpenDialog } = useDialogStore();
  const { setRoutes, setLoading, setError, loading } = useRoutesStore();

  const handleCheckNow = async () => {
    if (getNumberOfDays) {
      getNumberOfDays();
    }

    setLoading(true);
    try {
      const query = `?populate[location][populate][hotels][populate][hotel_types][populate]=price_hotels&populate[location][populate]=service_route`;

      const response = await apiClient.get<RoutesResponse>(
        `${API_ENDPOINTS.ROUTES}${query}`
      );

      if (response.data) {
        console.log("response.data.data :>> ", response.data);
        setRoutes(response.data);
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
      setError("Failed to fetch routes");
    } finally {
      setLoading(false);
      setOpenDialog(true);
    }
  };

  return (
    <div className="h-[260px] flex flex-col justify-center items-center ">
      <h1 className="text-4xl font-medium mb-9 text-accent">BOOK ROOM NOW</h1>

      <form className="h-[300px] lg:h-[70px] w-full px-44">
        <div className="flex flex-col w-full h-full lg:flex-row">
          <div className="flex-1 bg-white border-r">
            <CheckInAndOut />
          </div>

          <div className="flex-1 bg-white border-r">
            <NumberOfPeople />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCheckNow}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookRoomForm;
