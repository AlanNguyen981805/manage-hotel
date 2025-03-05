"use client";

import { ArrowDown } from "@/assets/svgs/ArrowDown";
import useDialogStore from "@/store/useDialog";
import useBookingState from "@/store/useRoomState";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import Dropdown from "../../../ui/dropdown";
import { AdditinalCosts, Hotel, Service, Transportation } from "..";
import { cities, IFormSearchResult, initialRowData } from "./defination";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const ResultSearchBooking = () => {
  const router = useRouter();
  const { numberOfDays, setResultSearchBooking } = useBookingState();
  const { dialogStatus, setOpenDialog } = useDialogStore();
  const [formSearchResult, setFormSearchResult] = useState<IFormSearchResult>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setResultSearchBooking(formSearchResult)

    setOpenDialog(false);
    
    router.push(ROUTES.BOOKING);
  };

  function close() {
    setOpenDialog(false);
  }
  
  const setArea = (city: string, name: string, dayIndex: string) => {
    setFormSearchResult((prevState) => {
      return {
        ...prevState,
        [dayIndex]: {
          ...prevState[dayIndex],
          city: {
            id: city,
            name: name,
          },
        },
      };
    });
  };

  useEffect(() => {
    setFormSearchResult(initialRowData(numberOfDays));
  }, [numberOfDays]);

  return (
    <div className="flex-col flex items-center justify-center w-full m-2">
      <Dialog
        open={dialogStatus}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        {/* Add overlay div */}
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full overflow-y-auto items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl max-h-[700px] overflow-y-auto rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="w-full px-4 items-center flex flex-col ">
                <div className="mx-auto w-full max-w-4xl divide-y divide-black/5 rounded-xl">
                  {Array.from({ length: numberOfDays }, (_, index: number) => {
                    const dayIndex = `day${index + 1}`;

                    return (
                      <Disclosure as="div" className="p-2" key={index}>
                        <DisclosureButton className="group flex w-full items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
                              <h1 className="text-2xl font-bold w-[100px]">
                                NGÀY {index + 1}
                              </h1>
                            </span>
                            <Dropdown
                              options={cities}
                              name={`city-${dayIndex}`}
                              value={formSearchResult[dayIndex]?.city.id || ""}
                              onChange={(value, name) =>
                                setArea(value, name, dayIndex)
                              }
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
                  Đặt Phòng
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ResultSearchBooking;
