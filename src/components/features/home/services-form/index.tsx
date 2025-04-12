"use client";

import Dropdown from "@/components/ui/dropdown";
import { Price } from "@/components/ui/price";
import useFormSearchResult from "@/hooks/use-search-result";
import useLocationsStore from "@/store/useRoutesStore";
import { useMemo } from "react";
import { BtnAddRow } from "../add-row";
import { IPropRowSearch, IService } from "../result-search-booking/defination";
import { NumberInput } from "@/components/ui/number-input";

export const ServicesRow = ({
  dayIndex,
  setForm,
  formSearchResult,
}: IPropRowSearch) => {
  const initialData: IService = {
    serviceType: {
      id: "",
      name: "",
      price: 0,
    },
    serviceQuantity: 1,
    price: 0,
  };

  const { data } = useLocationsStore();

  const servicesByLocation = useMemo(() => {
    const selectedRoute = data?.find(
      (route) => route.id === Number(formSearchResult[dayIndex].routes.id)
    );

    const serviceCompaniesData =
      selectedRoute?.company.service_companies?.flatMap((item) => ({
        ...item,
        type: "company",
      })) || [];

    const serviceRoutesData =
      selectedRoute?.service_routes?.map((item) => ({
        ...item,
        type: "route",
      })) || [];

    return [...serviceCompaniesData, ...serviceRoutesData];
  }, [data, dayIndex, formSearchResult]);

  const { handleChange, handleAddRow, handleRemoveRow } = useFormSearchResult({
    dayIndex,
    setForm,
    type: "services",
    initialData,
  });

  const calculatePrice = (
    serviceTypePrice: number | undefined,
    serviceQuantity: number = 1
  ) => {
    return serviceTypePrice ? serviceTypePrice * serviceQuantity : 0;
  };

  const handleChangeService = (
    option: { id: number; name: string; price: number },
    rowIndex: number,
    quantity: number
  ) => {
    const price = calculatePrice(option.price, quantity);

    handleChange(dayIndex, rowIndex, "serviceType", option);
    handleChange(dayIndex, rowIndex, "price", price);
  };

  const handleChangeQuantiy = (e: number, rowIndex: number) => {
    const serviceTypePrice =
      formSearchResult[dayIndex].services?.[rowIndex]?.serviceType.price;
    const price = calculatePrice(serviceTypePrice, e);

    handleChange(dayIndex, rowIndex, "serviceQuantity", e);
    handleChange(dayIndex, rowIndex, "price", price);
  };

  return (
    <div>
      <BtnAddRow name="Services" onAddRow={handleAddRow} />

      <div className=" w-full border-b-2 flex flex-col justify-between px-2 indexs-center">
        {formSearchResult[dayIndex].services?.map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex gap-4 ${
              rowIndex === 0 ? "py-3" : "pb-3"
            } justify-between`}
          >
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 items-center justify-center">
                <p>Service Type</p>
                <Dropdown
                  options={[
                    { id: 0, name: "Please select", price: 0 },
                    ...servicesByLocation?.map((service) => ({
                      id: service.id,
                      name: service.service_code,
                      price: service.service_price,
                      type: service.type,
                    })),
                  ]}
                  name={`service-type-${dayIndex}-${rowIndex}`}
                  value={
                    formSearchResult[dayIndex].services?.[rowIndex]?.serviceType
                      .id || ""
                  }
                  onChange={(option) =>
                    handleChangeService(
                      option,
                      rowIndex,
                      formSearchResult[dayIndex].services?.[rowIndex]
                        ?.serviceQuantity ?? 1
                    )
                  }
                />
              </div>

              <NumberInput
                label="Quantity"
                value={
                  formSearchResult[dayIndex].services?.[rowIndex]
                    ?.serviceQuantity ?? 1
                }
                onChange={(e) => handleChangeQuantiy(Number(e), rowIndex)}
                min={1}
                disabled={
                  !formSearchResult[dayIndex].services?.[rowIndex]?.serviceType
                }
                id={`quantityRoom-${rowIndex}`}
                className="md:w-3/12"
              />
              {/* <div className="flex flex-col gap-2 items-center justify-center">
                <p>Số lượng</p>
                <div>
                  <input
                    type="number"
                    id="quantity"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent  focus:border-accent block w-full p-2.5  dark:focus:ring-accent dark:focus:border-accent"
                    required
                    defaultValue={
                      formSearchResult[dayIndex].services?.[rowIndex]
                        ?.serviceQuantity ?? 1
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeQuantiy(e, rowIndex)
                    }
                  />
                </div>
              </div> */}
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <Price
                value={
                  formSearchResult[dayIndex].services?.[rowIndex]?.price || 0
                }
                className="md:w-3/12 pr-2"
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
        ))}
      </div>
    </div>
  );
};
