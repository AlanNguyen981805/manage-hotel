"use client";

import Dropdown from "@/components/ui/dropdown";
import { Price } from "@/components/ui/price";
import { caculatePriceByRow } from "@/helpers/calc-room-helper";
import useFormSearchResult from "@/hooks/use-search-result";
import { useState } from "react";
import { BtnAddRow } from "../add-row";
import { IHotel, IHotelType, IPropRowSearch } from "../result-search-booking/defination";
import {
  additionalBeds,
  hotels,
  hotelTypes,
  initialHotelRowData,
  numberOfRooms,
  roomTypes,
} from "./defination";

export const HoltelRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const [hotelTypeOptions] = useState(hotelTypes);

  const { handleAddRow, handleChange, handleRemoveRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "hotels",
    initialData: initialHotelRowData,
  });

  const handleChangeRoomType = (
    option: {name: string, id: string, price: number},
    hotelRow: IHotel,
    rowIndex: number
  ) => {
    const rowTypePrice = option.price;
    const numberOfRooms = hotelRow?.quantityRoom.quantity;
    const additionalBedsPrice = hotelRow?.additionalBeds.price;
    const additionalBedsQuantity = hotelRow?.additionalBeds.quantity;

    handleChange(dayIndex, rowIndex, "roomType", option);

    const result = caculatePriceByRow(
      rowTypePrice,
      numberOfRooms,
      additionalBedsPrice,
      additionalBedsQuantity
    );

    handleChange(dayIndex, rowIndex, "price", result);
  };

  const handleChangeNumberOfRooms = (
    option: {name: string, id: string, price: number, quantity: number},
    hotelRow: IHotel,
    rowIndex: number
  ) => {
    handleChange(dayIndex, rowIndex, "quantityRoom", option);

    if (hotelRow?.roomType?.price) {
      const result = caculatePriceByRow(
        hotelRow?.roomType?.price,
        option.quantity,
        hotelRow?.additionalBeds.price,
        hotelRow?.additionalBeds.quantity
      );
      handleChange(dayIndex, rowIndex, "price", result);
    }
  };

  const handleChangeAdditionalBeds = (
    option: {name: string, id: string, price: number, quantity: number},
    hotelRow: IHotel,
    rowIndex: number
  ) => {
    const result = caculatePriceByRow(
      hotelRow?.roomType?.price,
      hotelRow?.quantityRoom.quantity,
      option.price,
      option.quantity
    );

    handleChange(dayIndex, rowIndex, "additionalBeds", option);
    handleChange(dayIndex, rowIndex, "price", result);
  };

  const handleChangeHotelType = (option: IHotelType, rowIndex: number) => {
    handleChange(dayIndex, rowIndex, "hotelType", option);
  };

  const getHotelOptions = (hotelType: IHotelType) => {
    if (!hotelType?.id) return [];
    
    return hotels.filter((hotel) => hotel.hotelType === Number(hotelType.id));
  };

  const isShowRemoveButton =
    formSearchResult[dayIndex].hotels &&
    formSearchResult[dayIndex].hotels?.length > 1;

  return (
    <div>
      <BtnAddRow name="Hotel" onAddRow={handleAddRow} />

      <div className=" w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
        {formSearchResult[dayIndex].hotels?.map((hotel, rowIndex) => {
          const hotelRow = formSearchResult[dayIndex].hotels?.[rowIndex];
          const filteredHotels = getHotelOptions(hotelRow?.hotelType || { id: "", name: "" });

          if (!hotelRow) return null;

          return (
            <div key={rowIndex} className="flex my-3 gap-4 w-full">
              <div className="flex flex-col gap-2 items-start justify-center md:w-3/12">
                <p>Loại khách sạn</p>
                <Dropdown
                  options={hotelTypeOptions}
                  name={`hotel-type-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.hotelType.id || ""}
                  onChange={(option) => handleChangeHotelType(option, rowIndex)}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Khách sạn</p>
                <Dropdown
                  options={filteredHotels}
                  name={`hotel-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.hotelName.id || ""}
                  onChange={(option) => {
                    console.log("option :>> ", option);
                    handleChange(dayIndex, rowIndex, "hotelName", option);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Loại phòng</p>
                <Dropdown
                  options={roomTypes}
                  name={`room-type-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.roomType.id || ""}
                  onChange={(option) =>
                    handleChangeRoomType(option, hotelRow, rowIndex)
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
                  options={numberOfRooms}
                  name={`quantity-room-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.quantityRoom.id || ""}
                  onChange={(option) => {
                    handleChangeNumberOfRooms(option, hotelRow, rowIndex);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Số giường thêm</p>
                <Dropdown
                  options={additionalBeds}
                  name={`additional-beds-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.additionalBeds.id || ""}
                  onChange={(option) => {
                    handleChangeAdditionalBeds(option, hotelRow, rowIndex);
                  }}
                />
              </div>
              <Price
                value={hotelRow?.price || 0}
                className="md:w-3/12 pr-2"
                size="lg"
              />

              {isShowRemoveButton && (
                <button onClick={() => handleRemoveRow(rowIndex)}>
                  Remove
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
