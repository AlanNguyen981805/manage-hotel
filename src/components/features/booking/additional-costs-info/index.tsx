"use client";

import { IAdditionalCosts } from "../../home/result-search-booking/defination";
import { Price } from "@/components/ui/price";
interface AdditionalCostsInfoProps {
  additionalCosts: IAdditionalCosts[];
}

export const AdditionalCostsInfo = ({
  additionalCosts,
}: AdditionalCostsInfoProps) => {
  return (
    <div className="mb-4">
      <h5 className="font-medium text-gray-700 mb-2">Additional Costs</h5>
      {additionalCosts.map((additionalCost, index) => (
        <>
          <div className="flex flex-col gap-2 pl-4" key={index}>
            <div className="flex justify-between">
              <span className="text-gray-600">Additional Cost Name:</span>
              <span>{additionalCost.additionalCostType.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <Price
                value={additionalCost.price || 0}
                size="md"
                align="left"
                label=""
              />
            </div>
          </div>
          {index < (additionalCosts.length || 0) - 1 && (
            <hr className="border-gray-200 my-4" />
          )}
        </>
      ))}
    </div>
  );
};
