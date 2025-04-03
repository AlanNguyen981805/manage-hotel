"use client";

import HistoryBooking from "@/components/features/home/history-booking";
import { formatDate } from "@/helpers/date-helper";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import useDialogStore from "@/store/useDialog";
import useBookingState from "@/store/useRoomState";
import useRoutesStore from "@/store/useRoutesStore";
import type { RoutesResponse } from "@/types/route";
import NumberOfPeople from "../../features/home/number-of-people";
import CheckInAndOut from "../../ui/input/checkin-and-out";
import VendorSearch from "@/components/features/home/vendor-search";

const BookRoomForm = () => {
  const {
    getNumberOfDays,
    setResultSearchBooking,
    setOpenHistory,
    isOpenHistory,
    dateCheckIn,
    dateCheckOut,
    setDateCheckIn,
    setDateCheckOut,
  } = useBookingState();
  const { setOpenDialog } = useDialogStore();
  const { setRoutes, setLoading, setError, loading } = useRoutesStore();

  const fetchRoutes = async (
    checkIn = dateCheckIn,
    checkOut = dateCheckOut
  ) => {
    if (!checkIn || !checkOut) {
      return;
    }

    if (getNumberOfDays) {
      getNumberOfDays();
    }
    setResultSearchBooking({});

    setLoading(true);
    try {
      const query = `?populate[location][populate][hotels][populate][hotel_types][populate][price_hotels][filters][$or][0][start_date][$lte]=${formatDate(
        checkOut
      )}&populate[location][populate][hotels][populate][hotel_types][populate][price_hotels][filters][$or][0][end_date][$gte]=${formatDate(
        checkIn
      )}&populate[location][populate][service_routes][fields]=service_code,id,service_price,service_desc&populate[location][populate][cars][fields]=type_car,car_price&populate[location][populate][companies][populate][service_companies][fields]=service_code`;

      const response = await apiClient.get<RoutesResponse>(
        `${API_ENDPOINTS.ROUTES}${query}`
      );

      if (response.data) {
        setRoutes(response.data);
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
      setError("Failed to fetch routes");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckNow = async () => {
    if (!dateCheckIn || !dateCheckOut) {
      return;
    }

    await fetchRoutes();
    setOpenDialog(true);
  };

  const handleOpen = () => {
    // Just toggle the history panel without fetching routes
    setOpenHistory(!isOpenHistory);
  };

  // This function will be passed to HistoryBooking component
  const handleHistoryItemClick = async (historyItem) => {
    console.log("historyItem :>> ", historyItem);
    // Extract dates from the history item
    const checkIn = new Date(historyItem.history.dateCheckIn);
    const checkOut = new Date(historyItem.history.dateCheckOut);

    // Update the booking state with these dates
    setDateCheckIn(checkIn);
    setDateCheckOut(checkOut);

    // Fetch routes with these specific dates
    await fetchRoutes(checkIn, checkOut);

    // Open the dialog to show results
    setOpenDialog(true);
  };

  return (
    <div className="h-[260px] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-medium mb-9 text-accent">ĐẶT PHÒNG NGAY</h1>

      <form className="h-[300px] lg:h-[70px] w-full px-44">
        <div className="flex flex-col w-full h-full lg:flex-row">
          <div className="flex-1 bg-white border-r">
            <CheckInAndOut />
          </div>

          {/* <div className="flex-1 bg-white border-r">
            <NumberOfPeople />
          </div> */}

          <div className="flex-1 bg-white border-r">
            <VendorSearch />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCheckNow}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Now"}
          </button>
          <button
            type="button"
            className="btn btn-primary border-l-[1px]"
            onClick={handleOpen}
            disabled={loading}
          >
            {loading ? "Loading..." : "Lịch sử đặt phòng"}
          </button>
        </div>
      </form>
      <HistoryBooking onHistoryItemClick={handleHistoryItemClick} />
    </div>
  );
};

export default BookRoomForm;
