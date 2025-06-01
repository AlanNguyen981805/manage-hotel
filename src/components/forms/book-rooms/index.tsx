"use client";

import HistoryBooking from "@/components/features/home/history-booking";
import { formatDate } from "@/helpers/date-helper";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import useDialogStore from "@/store/useDialog";
import useBookingState from "@/store/useRoomState";
import useLocationsStore from "@/store/useRoutesStore";
import type { LocationsResponse } from "@/types/route";
import NumberOfPeople from "../../features/home/number-of-people";
import CheckInAndOut from "../../ui/input/checkin-and-out";
import VendorSearch from "@/components/features/home/vendor-search";
import useToastStore from "@/store/useToastStore";
import { HistoryData } from "@/components/features/home/history-booking";
import { IFormSearchResult } from "@/components/features/home/result-search-booking/defination";
import { useVendorStore } from "@/store/useVendorStore";
import useUserStore from "@/store/useUserStore";

const BookRoomForm = () => {
  const { setOpenDialog } = useDialogStore();
  const { addToast } = useToastStore();
  const { vendors } = useVendorStore();
  const { user } = useUserStore();

  const {
    getNumberOfDays,
    setResultSearchBooking,
    setOpenHistory,
    isOpenHistory,
    dateCheckIn,
    dateCheckOut,
    setDateCheckIn,
    setDateCheckOut,
    setNumberOfPeople,
    setVendor,
    vendor,
  } = useBookingState();
  const {
    setLocations: setRoutes,
    setLoading,
    setError,
    loading,
  } = useLocationsStore();

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
      const query = `?filters[username][$eq]=${
        user?.username
      }&populate[company][populate][locations][populate][hotels][populate][hotel_types][populate][price_hotels][filters][$or][0][start_date][$lte]=${formatDate(
        checkOut
      )}&populate[company][populate][locations][populate][hotels][populate][hotel_types][populate][price_hotels][filters][$or][0][end_date][$gte]=${formatDate(
        checkIn
      )}&populate[company][populate][locations][populate][routes][populate]&populate[company][populate][locations][populate][cars][populate][transportation_prices][populate]&populate[company][populate][service_companies][populate]&populate[company][populate][locations][populate][service_routes][populate]`;
      const response = await apiClient.get<LocationsResponse>(
        `${API_ENDPOINTS.USERS}${query}`
      );

      if (response.data) {
        setRoutes(response.data);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching routes:", error);
      setError("Failed to fetch routes");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckNow = async () => {
    if (!dateCheckIn || !dateCheckOut || !vendor) {
      addToast(
        "Please select check in and check out date and vendor",
        "warning"
      );
      return;
    }

    await fetchRoutes();
    setOpenDialog(true);
  };

  const handleHistoryItemClick = async (historyItem: HistoryData) => {
    const checkIn = new Date(historyItem.history.dateCheckIn);
    const checkOut = new Date(historyItem.history.dateCheckOut);

    setDateCheckIn(checkIn);
    setDateCheckOut(checkOut);

    const response = await fetchRoutes(checkIn, checkOut);

    // Create a copy of the history data to update
    const historyData = JSON.parse(
      JSON.stringify(historyItem.history.days)
    ) as IFormSearchResult;

    if (response && response.data) {
      Object.keys(historyData).forEach((dayKey) => {
        const dayData = historyData[dayKey];
        if (dayData.routes && dayData.routes.id) {
          // Find matching route in the fetched data
          const matchedRoute = response.data.find(
            (location) => location.documentId === dayData.routes.id
          );

          // Update route description with the latest data from API
          if (matchedRoute) {
            // Update the routes with latest data
            dayData.routes = {
              ...dayData.routes,
              desc: matchedRoute.description || dayData.routes.desc,
            };

            // If there are city routes, update them too
            if (matchedRoute.routes && dayData.city && dayData.city.id) {
              const matchedCity = matchedRoute.routes.find(
                (route) => String(route.documentId) === dayData.city.id
              );

              if (matchedCity) {
                dayData.city = {
                  ...dayData.city,
                  desc: matchedCity.description || dayData.city.desc,
                };
              }
            }
          }
        }
      });
    }

    const findVendor = vendors.find(
      (vendor) => vendor.documentId === historyItem.history.vendor.documentId
    );

    // Set the updated history data to the booking state
    setResultSearchBooking(historyData);

    setNumberOfPeople(historyItem.history.numberOfPeople);

    setVendor(findVendor || null);
    // Open the dialog to show results
    setOpenDialog(true);
  };

  return (
    <div className="h-[260px] px-4 rounded-md flex flex-col justify-center items-center">
      <h1 className="text-4xl font-medium mb-9 text-white">BOOKING NOW</h1>

      <form className="h-[300px] lg:h-[70px] w-full">
        <div className="flex flex-col w-full h-full lg:flex-row">
          <div className="flex-1 bg-white border-r">
            <CheckInAndOut />
          </div>

          <div className="flex-1 bg-white border-r">
            <NumberOfPeople />
          </div>

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
        </div>
      </form>

      <HistoryBooking
        onHistoryItemClick={handleHistoryItemClick}
        isOpenHistory={isOpenHistory}
        setIsOpenHistory={setOpenHistory}
      />
    </div>
  );
};

export default BookRoomForm;
