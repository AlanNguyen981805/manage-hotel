"use client";

import { ArrowDown } from "@/assets/svgs/ArrowDown";
import { ROUTES } from "@/constants/routes";
import useDialogStore from "@/store/useDialog";
import useBookingState from "@/store/useRoomState";
import useLocationsStore from "@/store/useRoutesStore";
import useUserStore from "@/store/useUserStore";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { AdditinalCosts, Hotel, Service, Transportation } from "..";
import Dropdown from "../../../ui/dropdown";
import { ICity, IFormSearchResult, initialRowData } from "./defination";
import { initialHotelRowData } from "../hotel-form/defination";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";

const ResultSearchBooking = memo(() => {
  const router = useRouter();
  const {
    numberOfDays,
    setResultSearchBooking,
    dateCheckIn,
    dateCheckOut,
    numberOfPeople,
    resultSearchBooking,
    vendor,
  } = useBookingState();
  const { dialogStatus, setOpenDialog } = useDialogStore();
  const { user } = useUserStore();
  const [formSearchResult, setFormSearchResult] = useState<IFormSearchResult>(
    {}
  );

  const { data } = useLocationsStore();

  const [dayRoutes, setDayRoutes] = useState<Record<string, ICity[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const object = {
      days: formSearchResult,
      created: new Date(),
      numberOfDays,
      dateCheckIn,
      dateCheckOut,
      numberOfPeople,
      vendor,
      old_data: {},
    };

    setResultSearchBooking(formSearchResult);

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (user?.documentId) {
      try {
        await apiClient.post(API_ENDPOINTS.HISTORIES, {
          data: {
            code: `BOOKING-${Date.now()}`,
            time_search: new Date().toISOString(),
            history: JSON.stringify(object),
            users_permissions_user: user.id,
            pax: numberOfPeople,
          },
        });
      } catch (error) {
        console.error("Failed to save history to database:", error);
      }
    }

    setOpenDialog(false);
    router.push(ROUTES.BOOKING);
  };

  function close() {
    setOpenDialog(false);
  }

  const setArea = (option: ICity, dayIndex: string) => {
    setFormSearchResult((prevState) => {
      return {
        ...prevState,
        [dayIndex]: {
          ...{
            hotels: [initialHotelRowData],
            transportation: [],
            services: [],
            additionalCosts: [],
          },
          city: option,
          routes: prevState[dayIndex]?.routes,
        },
      };
    });
  };

  const transformListLocationOptions = () => {
    if (!data || !data[0]?.company?.locations) return [];

    return data[0].company.locations.map((location) => ({
      id: location.documentId,
      name: location.location_name,
    }));
  };

  const handleChangeLocation = (option: ICity, dayIndex: string) => {
    setFormSearchResult((prevState) => ({
      ...prevState,
      [dayIndex]: {
        ...prevState[dayIndex],
        routes: option,
      },
    }));

    const findLocation =
      data &&
      data[0].company.locations.find(
        (location) => location.documentId === option.id
      );

    if (findLocation && findLocation.routes) {
      const transformListRoutes = findLocation.routes.map((route) => ({
        id: String(route.documentId),
        documentId: String(route.documentId),
        name: route.name,
        desc: route.description,
        images: route.images,
      }));

      // Store routes for this specific day
      setDayRoutes((prev) => ({
        ...prev,
        [dayIndex]: transformListRoutes,
      }));
    }
  };

  useEffect(() => {
    setFormSearchResult(initialRowData(numberOfDays));
    if (resultSearchBooking.day1) {
      setFormSearchResult(resultSearchBooking);

      // Initialize dayRoutes from history data
      if (data) {
        const newDayRoutes: Record<string, ICity[]> = {};

        Object.keys(resultSearchBooking).forEach((dayIndex) => {
          const routeId = resultSearchBooking[dayIndex]?.routes?.id;
          if (routeId) {
            const findLocation =
              data &&
              data[0].company.locations.find(
                (location) => location.documentId === routeId
              );

            if (findLocation && findLocation.routes) {
              const transformListRoutes = findLocation.routes.map((route) => ({
                id: String(route.documentId),
                name: route.name,
                desc: route.desc,
              }));

              newDayRoutes[dayIndex] = transformListRoutes;
            }
          }
        });

        setDayRoutes(newDayRoutes);
      }
    }
  }, [numberOfDays, resultSearchBooking, data]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Dialog
        open={dialogStatus}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        {/* Add overlay div */}
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 overflow-y-auto">
            <DialogPanel
              transition
              className="w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex flex-col items-center w-full px-6 py-4">
                <div className="w-full max-w-7xl mx-auto divide-y divide-black/5 rounded-xl">
                  {Array.from({ length: numberOfDays }, (_, index: number) => {
                    const dayIndex = `day${index + 1}`;

                    return (
                      <Disclosure as="div" className="p-3" key={index}>
                        <DisclosureButton className="flex items-center justify-between w-full group">
                          <div className="flex items-center gap-3">
                            <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
                              <h1 className="text-2xl font-bold w-[120px]">
                                DAY {index + 1}
                              </h1>
                            </span>
                            <Dropdown
                              options={[
                                { id: "", name: "Please select" },
                                ...transformListLocationOptions(),
                              ]}
                              name={`location-${dayIndex}`}
                              value={
                                formSearchResult[dayIndex]?.routes?.id || ""
                              }
                              onChange={(option) =>
                                handleChangeLocation(option, dayIndex)
                              }
                            />
                            <Dropdown
                              options={[
                                { id: "", name: "Please select" },
                                ...(dayRoutes[dayIndex] || []),
                              ]}
                              name={`city-${dayIndex}`}
                              value={formSearchResult[dayIndex]?.city.id || ""}
                              onChange={(option) => setArea(option, dayIndex)}
                            />
                          </div>
                          <ArrowDown />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-3 text-sm/5 text-black/50">
                          <Hotel
                            dayIndex={dayIndex}
                            setForm={setFormSearchResult}
                            formSearchResult={formSearchResult}
                          />

                          <Transportation
                            dayIndex={dayIndex}
                            setForm={setFormSearchResult}
                            formSearchResult={formSearchResult}
                          />

                          <Service
                            dayIndex={dayIndex}
                            setForm={setFormSearchResult}
                            formSearchResult={formSearchResult}
                          />

                          <AdditinalCosts
                            dayIndex={dayIndex}
                            setForm={setFormSearchResult}
                            formSearchResult={formSearchResult}
                          />
                        </DisclosurePanel>
                      </Disclosure>
                    );
                  })}
                </div>
                <hr className="w-full my-4" />
                <button
                  className="bg-accent text-white px-6 py-2 rounded-md h-[48px] mb-3 text-lg font-medium"
                  onClick={handleSubmit}
                >
                  Book Room
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
});

ResultSearchBooking.displayName = "ResultSearchBooking";

export default ResultSearchBooking;
