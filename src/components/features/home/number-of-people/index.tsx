"use client";

import useBookingState from "@/store/useRoomState";

const NumberOfPeople = () => {
  const { setNumberOfPeople, numberOfPeople } = useBookingState();

  return (
    <div className="flex items-center justify-end h-full w-full">
      <div className="w-[180px] pl-[35px]">
        <p className="text-accent">Number of Guests</p>
      </div>

      <div>
        <input
          type="number"
          defaultValue={numberOfPeople}
          className="w-16"
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default NumberOfPeople;
