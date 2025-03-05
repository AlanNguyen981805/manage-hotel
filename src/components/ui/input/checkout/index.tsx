import useBookingState from "@/store/useRoomState";
import DatePicker from "react-datepicker";
import "./checkout.css";

const CheckOut = () => {
  const { setDateCheckOut, dateCheckOut } = useBookingState();

  return (
    <div className="flex items-center justify-end h-full w-full">
      <div className="w-[200px] pl-[35px]">
        <p className="text-accent">Ngày đi</p>
      </div>

      <DatePicker
        className="w-full h-full"
        selected={dateCheckOut}
        onChange={(date) => date && setDateCheckOut(date)}
      />
    </div>
  );
};

export default CheckOut;
