"use client";

import Dropdown from "@/components/ui/dropdown";
import { Price } from "@/components/ui/price";
import useFormSearchResult from "@/hooks/use-search-result";
import useLocationsStore from "@/store/useRoutesStore";
import type { Cars, TransportationPrice } from "@/types/route";
import { useEffect, useMemo, useState } from "react";
import { BtnAddRow } from "../add-row";
import { IPropRowSearch } from "../result-search-booking/defination";
import { initialTransportationRowData } from "./defination";

export const TransportationRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const { data } = useLocationsStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const { handleChange, handleAddRow, handleRemoveRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "transportation",
    initialData: initialTransportationRowData,
  });

  const findCompany = data && data[0].company;

  const transportationTypes = useMemo(
    () =>
      data &&
      (data[0].company.locations.find(
        (route) => route.documentId === formSearchResult[dayIndex].routes.id
      )?.cars ??
        []),
    [data, dayIndex, formSearchResult]
  );

  const deleteRow = (rowIndex: number) => {
    handleRemoveRow(rowIndex);
  };

  const calculatePrice = (transportationPrice: number) => {
    const mark_tranfer = findCompany?.mark_tranfer ?? 1;
    return transportationPrice * mark_tranfer;
  };

  const handleCarSelection = (car: Cars, rowIndex: number) => {
    const prices = car.transportation_prices || [];
    const firstPrice = prices[0];

    handleChange(
      dayIndex,
      rowIndex,
      "mark_tranfer",
      findCompany?.mark_tranfer ?? 1
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
    handleChange(dayIndex, rowIndex, "transportationPrice", price);
    handleChange(
      dayIndex,
      rowIndex,
      "price",
      calculatePrice(Number(price.price))
    );
  };

  // Initialize from history
  useEffect(() => {
    if (
      !isInitialized &&
      formSearchResult[dayIndex]?.transportation &&
      formSearchResult[dayIndex]?.transportation?.length > 0
    ) {
      const transportations = formSearchResult[dayIndex].transportation;

      setForm((prevState) => {
        const newState = { ...prevState };
        if (!newState[dayIndex]) {
          newState[dayIndex] = { transportation: [] };
        }
        if (!newState[dayIndex].transportation) {
          newState[dayIndex].transportation = [];
        }

        transportations.forEach((transportationRow, rowIndex) => {
          if (transportationRow.transportationType?.id) {
            // Find transportation from API data
            const selectedTransportation = transportationTypes.find(
              (t) => t.documentId === transportationRow.transportationType.id
            );

            if (selectedTransportation) {
              // Find matching price from API data
              const selectedPrice =
                selectedTransportation.transportation_prices?.find(
                  (p) =>
                    p.documentId ===
                    transportationRow.transportationPrice?.documentId
                );

              if (selectedPrice) {
                // Calculate new price based on API data
                const price = calculatePrice(Number(selectedPrice.price));

                // Update transportation row with new data
                if (!newState[dayIndex].transportation[rowIndex]) {
                  newState[dayIndex].transportation[rowIndex] = {};
                }

                newState[dayIndex].transportation[rowIndex] = {
                  ...transportationRow,
                  transportationType: {
                    id: selectedTransportation.documentId,
                    name: selectedTransportation.type_car,
                    price: selectedTransportation.car_price,
                    transportation_prices:
                      selectedTransportation.transportation_prices,
                  },
                  transportationPrice: selectedPrice,
                  mark_tranfer: findCompany?.company?.mark_tranfer ?? 1,
                  price,
                };
              }
            }
          }
        });

        return newState;
      });

      setIsInitialized(true);
    }
  }, [
    dayIndex,
    formSearchResult,
    isInitialized,
    setForm,
    transportationTypes,
    findCompany?.mark_tranfer,
    calculatePrice,
  ]);

  // Reset when city changes
  useEffect(() => {
    if (formSearchResult[dayIndex].city.id) {
      setIsInitialized(false);
    }
  }, [formSearchResult[dayIndex].city.id]);

  return (
    <div>
      <BtnAddRow name="Transportation" onAddRow={handleAddRow} visible={true} />

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
                          name: price.desc,
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
