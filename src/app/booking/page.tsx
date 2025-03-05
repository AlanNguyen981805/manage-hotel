"use client";

import { AdditionalCostsInfo, HotelInfo, ServicesInfo, SummaryBooking, TransportationInfo } from "@/components/features/booking";
import useBookingState from "@/store/useRoomState";

export default function Booking() {
  const { resultSearchBooking } = useBookingState();

  console.log('resultSearchBooking :>> ', resultSearchBooking);
  return (
    <div className="w-full h-full">
      <div className="container mx-auto flex gap-8 py-8">
        <div className="w-[70%]">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col gap-6">
              {/* Days Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
                {Object.keys(resultSearchBooking).map((keyName, i) => (
                  <div className="border-b pb-4 mb-4" key={i}>
                    <h4 className="font-medium text-lg mb-3">Day {i + 1} - {resultSearchBooking[keyName].city.name}</h4>

                    <HotelInfo hotels={resultSearchBooking[keyName].hotels || []} />

                    <TransportationInfo transportation={resultSearchBooking[keyName].transportation || []} />

                    <ServicesInfo services={resultSearchBooking[keyName].services || []} />

                    <AdditionalCostsInfo additionalCosts={resultSearchBooking[keyName].additionalCosts || []} />
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>

        <div className="w-[30%]">
          <SummaryBooking />
        </div>
      </div>
    </div>
  );
}
