"use client";

import Dropdown from "@/components/ui/dropdown";
import { quantities, transportationTypes, initialTransportationRowData } from "./defination";
import useFormSearchResult from "@/hooks/use-search-result";
import { IPropRowSearch } from "../result-search-booking/defination";
import { BtnAddRow } from "../add-row";

export const TransportationRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  

  const { handleChange, handleAddRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "transportation",
    initialData: initialTransportationRowData,
  });

  const visible = formSearchResult[dayIndex]?.transportation && formSearchResult[dayIndex]?.transportation?.length < 1;

  return (
    <div>
      <BtnAddRow name="Transportation" onAddRow={handleAddRow} visible={visible} />

      <div className=" w-full border-b-2 flex flex-col justify-between indexs-center">
        {formSearchResult[dayIndex].transportation?.map((_, rowIndex) => {
          const transportation = formSearchResult[dayIndex].transportation?.[rowIndex];

          return (
            <div key={rowIndex} className="flex mb- gap-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Loại phương tiện</p>
              <Dropdown
                options={transportationTypes}
                name={`transportation-type-${dayIndex}-${rowIndex}`}
                value={
                  transportation?.transportationType.id || ""
                }
                onChange={(value, name) =>
                  handleChange(dayIndex, rowIndex, "transportationType", value, name)
                }
              />
            </div>

            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Số lượng phương tiện</p>
              <Dropdown
                options={quantities}
                name={`quantity-${dayIndex}-${rowIndex}`}
                value={
                  transportation?.quantity || ""
                }
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "quantity", value)
                }
              />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
