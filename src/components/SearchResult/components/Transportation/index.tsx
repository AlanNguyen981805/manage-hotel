"use client";

import Dropdown from "@/components/Dropdown";
import { IPropRowSearch } from "../../defination";
import useFormSearchResult from "../../hooks/useSearchResult";
import { quantities, transportationTypes } from "./defination";
import { BtnAddRow } from "../BtnAddRow";

export const TransportationRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const initialData = {
    transportationType: "",
    quantity: "",
  };

  const { handleChange, handleAddRow } = useFormSearchResult({ 
    dayIndex, 
    setForm, 
    type: "transportation", 
    initialData 
  })

  return (
    <div>
      <BtnAddRow name="Transportation" onAddRow={handleAddRow} />
      <div className=" w-full border-b-2 flex flex-col justify-between indexs-center">
        {formSearchResult[dayIndex].transportation?.map((_, rowIndex) => (
          <div key={rowIndex} className="flex mb- gap-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Loại phương tiện</p>
              <Dropdown
                options={transportationTypes}
                name={`transportation-type-${dayIndex}-${rowIndex}`}
                value={formSearchResult[dayIndex].transportation?.[rowIndex].transportationType || ""}
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "transportationType", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Số lượng phương tiện</p>
              <Dropdown
                options={quantities}
                name={`quantity-${dayIndex}-${rowIndex}`}
                value={formSearchResult[dayIndex].transportation?.[rowIndex]?.quantity || ""}
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
