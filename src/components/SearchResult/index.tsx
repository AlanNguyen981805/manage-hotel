"use client";

import useDialogStore from "@/store/useDialog";
import useRoomState from "@/store/useRoomState";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { HoltelRow } from "./components/Hotel";
import { ICityRowData, IHotelRowData } from "./components/Hotel/defination";
import { ServicesRow } from "./components/Services";
import { IServicesRowData } from "./components/Services/defiantion";
import { TransportationRow } from "./components/Transportation";
import { ITransportationRowData } from "./components/Transportation/defination";
import { AdditionalCostsRow } from "./components/AdditionalCosts";
import { IAdditionalCostsRowData } from "./components/AdditionalCosts/defiantion";
import { ArrowDown } from "@/assets/svgs/ArrowDown";
import Dropdown from "../Dropdown";
import { IFormSearchResult } from "./defination";

const SearchResult = () => {
  const { numberOfDays } = useRoomState();
  const { dialogStatus, setOpenDialog } = useDialogStore();

  const [formSearchResult, setFormSearchResult] = useState<IFormSearchResult>(
    {}
  );
  console.log("formSearchResult :>> ", formSearchResult);

  const [hotelRowData, setHotelRowData] = useState<IHotelRowData>({});
  const [transportationRowData, setTransportationRowData] =
    useState<ITransportationRowData>({});
  const [servicesRowData, setServicesRowData] = useState<IServicesRowData>({});
  const [additionalCostsRowData, setAdditionalCostsRowData] =
    useState<IAdditionalCostsRowData>({});
  const [cityRowData, setCityRowData] = useState<ICityRowData>({});

  // Hàm để xử lý submit và in ra lựa chọn của người dùng
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("hotelRowData :>> ", hotelRowData);
    // console.log("transportationRowData :>> ", transportationRowData);
  };

  function open() {
    setOpenDialog(true);
  }

  function close() {
    setOpenDialog(false);
  }

  const cities = [
    { value: "Hà Nội", name: "Hà Nội" },
    { value: "Hồ Chí Minh", name: "Hồ Chí Minh" },
    { value: "Đà Nẵng", name: "Đà Nẵng" },
  ];

  const initialRowData = () => {
    const rowData: IFormSearchResult = {};
    for (let i = 0; i < numberOfDays; i++) {
      rowData[`day${i + 1}`] = {
        city: "",
        hotel: [],
        transportation: [],
        services: [],
        additionalCosts: [],
      };
    }
    return rowData;
  };

  useEffect(() => {
    setFormSearchResult(initialRowData());
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
                  {Array.from(
                    { length: numberOfDays },
                    (_, dayIndex: number) => {
                      const hotelRows = hotelRowData[dayIndex] || []; // Lấy các row cho ngày hiện tại
                      const transportationRows =
                        transportationRowData[dayIndex] || []; // Lấy các row cho ngày hiện tại
                      const servicesRows = servicesRowData[dayIndex] || []; // Lấy các row cho ngày hiện tại
                      const additionalCostsRows =
                        additionalCostsRowData[dayIndex] || []; // Lấy các row cho ngày hiện tại

                      const city = cityRowData[dayIndex] || []; // Lấy các row cho ngày hiện tại

                      const form = formSearchResult[dayIndex] || {};
                      // console.log("form :>> ", formSearchResult);

                      return (
                        <Disclosure as="div" className="p-2" key={dayIndex}>
                          <DisclosureButton className="group flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
                                <h1 className="text-2xl font-bold w-[80px]">
                                  NGÀY {dayIndex + 1}
                                </h1>
                              </span>
                              <Dropdown
                                options={cities}
                                name={`city-${dayIndex}`}
                                value={city?.city || ""}
                                onChange={(value) => {
                                  setCityRowData((prev) => ({
                                    ...prev,
                                    [dayIndex]: {
                                      ...prev[dayIndex],
                                      city: value,
                                    },
                                  }));
                                }}
                              />
                            </div>
                            <ArrowDown />
                          </DisclosureButton>
                          <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
                            <HoltelRow
                              numberOfDays={numberOfDays}
                              setRowData={setHotelRowData}
                              rows={hotelRows}
                              dayIndex={dayIndex}
                              rowData={hotelRowData}
                              form={form}
                              setForm={setFormSearchResult}
                              formSearchResult={formSearchResult}
                            />

                            <TransportationRow
                              numberOfDays={numberOfDays}
                              rowData={transportationRowData}
                              setRowData={setTransportationRowData}
                              rows={transportationRows}
                              dayIndex={dayIndex}
                            />

                            <ServicesRow
                              numberOfDays={numberOfDays}
                              setRowData={setServicesRowData}
                              rows={servicesRows}
                              dayIndex={dayIndex}
                              rowData={servicesRowData}
                            />

                            <AdditionalCostsRow
                              numberOfDays={numberOfDays}
                              setRowData={setAdditionalCostsRowData}
                              rows={additionalCostsRows}
                              dayIndex={dayIndex}
                              rowData={additionalCostsRowData}
                            />
                          </DisclosurePanel>
                        </Disclosure>
                      );
                    }
                  )}
                </div>
                <hr className="w-full my-2" />
                <button className="bg-accent text-white px-4 rounded-md h-[40px] mb-2">
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

export default SearchResult;
