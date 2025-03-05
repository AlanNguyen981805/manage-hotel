"use client";

import Dropdown from "@/components/ui/dropdown";
import { additionalBeds, hotels, hotelTypes, initialHotelRowData, quantities } from "./defination";
import { IPropRowSearch } from "../result-search-booking/defination";
import { BtnAddRow } from "../add-row";
import useFormSearchResult from "@/hooks/use-search-result";

export const HoltelRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {

  const { handleAddRow, handleChange } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "hotels",
    initialData: initialHotelRowData,
  });

  return (
    <div>
      <BtnAddRow name="Hotel" onAddRow={handleAddRow} />

      <div className=" w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
        {formSearchResult[dayIndex].hotels?.map((hotel, rowIndex) => {
          const hotelRow = formSearchResult[dayIndex].hotels?.[rowIndex];
          
          return (
            <div key={rowIndex} className="flex my-3 gap-4 w-full">
              <div className="flex flex-col gap-2 items-start justify-center md:w-3/12">
                <p>Loại khách sạn</p>
                <Dropdown
                  options={hotelTypes}
                  name={`hotel-type-${dayIndex}-${rowIndex}`}
                  value={
                    hotelRow?.hotelType.id || ""
                  }
                  onChange={(value, name) =>
                    handleChange(dayIndex, rowIndex, "hotelType", value, name)
                  }
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Khách sạn</p>
                <Dropdown
                  options={hotels}
                  name={`hotel-${dayIndex}-${rowIndex}`}
                  value={
                    hotelRow?.hotelName.id || ""
                  }
                  onChange={(value, name) =>
                    handleChange(dayIndex, rowIndex, "hotelName", value, name)
                  }
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Loại phòng</p>
                <Dropdown
                  options={quantities}
                  name={`room-type-${dayIndex}-${rowIndex}`}
                  value={
                    hotelRow?.roomType.id || ""
                  }
                  onChange={(value, name) =>
                    handleChange(dayIndex, rowIndex, "roomType", value, name)
                  }
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Ngày hiệu lực</p>
                <p className="text-lg">
                  {hotelRow?.timeAvailable || "01/01/2024"}
                </p>
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Số lượng phòng</p>
                <Dropdown
                  options={quantities}
                  name={`quantity-room-${dayIndex}-${rowIndex}`}
                  value={
                    hotelRow?.quantityRoom.id || ""
                  }
                  onChange={(value, name) =>
                    handleChange(dayIndex, rowIndex, "quantityRoom", value, name)
                  }
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Số giường thêm</p>
                <Dropdown
                  options={additionalBeds}
                  name={`additional-beds-${dayIndex}-${rowIndex}`}
                  value={
                    hotelRow
                      ?.additionalBeds.id || ""
                  }
                  onChange={(value, name) =>
                    handleChange(dayIndex, rowIndex, "additionalBeds", value, name)
                  }
                />
              </div>
              <div className="flex flex-col gap-2 md:w-3/12 pr-2">
                <p className="text-right">Giá</p>
                <p className="text-right text-lg font-bold">
                  {hotelRow?.price || "100.000đ"}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
