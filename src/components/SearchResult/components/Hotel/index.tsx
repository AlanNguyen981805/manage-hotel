"use client";

import Dropdown from "@/components/Dropdown";
import { useEffect } from "react";
import { additionalBeds, hotels, hotelTypes, quantities } from "./defination";

interface IProps {
  numberOfDays: number;
  setRowData: any;
  rowData: any;
  rows: any;
  dayIndex: number;
}

export const HoltelRow = ({
  numberOfDays,
  setRowData,
  rows,
  dayIndex,
  rowData,
}: IProps) => {
  // Hàm để lưu lựa chọn vào state khi thay đổi dropdown
  const handleChange = (
    dayIndex: number,
    rowIndex: number,
    field: string,
    value: any
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
      newRowData.push({}); // Thêm một object mới vào mảng của row
      return {
        ...prevState,
        [dayIndex]: newRowData,
      };
    });
  };

  const initialRowData = () => {
    const rowData: { [key: number]: any[] } = {};
    for (let i = 0; i < numberOfDays; i++) {
      rowData[i] = [{}];
    }
    return rowData;
  };

  useEffect(() => {
    setRowData(initialRowData());
  }, [numberOfDays]);

  return (
    <div className="bg-red-400 w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="flex mb-3">
          <p>Loại khách sạn</p>
          <Dropdown
            options={hotelTypes}
            name={`hotel-type-${dayIndex}-${rowIndex}`}
            value={rowData[dayIndex]?.[rowIndex]?.hotelType || ""}
            onChange={(value) =>
              handleChange(dayIndex, rowIndex, "hotelType", value)
            }
          />

          <p>Khách sạn</p>
          <Dropdown
            options={hotels}
            name={`hotel-${dayIndex}-${rowIndex}`}
            value={rowData[dayIndex]?.[rowIndex]?.hotel || ""}
            onChange={(value) =>
              handleChange(dayIndex, rowIndex, "hotel", value)
            }
          />

          <p>Số lượng phòng</p>
          <Dropdown
            options={quantities}
            name={`quantity-${dayIndex}-${rowIndex}`}
            value={rowData[dayIndex]?.[rowIndex]?.quantity || ""}
            onChange={(value) =>
              handleChange(dayIndex, rowIndex, "quantity", value)
            }
          />

          <p>Số giường thêm</p>
          <Dropdown
            options={additionalBeds}
            name={`additional-beds-${dayIndex}-${rowIndex}`}
            value={rowData[dayIndex]?.[rowIndex]?.additionalBeds || ""}
            onChange={(value) =>
              handleChange(dayIndex, rowIndex, "quantity", value)
            }
          />
        </div>
      ))}

      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={() => handleAddRow(dayIndex)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Row
        </button>
      </div>

      <hr />
    </div>
  );
};
