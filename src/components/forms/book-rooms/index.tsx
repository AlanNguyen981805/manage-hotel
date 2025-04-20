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
    vendor,
  } = useBookingState();
  const { setOpenDialog } = useDialogStore();
  const {
    setLocations: setRoutes,
    setLoading,
    setError,
    loading,
  } = useLocationsStore();
  const { addToast } = useToastStore();
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
      const query = `?populate[routes][populate]=images&populate[hotels][populate][hotel_types][populate][price_hotels][filters][$or][0][start_date][$lte]=${formatDate(
        checkOut
      )}&populate[hotels][populate][hotel_types][populate][price_hotels][filters][$or][0][end_date][$gte]=${formatDate(
        checkIn
      )}&populate[service_routes][populate]&populate[cars][populate][transportation_prices][populate]&populate[company][populate][service_companies][populate]`;
      const response = await apiClient.get<LocationsResponse>(
        `${API_ENDPOINTS.LOCATION}${query}`
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

  // This function will be passed to HistoryBooking component
  const handleHistoryItemClick = async (historyItem: HistoryData) => {
    console.log("historyItem :>> ", historyItem);
    // Extract dates from the history item
    const checkIn = new Date(historyItem.history.dateCheckIn);
    const checkOut = new Date(historyItem.history.dateCheckOut);

    // Update the booking state with these dates
    setDateCheckIn(checkIn);
    setDateCheckOut(checkOut);
    // Fetch routes with these specific dates
    const response = await fetchRoutes(checkIn, checkOut);

    // Create a copy of the history data to update
    const historyData = JSON.parse(
      JSON.stringify(historyItem.history.days)
    ) as IFormSearchResult;

    // Update the history data with the latest route descriptions from the API
    if (response && response.data) {
      // Loop through each day in the history data
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

    // Set the updated history data to the booking state
    setResultSearchBooking(historyData);

    // Open the dialog to show results
    setOpenDialog(true);
  };

  return (
    <div className="h-[260px] px-4 rounded-md flex flex-col justify-center items-center">
      <h1 className="text-4xl font-medium mb-9 text-accent">BOOKING NOW</h1>

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
