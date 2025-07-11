"use client";

import { Price } from "@/components/ui/price";
import { IService } from "../../home/result-search-booking/defination";

interface ServicesInfoProps {
  services: IService[];
}
export const ServicesInfo = ({ services }: ServicesInfoProps) => {
  return (
    <div className="mb-4">
      <h5 className="font-medium text-gray-700 mb-2">Services</h5>
      {services.map((service, index) => (
        <>
          <div className="flex flex-col gap-2 pl-4" key={index}>
            <div className="flex justify-between">
              <span className="text-gray-600">Service name:</span>
              <span>{service.serviceType.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span>{service.serviceQuantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <Price
                value={service.price || 0}
                size="md"
                align="left"
                label=""
              />
            </div>
          </div>
          {index < (services.length || 0) - 1 && (
            <hr className="border-gray-200 my-4" />
          )}
        </>
      ))}
    </div>
  );
};
