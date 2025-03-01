"use client";

import useRoomState from "@/store/useRoomState";
import { useState } from "react";
import { HoltelRow } from "./components/Hotel";
import { TransportationRow } from "./components/Transportation";

const SearchResult = () => {
  const { numberOfDays } = useRoomState();

  const [transportationSelectedOptions, setTransportationSelectedOptions] =
    useState<any>({});

  const [hotelRowData, setHotelRowData] = useState<any>({});
  const [transportationRowData, setTransportationRowData] = useState<{
    [key: number]: any[];
  }>({});

  console.log("hotelRowData :>> ", hotelRowData);

  // Hàm để xử lý submit và in ra lựa chọn của người dùng
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ transportationSelectedOptions });
  };

  return (
    <div className="flex-col flex items-center justify-center w-full mt-2">
      <form onSubmit={handleSubmit} className="container flex-col flex">
        {Array.from({ length: numberOfDays }, (_, dayIndex: number) => {
          const hotelRows = hotelRowData[dayIndex] || []; // Lấy các row cho ngày hiện tại
          const transportationRows = transportationRowData[dayIndex] || []; // Lấy các row cho ngày hiện tại

          return (
            <div className=" mb-2 bg-blue-300" key={dayIndex}>
              <h1>Day {dayIndex + 1}</h1>

              <HoltelRow
                numberOfDays={numberOfDays}
                setRowData={setHotelRowData}
                rows={hotelRows}
                dayIndex={dayIndex}
                rowData={hotelRowData}
              />
              <hr />

              <TransportationRow
                numberOfDays={numberOfDays}
                rowData={transportationRowData}
                setRowData={setTransportationRowData}
                rows={transportationRows}
                dayIndex={dayIndex}
              />
              <hr />
            </div>
          );
        })}

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 mt-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchResult;
