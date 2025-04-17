"use client";

import { ArrowDown } from "@/assets/svgs/ArrowDown";
import {
  AdditionalCostsInfo,
  HotelInfo,
  ServicesInfo,
  SummaryBooking,
  TransportationInfo,
} from "@/components/features/booking";
import useBookingState from "@/store/useRoomState";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

export default function Booking() {
  const {
    resultSearchBooking,
    vendor,
    dateCheckIn,
    dateCheckOut,
    numberOfPeople,
    numberOfDays,
  } = useBookingState();
  console.log("resultSearchBooking :>> ", resultSearchBooking);

  return (
    <div className="w-full h-full">
      <div className="container-fluid px-12 mx-auto flex gap-8 py-8">
        <div className="w-[70%]">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
              {Object.keys(resultSearchBooking).map((keyName, i) => (
                <Disclosure key={i} as="div" defaultOpen={false}>
                  <DisclosureButton
                    className={`group flex w-full items-center justify-between py-4 ${
                      i < Object.keys(resultSearchBooking).length - 1
                        ? "border-b"
                        : ""
                    }`}
                  >
                    <h4 className="font-medium text-lg">
                      DAY {i + 1} - {resultSearchBooking[keyName].city.name}
                    </h4>
                    <ArrowDown />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 text-sm/5">
                    <div className="border-b">
                      <HotelInfo
                        hotels={resultSearchBooking[keyName].hotels || []}
                      />

                      <TransportationInfo
                        transportation={
                          resultSearchBooking[keyName].transportation || []
                        }
                      />

                      <ServicesInfo
                        services={resultSearchBooking[keyName].services || []}
                      />

                      <AdditionalCostsInfo
                        additionalCosts={
                          resultSearchBooking[keyName].additionalCosts || []
                        }
                      />
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[30%]">
          <SummaryBooking
            resultSearchBooking={resultSearchBooking}
            vendor={vendor}
            dateCheckIn={dateCheckIn}
            dateCheckOut={dateCheckOut}
            numberOfPeople={numberOfPeople}
            numberOfDays={numberOfDays}
          />
        </div>
      </div>
    </div>
  );
}
