import useBookingState from "@/store/useRoomState";
import CheckInAndOut from "../../ui/input/checkin-and-out";
import NumberOfPeople from "../../features/home/number-of-people";
import useDialogStore from "@/store/useDialog";
import HistoryBooking from "@/components/features/home/history-booking";

const BookRoomForm = () => {
  const {
    getNumberOfDays,
    setResultSearchBooking,
    setOpenHistory,
    isOpenHistory,
  } = useBookingState();
  const { setOpenDialog } = useDialogStore();

  const handleCheckNow = () => {
    if (getNumberOfDays) {
      getNumberOfDays();
    }
    setResultSearchBooking({});
    setOpenDialog(true);
  };

  const handleOpen = () => {
    setOpenHistory(!isOpenHistory);
  };

  return (
    <div className="h-[260px] flex flex-col justify-center items-center ">
      <h1 className="text-4xl font-medium mb-9 text-accent">ĐẶT PHÒNG NGAY</h1>

      <form className="h-[300px] lg:h-[70px] w-full px-44">
        <div className="flex flex-col w-full h-full lg:flex-row">
          <div className="flex-1 border-r bg-white">
            <CheckInAndOut />
          </div>

          <div className="flex-1 border-r bg-white">
            <NumberOfPeople />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCheckNow}
          >
            Kiểm tra ngay
          </button>
          <button
            type="button"
            className="btn btn-primary border-l-[1px]"
            onClick={handleOpen}
          >
            Lịch sử đặt phòng
          </button>
        </div>
      </form>
      <HistoryBooking />
    </div>
  );
};

export default BookRoomForm;
