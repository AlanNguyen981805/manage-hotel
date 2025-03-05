import useBookingState from "@/store/useRoomState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./checkin-and-out.css";

const CheckInAndOut = () => {
  const { setDateCheckIn, dateCheckIn, setDateCheckOut, dateCheckOut } = useBookingState();

  return (
    <div className="flex items-center justify-end h-full w-full">
      <div className="w-[200px] pl-[35px]">
        <p className="text-accent">Ngày đến và đi</p>
      </div>

      <DatePicker
        className="w-full h-full min-w-52"
        selectsRange
        startDate={dateCheckIn}
        endDate={dateCheckOut}
        onChange={(dates: [Date | null, Date | null]) => {
          const [start, end] = dates;
          setDateCheckIn(start);
          setDateCheckOut(end);
        }}
        minDate={new Date()}
        isClearable
      />
    </div>
  );
};

export default CheckInAndOut;
