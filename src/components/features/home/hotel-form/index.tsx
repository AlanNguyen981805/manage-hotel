"use client";

import Dropdown from "@/components/ui/dropdown";
import { NumberInput } from "@/components/ui/number-input";
import { Price } from "@/components/ui/price";
import { caculatePriceByRow } from "@/helpers/calc-room-helper";
import { formatDateNoUtc } from "@/helpers/date-helper";
import useFormSearchResult from "@/hooks/use-search-result";
import useLocationsStore from "@/store/useRoutesStore";
import { HotelType } from "@/types/route";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BtnAddRow } from "../add-row";
import { IHotel, IPropRowSearch } from "../result-search-booking/defination";
import {
  HotelRowState,
  hotelTypes,
  initialHotelRowData,
  IOptionHotel,
  resetHotelData,
} from "./defination";

export const HotelRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const { data: dataRoute } = useLocationsStore();
  const [state, setState] = useState<HotelRowState>({
    hotelsByRank: {},
    hotelTypesOptions: {},
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [priceDefault, setPriceDefault] = useState(0);
  const findCompany = dataRoute?.find(
    (route) => route.documentId === formSearchResult[dayIndex].routes.id
  );
  console.log("findCompany :>> ", findCompany);

  const { handleAddRow, handleChange, handleRemoveRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "hotels",
    initialData: initialHotelRowData,
  });

  // Tách logic tính giá thành một hàm riêng
  const calculatePrice = useCallback(
    (
      roomType: HotelType | undefined,
      quantityRoom: number,
      additionalBeds: number,
      extraPrice: number
    ) => {
      if (!roomType?.price_hotels?.[0]?.price) return 0;

      return calculateTotalPrice({
        basePrice: roomType.price_hotels[0].price,
        quantity: quantityRoom,
        additionalBeds,
        extraPrice,
      });
    },
    []
  );

  // Tách logic xử lý thay đổi số lượng phòng
  const handleQuantityChange = useCallback(
    (
      value: number,
      hotelRow: IHotel,
      rowIndex: number,
      type: "room" | "bed",
      priceDefault: number
    ) => {
      const updatedQuantityRoom =
        type === "room" ? value : hotelRow.quantityRoom;
      const updatedAdditionalBeds =
        type === "bed" ? value : hotelRow.additionalBeds;

      const newPrice = caculatePriceByRow(
        hotelRow?.roomType?.price_hotels[0]?.price ||
          hotelRow.roomType.price_default,
        updatedQuantityRoom,
        hotelRow?.hotelName?.extra_price,
        updatedAdditionalBeds,
        findCompany?.company?.mark_hotel || 1
      );

      setForm((prevState) => {
        const hotels = [...(prevState[dayIndex].hotels || [])];
        hotels[rowIndex] = {
          ...hotelRow,
          [type === "room" ? "quantityRoom" : "additionalBeds"]: value,
          price: newPrice,
        };

        return {
          ...prevState,
          [dayIndex]: {
            ...prevState[dayIndex],
            hotels,
          },
        };
      });
    },
    [dayIndex, setForm]
  );

  // Tách logic khởi tạo dữ liệu từ history
  const initializeFromHistory = useCallback(() => {
    if (
      !isInitialized &&
      formSearchResult[dayIndex]?.hotels &&
      formSearchResult[dayIndex]?.hotels?.length > 0 &&
      dataRoute
    ) {
      console.log("formSearchResult :>> ", formSearchResult);
      const hotels = formSearchResult[dayIndex].hotels;
      const newState: HotelRowState = {
        hotelsByRank: {},
        hotelTypesOptions: {},
      };

      hotels.forEach((hotelRow, rowIndex) => {
        if (hotelRow.hotelType?.id) {
          const location = dataRoute?.find(
            (route) => route.documentId === formSearchResult[dayIndex].routes.id
          );
          const filteredHotels =
            location?.hotels?.filter(
              (hotel) => hotel.rank === Number(hotelRow.hotelType.id)
            ) || [];

          newState.hotelsByRank[rowIndex] = filteredHotels;

          if (hotelRow.hotelName?.id) {
            const selectedHotel = filteredHotels.find(
              (h) => h.documentId === hotelRow.hotelName.id
            );
            if (selectedHotel) {
              newState.hotelTypesOptions[rowIndex] =
                selectedHotel.hotel_types || [];
            }
          }
        }
      });

      setState(newState);
      setIsInitialized(true);

      // Update form với dữ liệu từ history
      setForm((prevState) => {
        const newState = { ...prevState };

        hotels?.forEach((hotelRow, rowIndex) => {
          if (hotelRow.roomType?.id) {
            const selectedHotel = newState.hotelsByRank?.[rowIndex]?.find(
              (h) => h.id === Number(hotelRow.hotelName?.id)
            );
            const selectedRoomType = selectedHotel?.hotel_types?.find(
              (type) => type.id === hotelRow.roomType.id
            );

            if (selectedRoomType) {
              const price = calculatePrice(
                selectedRoomType,
                hotelRow.quantityRoom,
                hotelRow.additionalBeds,
                hotelRow.hotelName?.extra_price || 0
              );

              newState[dayIndex].hotels[rowIndex] = {
                ...hotelRow,
                roomType: selectedRoomType,
                price,
              };
            }
          }
        });
        return newState;
      });
    }
  }, [
    dataRoute,
    dayIndex,
    formSearchResult,
    isInitialized,
    setForm,
    calculatePrice,
  ]);

  useEffect(() => {
    initializeFromHistory();
  }, [initializeFromHistory]);

  // Reset when city changes
  useEffect(() => {
    if (formSearchResult[dayIndex].city.id) {
      setState({ hotelsByRank: {}, hotelTypesOptions: {} });
      setIsInitialized(false);
    }
  }, [formSearchResult[dayIndex].city.id]);

  const handleChangeRoomType = useCallback(
    (option: HotelType, hotelRow: IHotel, rowIndex: number) => {
      const rowTypePrice = Number(
        option.price_hotels[0]?.price
          ? option.price_hotels[0]?.price
          : option.price_default
      );
      const numberOfRooms = hotelRow?.quantityRoom || 1;
      const additionalBedsQuantity = hotelRow?.additionalBeds || 0;

      const newPrice = caculatePriceByRow(
        rowTypePrice,
        numberOfRooms,
        hotelRow?.hotelName?.extra_price,
        additionalBedsQuantity,
        findCompany?.company?.mark_hotel || 1
      );

      handleChange(dayIndex, rowIndex, "roomType", option);
      handleChange(dayIndex, rowIndex, "price", newPrice);
      handleChange(
        dayIndex,
        rowIndex,
        "mark_hotel",
        findCompany?.company?.mark_hotel || 1
      );
    },
    [dayIndex, handleChange]
  );

  const handleChangeHotelType = async (
    option: IOptionHotel,
    rowIndex: number
  ) => {
    const getLocation = dataRoute?.find(
      (route) => route.documentId === formSearchResult[dayIndex].routes.id
    );
    const hotels = getLocation?.hotels ?? [];
    const filteredHotels = hotels.filter((hotel) => hotel.rank === option.id);

    setState((prev) => ({
      ...prev,
      hotelsByRank: {
        ...prev.hotelsByRank,
        [rowIndex]: filteredHotels,
      },
    }));

    await handleChange(dayIndex, rowIndex, "hotelType", option);
    handleChange(
      dayIndex,
      rowIndex,
      "mark_hotel",
      findCompany?.company?.mark_hotel || 1
    );
  };

  // const priceAfterMarkup = (price: number) => {
  //   const findCompany = dataRoute?.find(
  //     (route) => route.documentId === formSearchResult[dayIndex].routes.id
  //   );

  //   const mark_hotel = findCompany?.company?.mark_hotel ?? 1;
  //   const totalPrice = price * mark_hotel;

  //   return totalPrice;
  // };

  const isShowRemoveButton =
    formSearchResult[dayIndex].hotels &&
    formSearchResult[dayIndex].hotels?.length > 1;

  const availableHotelRanks = useMemo(() => {
    const getLocation = dataRoute?.find(
      (route) => route.documentId === formSearchResult[dayIndex].routes.id
    );
    const hotels = getLocation?.hotels ?? [];

    // Extract unique ranks from available hotels
    const uniqueRanks = [...new Set(hotels.map((hotel) => hotel.rank))].filter(
      Boolean
    );

    // Filter hotelTypes to only include available ranks
    return hotelTypes.filter(
      (type) => type.id === 0 || uniqueRanks.includes(type.id)
    );
  }, [dataRoute, formSearchResult, dayIndex]);

  if (availableHotelRanks.length === 1) return null;

  return (
    <div>
      <BtnAddRow name="Hotel" onAddRow={handleAddRow} />

      <div className="flex flex-col justify-between w-full px-2 border-b-2 indexs-center items-center">
        {formSearchResult[dayIndex].hotels?.map((hotelItem, rowIndex) => {
          const hotelRow = formSearchResult[dayIndex].hotels?.[rowIndex];
          if (!hotelRow) return null;

          return (
            <div key={rowIndex} className="flex w-full gap-4 my-3">
              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Hotel Type</p>
                <Dropdown
                  options={availableHotelRanks}
                  name={`hotel-type-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.hotelType?.id || ""}
                  onChange={(option) => handleChangeHotelType(option, rowIndex)}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Hotel</p>
                <Dropdown
                  options={[
                    { id: 0, name: "Please select", hotel_types: [] },
                    ...(state.hotelsByRank[rowIndex] ?? []).map((hotel) => ({
                      ...hotel,
                      id: hotel.documentId,
                      name: hotel.hotel_name,
                    })),
                  ]}
                  name={`hotel-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.hotelName?.id || ""}
                  onChange={async (option) => {
                    setState((pre) => ({
                      ...pre,
                      hotelTypesOptions: {
                        ...pre.hotelTypesOptions,
                        [rowIndex]: option.hotel_types || [],
                      },
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
                <p>Room Type</p>
                <Dropdown
                  options={[
                    { id: 0, name: "Please select" },
                    ...(state.hotelTypesOptions[rowIndex] ?? []).map(
                      (roomType) => ({
                        id: roomType.documentId || "",
                        documentId: roomType.documentId || "",
                        name: roomType.name,
                        price_default: roomType.price_default,
                        price_hotels: roomType.price_hotels || [],
                      })
                    ),
                  ]}
                  name={`room-type-${dayIndex}-${rowIndex}`}
                  value={hotelRow?.roomType?.documentId || ""}
                  onChange={(option) => {
                    setPriceDefault(option.price_default);
                    handleChangeRoomType(option, hotelRow, rowIndex);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <p>Start Date</p>
                <p className="text-lg">
                  {hotelRow.roomType.price_hotels[0]?.start_date
                    ? formatDateNoUtc(
                        new Date(hotelRow.roomType.price_hotels[0]?.start_date)
                      )
                    : ""}
                </p>
              </div>
              <div className="flex flex-col gap-2 md:w-3/12">
                <p>End Date</p>
                <p className="text-lg">
                  {hotelRow.roomType.price_hotels[0]?.end_date
                    ? formatDateNoUtc(
                        new Date(hotelRow.roomType.price_hotels[0]?.end_date)
                      )
                    : ""}
                </p>
              </div>

              <NumberInput
                label="Number of rooms"
                value={hotelRow?.quantityRoom || 1}
                onChange={(value) =>
                  handleQuantityChange(
                    Number(value),
                    hotelRow,
                    rowIndex,
                    "room",
                    priceDefault
                  )
                }
                min={1}
                disabled={!hotelRow?.roomType?.id}
                id={`quantityRoom-${rowIndex}`}
                className="md:w-3/12"
              />

              <NumberInput
                label="Number of extra beds"
                value={hotelRow?.additionalBeds || 0}
                onChange={(value) =>
                  handleQuantityChange(
                    Number(value),
                    hotelRow,
                    rowIndex,
                    "bed",
                    priceDefault
                  )
                }
                min={0}
                disabled={!hotelRow?.roomType?.id}
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
