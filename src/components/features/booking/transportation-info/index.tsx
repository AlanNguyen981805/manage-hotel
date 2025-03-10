"use client";

import { ITransportation } from "../../home/result-search-booking/defination";
import { Price } from "@/components/ui/price";
interface TransportationInfoProps {
  transportation: ITransportation[];
}
export const TransportationInfo = ({
  transportation,
}: TransportationInfoProps) => {
  return (
    <div className="mb-4">
      <h5 className="font-medium text-gray-700 mb-2">Transportation</h5>
      {transportation.map((trans, index) => (
        <>
          <div className="flex flex-col gap-2 pl-4" key={index}>
            <div className="flex justify-between">
              <span className="text-gray-600">Tên phương tiện:</span>
              <span>{trans.transportationType.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loại phương tiện:</span>
              <span>{trans.transportationMode.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Giá tiền:</span>
              <Price value={trans.price || 0} size="md" align="left" label="" />
            </div>
          </div>
          {index < (transportation.length || 0) - 1 && (
            <hr className="border-gray-200 my-4" />
          )}
        </>
      ))}
    </div>
  );
};
