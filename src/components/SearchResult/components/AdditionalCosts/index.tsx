"use client";

import Dropdown from "@/components/Dropdown";
import { IPropRowSearch } from "../../defination";
import useFormSearchResult from "../../hooks/useSearchResult";
import { BtnAddRow } from "../BtnAddRow";
import { additionalCosts } from "./defiantion";

export const AdditionalCostsRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const initialData = {
    additionalCostType: "",
    quantity: "",
  };

  const { handleChange, handleAddRow } = useFormSearchResult({ 
    dayIndex, 
    setForm, 
    type: "additionalCosts", 
    initialData 
  })

  return (
    <div>
      <BtnAddRow name="Transportation" onAddRow={handleAddRow} />

      <div className=" w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
        {formSearchResult[dayIndex].additionalCosts?.map((_, rowIndex) => (
          <div key={rowIndex} className="flex mb-3 gap-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Loại chi phí</p>
              <Dropdown
                options={additionalCosts}
                name={`additional-cost-type-${dayIndex}-${rowIndex}`}
                value={formSearchResult[dayIndex].additionalCosts?.[rowIndex]?.additionalCostType || ""}
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "additionalCostType", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Số tiền</p>
              <div>
                <input
                  type="number"
                  id="quantity"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent  focus:border-accent block w-full p-2.5  dark:focus:ring-accent dark:focus:border-accent"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
