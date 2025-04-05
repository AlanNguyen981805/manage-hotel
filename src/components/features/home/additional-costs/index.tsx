"use client";

import { Price } from "@/components/ui/price";
import useFormSearchResult from "@/hooks/use-search-result";
import { BtnAddRow } from "../add-row";
import { IPropRowSearch } from "../result-search-booking/defination";

export const AdditionalCostsRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const initialData = {
    additionalCostType: {
      id: "",
      name: "",
    },
    quantity: 0,
    price: 0,
  };

  const { handleChange, handleAddRow, handleRemoveRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "additionalCosts",
    initialData,
  });

  return (
    <div>
      <BtnAddRow name="Additional Costs" onAddRow={handleAddRow} />

      <div className=" w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
        {formSearchResult[dayIndex].additionalCosts?.map(
          (additionalCost, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex gap-4 justify-between ${
                rowIndex === 0 ? "py-3" : "pb-3"
              }`}
            >
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <p>Additional Cost Name</p>
                  <div>
                    <input
                      type="text"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 dark:focus:ring-accent dark:focus:border-accent"
                      required
                      onChange={(e) =>
                        handleChange(dayIndex, rowIndex, "additionalCostType", {
                          id: rowIndex.toString(),
                          name: e.target.value,
                        })
                      }
                      value={additionalCost?.additionalCostType?.name || ""}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center">
                  <p>Price</p>
                  <div>
                    <input
                      type="number"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 dark:focus:ring-accent dark:focus:border-accent"
                      required
                      onChange={(e) =>
                        handleChange(
                          dayIndex,
                          rowIndex,
                          "price",
                          Number(e.target.value)
                        )
                      }
                      value={additionalCost.price}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:w-3/12 pr-2">
                <Price
                  value={additionalCost?.price || 0}
                  label="Price"
                  size="lg"
                />
              </div>

              <button
                className="hover:text-red-600"
                onClick={() => handleRemoveRow(rowIndex)}
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
