"use client";

import Dropdown from "@/components/ui/dropdown";
import { Price } from "@/components/ui/price";
import { caculatePriceByRow } from "@/helpers/calc-room-helper";
import useFormSearchResult from "@/hooks/use-search-result";
import useRoutesStore from "@/store/useRoutesStore";
import { Hotel, HotelType } from "@/types/route";
import { useEffect, useState } from "react";
import { BtnAddRow } from "../add-row";
import { IHotel, IPropRowSearch } from "../result-search-booking/defination";
import {
  additionalBeds,
  hotelTypes,
  initialHotelRowData,
  numberOfRooms,
} from "./defination";

export const HoltelRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const { data } = useRoutesStore();

  const [hotelsByRank, setHotelsByRank] = useState<Hotel[]>([]);

  const [hotelTypesOptions, setHotelTypesOptions] = useState<HotelType[]>([]);

  const { handleAddRow, handleChange, handleRemoveRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "hotels",
    initialData: initialHotelRowData,
  });

  const handleChangeRoomType = (
    option: HotelType,
    hotelRow: IHotel,
    rowIndex: number
  ) => {
    const rowTypePrice = Number(option.price_hotels[0].price ?? 0);

    // const rowTypePrice = option.price;
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
    option: { name: string; id: string; price: number; quantity: number },
    hotelRow: IHotel,
    rowIndex: number
  ) => {
    handleChange(dayIndex, rowIndex, "quantityRoom", option);

    if (hotelRow?.roomType?.price_hotels[0]?.price) {
      const result = caculatePriceByRow(
        hotelRow?.roomType?.price_hotels[0]?.price,
        option.quantity,
        hotelRow?.additionalBeds.price,
        hotelRow?.additionalBeds.quantity
      );
      handleChange(dayIndex, rowIndex, "price", result);
    }
  };

  const handleChangeAdditionalBeds = (
    option: { name: string; id: string; price: number; quantity: number },
    hotelRow: IHotel,
    rowIndex: number
  ) => {
    const result = caculatePriceByRow(
      hotelRow?.roomType?.price_hotels[0]?.price,
      hotelRow?.quantityRoom.quantity,
      option.price,
      option.quantity
    );

    handleChange(dayIndex, rowIndex, "additionalBeds", option);
    handleChange(dayIndex, rowIndex, "price", result);
  };

  const handleChangeHotelType = (
    option: {
      name: string;
      id: number;
    },
    rowIndex: number
  ) => {
    const getLocation = data?.find(
      (route) => route.id === Number(formSearchResult[dayIndex].city.id)
    );

    const hotels = getLocation?.location?.hotels ?? [];

    const hotelsByRank = hotels.filter((hotel) => hotel.rank === option.id);

    setHotelsByRank(hotelsByRank);
    handleChange(dayIndex, rowIndex, "hotelType", option);
  };

  const isShowRemoveButton =
    formSearchResult[dayIndex].hotels &&
    formSearchResult[dayIndex].hotels?.length > 1;

  useEffect(() => {
    setHotelsByRank([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSearchResult[dayIndex].city.id]);

  return (
    <div>
      <BtnAddRow name="Hotel" onAddRow={handleAddRow} />

      <div className="flex flex-col justify-between w-full px-2 border-b-2 indexs-center items-center">
        {formSearchResult[dayIndex].hotels?.map((hotelItem, rowIndex) => {
          const hotelRow = formSearchResult[dayIndex].hotels?.[rowIndex];
          if (!hotelRow) return null;
          const expire_date = new Date(
            hotelRow?.hotelName?.expire_date ?? "01/01/2024"
          ).toLocaleDateString("en-US");

          return (
            <div key={rowIndex} className="flex w-full gap-4 my-3">
              <div className="flex flex-col items-start justify-center gap-2 md:w-3/12">
                <p>Loại khách sạn</p>
                <Dropdown
                  options={hotelTypes}
                  name={`hotel-type-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.hotelType.id || ""}
                  onChange={(option) => handleChangeHotelType(option, rowIndex)}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Khách sạn</p>
                <Dropdown
                  options={[
                    { id: 0, name: "Vui lòng chọn", hotel_types: [] },
                    ...hotelsByRank.map((hotel) => ({
                      ...hotel,
                      id: hotel.id,
                      name: hotel.hotel_name,
                    })),
                  ]}
                  name={`hotel-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.hotelName.id || ""}
                  onChange={(option) => {
                    setHotelTypesOptions(option.hotel_types || []);

                    handleChange(dayIndex, rowIndex, "hotelName", option);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Loại phòng</p>
                <Dropdown
                  options={[
                    { id: 0, name: "Vui lòng chọn", price_hotels: [] },
                    ...hotelTypesOptions,
                  ]}
                  name={`room-type-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.roomType.id || ""}
                  onChange={(option) =>
                    handleChangeRoomType(option, hotelRow, rowIndex)
                  }
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Ngày hiệu lực</p>
                <p className="text-lg">{expire_date}</p>
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
                  disabled={
                    hotelItem?.quantityRoom?.quantity > 0 ? false : true
                  }
                />
              </div>
              <Price
                value={hotelRow?.price || 0}
                className="pr-2 md:w-3/12"
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
