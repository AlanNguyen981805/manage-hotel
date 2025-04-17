"use client";

import { Price } from "@/components/ui/price";
import { IHotel } from "../../home/result-search-booking/defination";
import { useTranslation } from "@/hooks/useTranslation";

interface HotelInfoProps {
  hotels: IHotel[];
}

export const HotelInfo = ({ hotels }: HotelInfoProps) => {
  const { t } = useTranslation();

  return (
    <>
      {hotels?.length > 0 && (
        <div className="mb-4">
          <h5 className="font-medium text-gray-700 mb-2">
            {t("booking.hotel")}
          </h5>
          {hotels.map((hotel, index) => (
            <>
              <div key={index} className="flex flex-col gap-2 pl-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("booking.hotelName")}:
                  </span>
                  <span>{hotel.hotelName.name || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("booking.roomQuantity")}:
                  </span>
                  <span>{hotel.quantityRoom || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("booking.roomType")}:
                  </span>
                  <span>{hotel.roomType.name || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("booking.timeAvailable")}:
                  </span>
                  <span>{hotel.timeAvailable || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("booking.additionalBeds")}:
                  </span>
                  <span>{hotel.additionalBeds.name || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("booking.pricePerRoom")}:
                  </span>
                  <Price
                    value={
                      hotel?.roomType?.price_hotels[0]?.price *
                        hotel?.mark_hotel ||
                      hotel?.roomType?.price_default * hotel?.mark_hotel
                    }
                    size="md"
                    align="left"
                    label=""
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("booking.totalPrice")}:
                  </span>
                  <Price
                    value={hotel.price || 0}
                    size="md"
                    align="left"
                    label=""
                  />
                </div>
              </div>
              {index < (hotels.length || 0) - 1 && (
                <hr className="border-gray-200 my-4" />
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
};
