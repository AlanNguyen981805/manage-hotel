import useBookingState from "@/store/useRoomState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./checkin.css";

const CheckIn = () => {
  const { setDateCheckIn, dateCheckIn } = useBookingState();

  return (
    <div className="flex items-center justify-end h-full w-full">
      <div className="w-[200px] pl-[35px]">
        <p className="text-accent">Ngày đến</p>
      </div>

      <DatePicker
        className="w-full h-full"
        selected={dateCheckIn}
        onChange={(date) => date && setDateCheckIn(date)}
      />
    </div>
  );
};

export default CheckIn;
