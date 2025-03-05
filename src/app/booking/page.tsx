"use client";

import { HotelInfo, ServicesInfo, SummaryBooking, TransportationInfo } from "@/components/features/booking";

export default function Booking() {
  return (
    <div className="w-full h-full">
      <div className="container mx-auto flex gap-8 py-8">
        <div className="w-[70%]">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col gap-6">
              {/* Days Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Booking Details</h3>

                <div className="border-b pb-4 mb-4">
                  <h4 className="font-medium text-lg mb-3">Day 1</h4>

                  <HotelInfo />

                  <TransportationInfo />

                  <ServicesInfo />
                </div>
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
