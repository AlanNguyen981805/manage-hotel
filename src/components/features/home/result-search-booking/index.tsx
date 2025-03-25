"use client";

import { ArrowDown } from "@/assets/svgs/ArrowDown";
import { ROUTES } from "@/constants/routes";
import useDialogStore from "@/store/useDialog";
import useBookingState from "@/store/useRoomState";
import useRoutesStore from "@/store/useRoutesStore";
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

const ResultSearchBooking = memo(() => {
  const router = useRouter();
  const {
    numberOfDays,
    setResultSearchBooking,
    dateCheckIn,
    dateCheckOut,
    numberOfPeople,
    resultSearchBooking,
  } = useBookingState();
  const { dialogStatus, setOpenDialog } = useDialogStore();
  const [formSearchResult, setFormSearchResult] = useState<IFormSearchResult>(
    {}
  );

  const { data } = useRoutesStore();

  const bookingHistory =
    typeof window !== "undefined"
      ? localStorage?.getItem("bookingHistory")
      : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const object = {
      days: formSearchResult,
      created: new Date(),
      numberOfDays,
      dateCheckIn,
      dateCheckOut,
      numberOfPeople,
    };

    setResultSearchBooking(formSearchResult);
    if (!bookingHistory) {
      const arr = [object];
      localStorage?.setItem("bookingHistory", JSON.stringify(arr));
    } else {
      const preBookingHistory = JSON.parse(bookingHistory);
      const newArr = [object, ...preBookingHistory];
      localStorage?.setItem("bookingHistory", JSON.stringify(newArr));
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
        },
      };
    });
  };

  const transformTopOptions = () => {
    if (!data) return [];

    return data.map((route) => ({
      id: route.id.toString(),
      name: route.name,
    }));
  };

  useEffect(() => {
    setFormSearchResult(initialRowData(numberOfDays));
    if (resultSearchBooking.day1) {
      setFormSearchResult(resultSearchBooking);
    }
  }, [numberOfDays, resultSearchBooking]);

  return (
    <div className="flex flex-col items-center justify-center w-full m-2">
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
              className="w-full max-w-4xl max-h-[700px] overflow-y-auto rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex flex-col items-center w-full px-4 ">
                <div className="w-full max-w-4xl mx-auto divide-y divide-black/5 rounded-xl">
                  {Array.from({ length: numberOfDays }, (_, index: number) => {
                    const dayIndex = `day${index + 1}`;

                    return (
                      <Disclosure as="div" className="p-2" key={index}>
                        <DisclosureButton className="flex items-center justify-between w-full group">
                          <div className="flex items-center gap-2">
                            <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
                              <h1 className="text-2xl font-bold w-[100px]">
                                NGÀY {index + 1}
                              </h1>
                            </span>
                            <Dropdown
                              options={[
                                { id: "", name: "Vui lòng chọn" },
                                ...transformTopOptions(),
                              ]}
                              name={`city-${dayIndex}`}
                              value={formSearchResult[dayIndex]?.city.id || ""}
                              onChange={(option) => setArea(option, dayIndex)}
                            />
                          </div>
                          <ArrowDown />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
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
                <hr className="w-full my-2" />
                <button
                  className="bg-accent text-white px-4 rounded-md h-[40px] mb-2"
                  onClick={handleSubmit}
                >
                  Đặt phòng
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
