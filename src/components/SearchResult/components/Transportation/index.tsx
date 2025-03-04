"use client";

import Dropdown from "@/components/Dropdown";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ITransportationRowData } from "./defination";

interface IProps {
  numberOfDays: number;
  setRowData: Dispatch<SetStateAction<ITransportationRowData>>;
  rowData: ITransportationRowData;
  rows: ITransportationRowData[];
  dayIndex: number;
}

export const TransportationRow = ({
  numberOfDays,
  setRowData,
  rows,
  dayIndex,
  rowData,
}: IProps) => {
  const transportationTypes = [
    {
      name: "Xe khách",
      value: "xe_khach",
    },
    {
      name: "Xe tải",
      value: "xe_tai",
    },
  ];

  const quantities = [
    {
      name: "1 phương tiện",
      value: 1,
    },
    {
      name: "2 phương tiện",
      value: 2,
    },
    {
      name: "3 phương tiện",
      value: 3,
    },
  ];
  // Hàm để lưu lựa chọn vào state khi thay đổi dropdown
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
      newRowData.push({
        transportationType: "",
        quantity: "",
      }); // Thêm một object mới vào mảng của row
      return {
        ...prevState,
        [dayIndex]: newRowData,
      };
    });
  };

  const initialRowData = () => {
    const rowData: ITransportationRowData = {};
    for (let i = 0; i < numberOfDays; i++) {
      rowData[i] = [
        {
          transportationType: "",
          quantity: "",
        },
      ];
    }
    return rowData;
  };

  useEffect(() => {
    setRowData(initialRowData());
  }, [numberOfDays]);

  return (
    <div>
      <div className="flex justify-between items-center bg-accent">
        <h1 className="text-lg p-2">TRANSPORTATION</h1>
      </div>
      <div className=" w-full border-b-2 flex flex-col justify-between p-2 indexs-center">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="flex mb- gap-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Loại phương tiện</p>
              <Dropdown
                options={transportationTypes}
                name={`transportation-type-${dayIndex}-${rowIndex}`}
                value={rowData[dayIndex]?.[rowIndex]?.transportationType || ""}
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
                value={rowData[dayIndex]?.[rowIndex]?.quantity || ""}
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
