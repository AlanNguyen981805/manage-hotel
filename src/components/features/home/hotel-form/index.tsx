"use client";

import Dropdown from "@/components/ui/dropdown";
import { additionalBeds, hotels, hotelTypes, quantities } from "./defination";
import { IPropRowSearch } from "../result-search-booking/defination";
import { BtnAddRow } from "../add-row";
import useFormSearchResult from "@/hooks/use-search-result";

export const HoltelRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const initialData = {
    hotelType: "",
    hotel: "",
    quantity: "",
    additionalBeds: "",
  };

  const { handleAddRow, handleChange } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "hotel",
    initialData,
  });

  return (
    <div>
      <BtnAddRow name="Hotel" onAddRow={handleAddRow} />

      <div className=" w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
        {formSearchResult[dayIndex].hotel?.map((hotel, rowIndex) => (
          <div key={rowIndex} className="flex my-3 gap-4 w-full">
            <div className="flex flex-col gap-2 items-start justify-center md:w-3/12">
              <p>Loại khách sạn</p>
              <Dropdown
                options={hotelTypes}
                name={`hotel-type-${dayIndex}-${rowIndex}`}
                value={
                  formSearchResult[dayIndex].hotel?.[rowIndex]?.hotelType || ""
                }
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "hotelType", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
              <p>Khách sạn</p>
              <Dropdown
                options={hotels}
                name={`hotel-${dayIndex}-${rowIndex}`}
                value={
                  formSearchResult[dayIndex].hotel?.[rowIndex]?.hotel || ""
                }
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "hotel", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
              <p>Loại phòng</p>
              <Dropdown
                options={quantities}
                name={`quantity-${dayIndex}-${rowIndex}`}
                value={
                  formSearchResult[dayIndex].hotel?.[rowIndex]?.quantity || ""
                }
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "quantity", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
              <p>Ngày hiệu lực</p>
              <Dropdown
                options={quantities}
                name={`quantity-${dayIndex}-${rowIndex}`}
                value={
                  formSearchResult[dayIndex].hotel?.[rowIndex]?.quantity || ""
                }
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "quantity", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
              <p>Số lượng phòng</p>
              <Dropdown
                options={quantities}
                name={`quantity-${dayIndex}-${rowIndex}`}
                value={
                  formSearchResult[dayIndex].hotel?.[rowIndex]?.quantity || ""
                }
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "quantity", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
              <p>Số giường thêm</p>
              <Dropdown
                options={additionalBeds}
                name={`additional-beds-${dayIndex}-${rowIndex}`}
                value={
                  formSearchResult[dayIndex].hotel?.[rowIndex]
                    ?.additionalBeds || ""
                }
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "quantity", value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
