"use client";

import Dropdown from "@/components/Dropdown";
import { Dispatch, SetStateAction, useEffect } from "react";
import { additionalCosts, IAdditionalCostsRowData } from "./defiantion";

interface IProps {
  numberOfDays: number;
  setRowData: Dispatch<SetStateAction<IAdditionalCostsRowData>>;
  rowData: IAdditionalCostsRowData;
  rows: IAdditionalCostsRowData[];
  dayIndex: number;
}

export const AdditionalCostsRow = ({
  numberOfDays,
  setRowData,
  rows,
  dayIndex,
  rowData,
}: IProps) => {
  const initialData = {
    additionalCostType: "",
    additionalCostQuantity: "",
  };

  const handleChange = (
    dayIndex: number,
    rowIndex: number,
    field: string,
    value: string
  ) => {
    setRowData((prevState) => {
      const dayData = prevState[dayIndex] || [];
      const updatedRowData = [...dayData];
      updatedRowData[rowIndex] = {
        ...updatedRowData[rowIndex],
        [field]: value,
      };
      return {
        ...prevState,
        [dayIndex]: updatedRowData,
      };
    });
  };

  // Hàm thêm một hàng mới
  const handleAddRow = (dayIndex: number) => {
    setRowData((prevState) => {
      const newRowData = [...(prevState[dayIndex] || [])];
      newRowData.push(initialData); // Thêm một object mới vào mảng của row
      return {
        ...prevState,
        [dayIndex]: newRowData,
      };
    });
  };

  const initialRowData = () => {
    const rowData: IAdditionalCostsRowData = {};
    for (let i = 0; i < numberOfDays; i++) {
      rowData[i] = [initialData];
    }
    return rowData;
  };

  useEffect(() => {
    setRowData(initialRowData());
  }, [numberOfDays]);

  return (
    <div>
      <div className="flex justify-between items-center bg-accent">
        <h1 className="text-lg p-2">CHI PHÍ PHÁT SINH</h1>
        <button
          className="bg-accent text-white px-4 rounded-md h-[40px]"
          onClick={() => handleAddRow(dayIndex)}
        >
          Add Row
        </button>
      </div>
      <div className=" w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="flex mb-3 gap-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Loại chi phí</p>
              <Dropdown
                options={additionalCosts}
                name={`additional-cost-type-${dayIndex}-${rowIndex}`}
                value={rowData[dayIndex]?.[rowIndex]?.additionalCostType || ""}
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
