"use client";

import Dropdown from "@/components/ui/dropdown";
import useFormSearchResult from "@/hooks/use-search-result";
import { IPropRowSearch } from "../result-search-booking/defination";
import { BtnAddRow } from "../add-row";
import { services } from "./defiantion";

export const ServicesRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const initialData = {
    serviceType: "",
    serviceQuantity: "",
  };

  const { handleChange, handleAddRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "services",
    initialData,
  });

  return (
    <div>
      <BtnAddRow name="Services" onAddRow={handleAddRow} />

      <div className=" w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
        {formSearchResult[dayIndex].services?.map((_, rowIndex) => (
          <div key={rowIndex} className="flex mb-3 gap-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Loại dịch vụ</p>
              <Dropdown
                options={services}
                name={`service-type-${dayIndex}-${rowIndex}`}
                value={
                  formSearchResult[dayIndex].services?.[rowIndex]
                    ?.serviceType || ""
                }
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "serviceType", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Số lượng</p>
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
