"use client";

import Dropdown from "@/components/Dropdown";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  additionalBeds,
  hotels,
  hotelTypes,
  IHotelRowData,
  quantities,
} from "./defination";
import { IFormSearchResult } from "../../defination";

interface IProps {
  numberOfDays: number;
  setRowData: Dispatch<SetStateAction<IHotelRowData>>;
  rowData: IHotelRowData;
  rows: IHotelRowData[];
  dayIndex: number;
  form: IFormSearchResult;
  setForm: Dispatch<SetStateAction<IFormSearchResult>>;
  formSearchResult: IFormSearchResult;
}

export const HoltelRow = ({
  numberOfDays,
  setRowData,
  rows,
  dayIndex,
  rowData,
  form,
  setForm,
  formSearchResult,
}: IProps) => {
  const initialData = {
    hotelType: "",
    hotel: "",
    quantity: "",
    additionalBeds: "",
  };
  const updatedRowData = [{}];

  const handleChange = (
    dayIndex: number,
    rowIndex: number,
    field: string,
    value: string
  ) => {
    updatedRowData[rowIndex] = {
      ...updatedRowData[rowIndex],
      [field]: value,
    };

    const dataForm = formSearchResult[`day${dayIndex + 1}`].hotel;

    console.log("updatedRowData :>> ", updatedRowData);
    setForm((prevState) => {
      return {
        ...prevState,
        [`day${dayIndex + 1}`]: {
          ...prevState[`day${dayIndex + 1}`],
          hotel: updatedRowData,
        },
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
    const rowData: IHotelRowData = {};
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
        <h1 className="text-lg p-2">HOTEL</h1>
        <button
          className="bg-accent text-white px-4 rounded-md h-[40px]"
          onClick={() => handleAddRow(dayIndex)}
        >
          Add Row
        </button>
      </div>
      <div className=" w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="flex my-3 gap-4 w-full">
            <div className="flex flex-col gap-2 items-start justify-center md:w-3/12">
              <p>Loại khách sạn</p>
              <Dropdown
                options={hotelTypes}
                name={`hotel-type-${dayIndex}-${rowIndex}`}
                value={rowData[dayIndex]?.[rowIndex]?.hotelType || ""}
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "hotelType", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
              <p>Khách sạn</p>
              <Dropdown
                options={hotels}
                name={`hotel-${dayIndex}-${rowIndex}`}
                value={rowData[dayIndex]?.[rowIndex]?.hotel || ""}
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "hotel", value)
                }
              />
            </div>

            {/* TODO: thêm mới */}
            <div className="flex flex-col gap-2 md:w-3/12">
              <p>Loại phòng</p>
              <Dropdown
                options={quantities}
                name={`quantity-${dayIndex}-${rowIndex}`}
                value={rowData[dayIndex]?.[rowIndex]?.quantity || ""}
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "quantity", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
              <p>Ngày hiệu lực</p>
              <Dropdown
                options={quantities}
                name={`quantity-${dayIndex}-${rowIndex}`}
                value={rowData[dayIndex]?.[rowIndex]?.quantity || ""}
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "quantity", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
              <p>Số lượng phòng</p>
              <Dropdown
                options={quantities}
                name={`quantity-${dayIndex}-${rowIndex}`}
                value={rowData[dayIndex]?.[rowIndex]?.quantity || ""}
                onChange={(value) =>
                  handleChange(dayIndex, rowIndex, "quantity", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
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
          </div>
        ))}
      </div>
    </div>
  );
};
