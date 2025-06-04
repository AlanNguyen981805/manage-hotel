"use client";

import Dropdown from "@/components/ui/dropdown";
import { Price } from "@/components/ui/price";
import useFormSearchResult from "@/hooks/use-search-result";
import useLocationsStore from "@/store/useRoutesStore";
import { useEffect, useMemo, useState } from "react";
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

  const [isInitialized, setIsInitialized] = useState(false);

  const findCompany = data && data[0].company;

  const servicesByLocation = useMemo(() => {
    const serviceCompaniesData =
      findCompany?.service_companies?.flatMap((item) => ({
        ...item,
        type: "company",
      })) || [];

    const findLocation =
      data &&
      data[0].company.locations.find(
        (location) =>
          location.documentId === formSearchResult[dayIndex].routes.id
      );

    const serviceRoutesData =
      findLocation?.service_routes?.map((item) => ({
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

  const priceAfterMarkup = (price: number, type: "company" | "route") => {
    const mark_service = findCompany?.mark_service_com ?? 1;

    return type === "company" ? price * mark_service : price;
  };

  const handleChangeService = (
    option: {
      id: number;
      name: string;
      price: number;
      type: "company" | "route";
    },
    rowIndex: number,
    quantity: number
  ) => {
    const markedPrice = priceAfterMarkup(option.price, option.type);
    const price = calculatePrice(markedPrice, quantity);

    handleChange(dayIndex, rowIndex, "serviceType", option);
    handleChange(dayIndex, rowIndex, "price", price);
    handleChange(
      dayIndex,
      rowIndex,
      "mark_service_com",
      findCompany?.mark_service_com ?? 1
    );
  };

  const handleChangeQuantiy = (e: number, rowIndex: number) => {
    const serviceType =
      formSearchResult[dayIndex].services?.[rowIndex]?.serviceType;
    const serviceTypePrice = serviceType?.price;
    const serviceTypeType = serviceType?.type as "company" | "route";

    const markedPrice = priceAfterMarkup(
      serviceTypePrice || 0,
      serviceTypeType
    );
    const price = calculatePrice(markedPrice, e);

    handleChange(dayIndex, rowIndex, "serviceQuantity", e);
    handleChange(dayIndex, rowIndex, "price", price);
    handleChange(
      dayIndex,
      rowIndex,
      "mark_service_com",
      findCompany?.mark_service_com ?? 1
    );
  };

  // Initialize from history
  useEffect(() => {
    if (
      !isInitialized &&
      formSearchResult[dayIndex]?.services &&
      formSearchResult[dayIndex]?.services?.length > 0
    ) {
      const services = formSearchResult[dayIndex].services;

      setForm((prevState) => {
        const newState = { ...prevState };
        if (!newState[dayIndex]) {
          newState[dayIndex] = { services: [] };
        }
        if (!newState[dayIndex].services) {
          newState[dayIndex].services = [];
        }

        services.forEach((serviceRow, rowIndex) => {
          if (serviceRow.serviceType?.id) {
            // Find service from API data
            const selectedService = servicesByLocation?.find(
              (s) => s.documentId === serviceRow.serviceType.id
            );

            if (selectedService) {
              const markedPrice = priceAfterMarkup(
                selectedService.service_price,
                selectedService.type
              );
              const price = calculatePrice(
                markedPrice,
                serviceRow.serviceQuantity || 1
              );

              // Update service row with new data
              if (!newState[dayIndex].services[rowIndex]) {
                newState[dayIndex].services[rowIndex] = {};
              }

              newState[dayIndex].services[rowIndex] = {
                ...serviceRow,
                serviceType: {
                  id: selectedService.documentId,
                  name: selectedService.service_code,
                  price: selectedService.service_price,
                  type: selectedService.type,
                  desc: selectedService.service_desc,
                },
                mark_service_com: findCompany?.mark_service_com ?? 1,
                price,
              };
            }
          }
        });

        return newState;
      });

      setIsInitialized(true);
    }
  }, [
    dayIndex,
    formSearchResult,
    isInitialized,
    setForm,
    servicesByLocation,
    findCompany?.mark_service_com,
    calculatePrice,
    priceAfterMarkup,
  ]);

  // Reset when city changes
  useEffect(() => {
    if (formSearchResult[dayIndex].city.id) {
      setIsInitialized(false);
    }
  }, [formSearchResult[dayIndex].city.id]);

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
                    ...(Array.isArray(servicesByLocation)
                      ? servicesByLocation.slice()
                      : []
                    )
                      .sort((a, b) => {
                        const codeA = (a.service_code || "").toLowerCase();
                        const codeB = (b.service_code || "").toLowerCase();
                        return codeA.localeCompare(codeB);
                      })
                      .map((service) => ({
                        id: service.documentId,
                        name: service.service_code,
                        price: service.service_price,
                        type: service.type,
                        desc: service.service_desc,
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
