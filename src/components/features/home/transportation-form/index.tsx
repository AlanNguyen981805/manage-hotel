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
import useRoutesStore from "@/store/useRoutesStore";

const plans: ITransportationMode[] = [
  { name: "1 chiều", id: "1", price: 100000 },
  { name: "2 chiều", id: "2", price: 200000 },
];

export const TransportationRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const [selected, setSelected] = useState(plans[0]);
  const { data } = useRoutesStore();

  const transportationTypes = useMemo(() => {
    return (
      data?.find(
        (route) => route.id === Number(formSearchResult[dayIndex].city.id)
      )?.location?.cars ?? []
    );
  }, [data, dayIndex, formSearchResult]);

  const { handleChange, handleAddRow, handleRemoveRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "transportation",
    initialData: initialTransportationRowData,
  });

  const deleteRow = (rowIndex: number) => {
    handleRemoveRow(rowIndex);
  };

  const visible =
    formSearchResult[dayIndex]?.transportation &&
    formSearchResult[dayIndex]?.transportation?.length < 1;

  const calculatePrice = (
    transportationTypePrice: number,
    transportationModePrice: number
  ) => {
    const price = transportationTypePrice + transportationModePrice;
    return price;
  };

  const handleCalculateTransportationPrice = (
    option: { id: string; name: string; price: number },
    rowIndex: number
  ) => {
    console.log("option :>> ", option);
    handleChange(dayIndex, rowIndex, "transportationType", option);
    handleChange(
      dayIndex,
      rowIndex,
      "price",
      calculatePrice(option.price, selected.price)
    );
  };

  const handelChangeTransportation = (
    e: ITransportationMode,
    rowIndex: number,
    transportationTypePrice: number
  ) => {
    setSelected(e);
    handleChange(dayIndex, rowIndex, "transportationMode", e);
    handleChange(
      dayIndex,
      rowIndex,
      "price",
      calculatePrice(transportationTypePrice, e.price)
    );
  };

  return (
    <div>
      <BtnAddRow
        name="Transportation"
        onAddRow={handleAddRow}
        visible={visible}
      />

      <div className="w-full border-b-2 flex flex-col justify-between indexs-center px-2">
        {formSearchResult[dayIndex].transportation?.map((_, rowIndex) => {
          const transportation =
            formSearchResult[dayIndex].transportation?.[rowIndex];

          return (
            <div key={rowIndex} className="flex justify-between items-center">
              <div className="flex mb- gap-4 my-3 items-stretch">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <p>Transportation Type</p>
                  <Dropdown
                    options={[
                      {
                        id: "",
                        name: "Please select",
                        price: 0,
                      },
                      ...transportationTypes?.map((car) => ({
                        id: car.id.toString(),
                        name: car.type_car,
                        price: car.car_price,
                      })),
                    ]}
                    name={`transportation-type-${dayIndex}-${rowIndex}`}
                    value={transportation?.transportationType.id || ""}
                    onChange={(option) => {
                      handleCalculateTransportationPrice(option, rowIndex);
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 items-center justify-center mt-3">
                  <RadioGroup
                    value={selected}
                    onChange={(e) =>
                      handelChangeTransportation(
                        e,
                        rowIndex,
                        transportation?.transportationType.price || 0
                      )
                    }
                    aria-label="Server size"
                    className="flex gap-2 items-center justify-center"
                  >
                    {plans.map((plan) => (
                      <Field key={plan.id} className="flex items-center gap-2">
                        <Radio
                          value={plan}
                          className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
                          disabled={
                            transportationTypes.length > 0 ? false : true
                          }
                        >
                          <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                        </Radio>
                        <Label>{plan.name}</Label>
                      </Field>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <Price
                value={transportation?.price || 0}
                className="md:w-3/12 pr-2"
                size="lg"
              />

              <button
                className="hover:text-red-600"
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
