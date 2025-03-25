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
import { hotelTypes, initialHotelRowData, resetHotelData } from "./defination";
import useBookingState from "@/store/useRoomState";
import { NumberInput } from "@/components/ui/number-input";

export const HoltelRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const { data } = useRoutesStore();

  const [hotelsByRank, setHotelsByRank] = useState<{ [key: number]: Hotel[] }>(
    {}
  );

  const [hotelTypesOptions, setHotelTypesOptions] = useState<{
    [key: number]: HotelType[];
  }>({});
  const {} = useBookingState();

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
    const rowTypePrice = Number(option.price_hotels[0]?.price ?? 0);

    // const rowTypePrice = option.price;
    const numberOfRooms = hotelRow?.quantityRoom;
    const additionalBedsQuantity = hotelRow?.additionalBeds;

    handleChange(dayIndex, rowIndex, "roomType", option);

    const result = caculatePriceByRow(
      rowTypePrice,
      numberOfRooms,
      additionalBedsQuantity
    );

    handleChange(dayIndex, rowIndex, "price", result);
  };

  const handleChangeNumberOfRooms = (
    quantity: string,
    hotelRow: IHotel,
    rowIndex: number
  ) => {
    handleChange(dayIndex, rowIndex, "quantityRoom", Number(quantity));

    if (hotelRow?.roomType?.price_hotels[0]?.price) {
      const result = caculatePriceByRow(
        hotelRow?.roomType?.price_hotels[0]?.price,
        Number(quantity ?? 0),
        hotelRow?.additionalBeds
      );
      handleChange(dayIndex, rowIndex, "price", result);
    }
  };

  const handleChangeAdditionalBeds = (
    quantity: string,
    hotelRow: IHotel,
    rowIndex: number
  ) => {
    const result = caculatePriceByRow(
      hotelRow?.roomType?.price_hotels[0]?.price,
      hotelRow?.quantityRoom,
      hotelRow?.hotelName?.extra_price,
      Number(quantity ?? 0)
    );

    handleChange(dayIndex, rowIndex, "additionalBeds", Number(quantity ?? 0));
    handleChange(dayIndex, rowIndex, "price", result);
  };

  const handleChangeHotelType = async (
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

    setHotelsByRank((pre) => ({
      ...pre,
      [rowIndex]: hotelsByRank,
    }));
    await handleChange(dayIndex, rowIndex, "hotelType", option);
    await setForm((prevState) => {
      const prevHotel = prevState[dayIndex]["hotels"] ?? [];
      const updatedData = [...prevHotel];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        ...resetHotelData,
        hotelName: { id: "", name: "" },
        roomType: {
          id: "",
          name: "",
          price: 0,
          price_hotels: [],
        },
      };
      return {
        ...prevState,
        [dayIndex]: {
          ...prevState[dayIndex],
          hotels: updatedData,
        },
      };
    });
  };

  const isShowRemoveButton =
    formSearchResult[dayIndex].hotels &&
    formSearchResult[dayIndex].hotels?.length > 1;

  useEffect(() => {
    setHotelsByRank({});
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
                    ...(hotelsByRank[rowIndex] ?? []).map((hotel) => ({
                      ...hotel,
                      id: hotel.id,
                      name: hotel.hotel_name,
                    })),
                  ]}
                  name={`hotel-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.hotelName.id || ""}
                  onChange={async (option) => {
                    setHotelTypesOptions((pre) => ({
                      ...pre,
                      [rowIndex]: option.hotel_types || [],
                    }));

                    await handleChange(dayIndex, rowIndex, "hotelName", option);

                    await setForm((prevState) => {
                      const prevHotel = prevState[dayIndex]["hotels"] ?? [];
                      const updatedData = [...prevHotel];
                      updatedData[rowIndex] = {
                        ...updatedData[rowIndex],
                        ...resetHotelData,
                        roomType: {
                          id: "",
                          name: "",
                          price: 0,
                          price_hotels: [],
                        },
                      };
                      return {
                        ...prevState,
                        [dayIndex]: {
                          ...prevState[dayIndex],
                          hotels: updatedData,
                        },
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Loại phòng</p>
                <Dropdown
                  options={[
                    { id: 0, name: "Vui lòng chọn", price_hotels: [] },
                    ...(hotelTypesOptions[rowIndex] ?? []),
                  ]}
                  name={`room-type-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.roomType.id || ""}
                  onChange={async (option) => {
                    await handleChangeRoomType(option, hotelRow, rowIndex);
                    await setForm((prevState) => {
                      const prevHotel = prevState[dayIndex]["hotels"] ?? [];
                      const updatedData = [...prevHotel];
                      updatedData[rowIndex] = {
                        ...updatedData[rowIndex],
                        ...resetHotelData,
                      };
                      return {
                        ...prevState,
                        [dayIndex]: {
                          ...prevState[dayIndex],
                          hotels: updatedData,
                        },
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Ngày hiệu lực</p>
                <p className="text-lg">{expire_date}</p>
              </div>

              <NumberInput
                label="Số lượng phòng"
                value={hotelRow?.quantityRoom}
                onChange={(value) =>
                  handleChangeNumberOfRooms(value, hotelRow, rowIndex)
                }
                min={1}
                disabled={!hotelItem?.roomType?.createdAt}
                id={`quantityRoom-${rowIndex}`}
                className="md:w-3/12"
              />

              <NumberInput
                label="Số giường thêm"
                value={hotelRow?.additionalBeds || 0}
                onChange={(value) =>
                  handleChangeAdditionalBeds(value, hotelRow, rowIndex)
                }
                min={0}
                disabled={!hotelItem?.roomType?.createdAt}
                id={`additionalBeds-${rowIndex}`}
                className="md:w-3/12"
              />

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
