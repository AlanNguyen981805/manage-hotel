"use client";

import Dropdown from "@/components/ui/dropdown";
import { Price } from "@/components/ui/price";
import useFormSearchResult from "@/hooks/use-search-result";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useMemo, useState } from "react";
import { BtnAddRow } from "../add-row";
import {
  IPropRowSearch,
  ITransportationMode,
} from "../result-search-booking/defination";
import { initialTransportationRowData } from "./defination";
import useLocationsStore from "@/store/useRoutesStore";
import type { Cars, TransportationPrice } from "@/types/route";

export const TransportationRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const { data } = useLocationsStore();
  const { handleChange, handleAddRow, handleRemoveRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "transportation",
    initialData: initialTransportationRowData,
  });

  const findCompany = data?.find(
    (route) => route.documentId === formSearchResult[dayIndex].routes.id
  );

  const transportationTypes = useMemo(
    () =>
      data?.find(
        (route) => route.documentId === formSearchResult[dayIndex].routes.id
      )?.cars ?? [],
    [data, dayIndex, formSearchResult]
  );

  const deleteRow = (rowIndex: number) => {
    handleRemoveRow(rowIndex);
  };

  const visible =
    formSearchResult[dayIndex]?.transportation &&
    formSearchResult[dayIndex]?.transportation?.length < 1;

  const calculatePrice = (transportationPrice: number) => {
    const mark_tranfer = findCompany?.company?.mark_tranfer ?? 1;
    return transportationPrice * mark_tranfer;
  };

  const handleCarSelection = (car: Cars, rowIndex: number) => {
    const prices = car.transportation_prices || [];
    const firstPrice = prices[0];

    handleChange(
      dayIndex,
      rowIndex,
      "mark_tranfer",
      findCompany?.company?.mark_tranfer ?? 1
    );
    handleChange(dayIndex, rowIndex, "transportationType", {
      id: car.documentId,
      name: car.type_car,
      price: car.car_price,
      transportation_prices: prices,
    });

    if (firstPrice) {
      handleChange(dayIndex, rowIndex, "transportationPrice", firstPrice);
      handleChange(
        dayIndex,
        rowIndex,
        "price",
        calculatePrice(Number(firstPrice.price))
      );
    }
  };

  const handlePriceSelection = (
    price: TransportationPrice,
    rowIndex: number
  ) => {
    console.log("price :>> ", price);
    handleChange(dayIndex, rowIndex, "transportationPrice", price);
    handleChange(
      dayIndex,
      rowIndex,
      "price",
      calculatePrice(Number(price.price))
    );
  };

  return (
    <div>
      <BtnAddRow
        name="Transportation"
        onAddRow={handleAddRow}
        visible={visible}
      />

      <div className="w-full border-b-2 flex flex-col justify-between items-center px-2">
        {formSearchResult[dayIndex].transportation?.map((_, rowIndex) => {
          const transportation =
            formSearchResult[dayIndex].transportation?.[rowIndex];
          const selectedCar = transportationTypes.find(
            (car) => car.documentId === transportation?.transportationType?.id
          );

          return (
            <div
              key={rowIndex}
              className="flex justify-between items-center w-full"
            >
              <div className="flex gap-4 my-3 items-stretch w-full">
                {/* Car Selection */}
                <div className="flex flex-col gap-2 items-center flex-1">
                  <p>Itinerary</p>
                  <Dropdown
                    options={[
                      { id: "", name: "Please select" },
                      ...transportationTypes.map((car) => ({
                        id: car.documentId || "",
                        name: car.type_car,
                        data: car,
                      })),
                    ]}
                    name={`car-${dayIndex}-${rowIndex}`}
                    value={transportation?.transportationType?.id || ""}
                    onChange={(option) =>
                      handleCarSelection(option.data, rowIndex)
                    }
                  />
                </div>

                {/* Price Selection */}
                <div className="flex flex-col gap-2 items-center flex-1">
                  <p>Itinerary Type</p>
                  <Dropdown
                    options={[
                      { id: "", name: "Select price" },
                      ...(selectedCar?.transportation_prices || []).map(
                        (price) => ({
                          id: price.documentId || "",
                          name: `${price.desc} (${price.price})`,
                          data: price,
                        })
                      ),
                    ]}
                    name={`price-${dayIndex}-${rowIndex}`}
                    value={
                      transportation?.transportationPrice?.documentId || ""
                    }
                    onChange={(option) =>
                      handlePriceSelection(option.data, rowIndex)
                    }
                    disabled={!selectedCar}
                  />
                </div>
              </div>

              <Price
                value={transportation?.price || 0}
                className="md:w-2/12 pr-2"
                size="lg"
              />

              <button
                className="hover:text-red-600 px-4"
                onClick={() => deleteRow(rowIndex)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
