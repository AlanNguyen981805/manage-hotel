"use client";

import { IHotel } from "../../home/result-search-booking/defination";
import { formatCurrency } from "@/helpers/currency-helper";
interface HotelInfoProps {
  hotels: IHotel[];
}
export const HotelInfo = ({ hotels }: HotelInfoProps) => {
  return (
    <>
      {hotels.length > 0 && (
        <div className="mb-4">
          <h5 className="font-medium text-gray-700 mb-2">Hotel</h5>
          {hotels.map((hotel, index) => (
            <>
              <div key={index} className="flex flex-col gap-2 pl-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hotel Name:</span>
                  <span>{hotel.hotelName.name || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Quantity:</span>
                  <span>{hotel.quantityRoom.name || ""} Rooms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type:</span>
                  <span>{hotel.roomType.name || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Available:</span>
                  <span>{hotel.timeAvailable || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Additional Beds:</span>
                  <span>{hotel.additionalBeds.name || ""} Bed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span>{formatCurrency(hotel.price)}</span>
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
