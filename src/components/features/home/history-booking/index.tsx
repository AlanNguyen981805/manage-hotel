import { IHistoryInfo } from "../result-search-booking/defination";
import useDialogStore from "@/store/useDialog";
import useBookingState from "@/store/useRoomState";

const HistoryBooking = () => {
  const {
    setResultSearchBooking,
    setNumberOfPeople,
    setNumberOfdays,
    isOpenHistory,
  } = useBookingState();
  const { setOpenDialog } = useDialogStore();

  const history = localStorage.getItem("bookingHistory");
  const historyItems = history ? (JSON.parse(history) as IHistoryInfo[]) : [];

  const handleClickItem = (item: IHistoryInfo) => {
    setNumberOfPeople(item.numberOfPeople);
    setResultSearchBooking(item?.days);
    setNumberOfdays(item.numberOfDays);
    setOpenDialog(true);
  };

  return (
    <div className="flex flex-col w-full px-44 mb-1 lg:flex-row">
      <div
        className={`flex-1 bg-white h-auto ${isOpenHistory ? "" : "hidden"}`}
      >
        <div className="flex flex-col gap-1 p-2">
          {historyItems.map((item) => {
            const checkIn = new Date(item.dateCheckIn ?? "").toLocaleDateString(
              "en-US"
            );
            const checkOut = new Date(
              item.dateCheckOut ?? ""
            ).toLocaleDateString("en-US");
            return (
              <div
                key={item?.created}
                className="cursor-pointer hover:bg-slate-200"
                onClick={() => handleClickItem(item)}
              >
                {`${checkIn} - ${checkOut}`}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryBooking;
