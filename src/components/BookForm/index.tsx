import useRoomState from "@/store/useRoomState";
import CheckIn from "../Checkin";
import CheckOut from "../Checkout";
import NumberOfPeople from "../NumberPeople";
import useDialogStore from "@/store/useDialog";

const BookForm = () => {
  const { getNumberOfDays } = useRoomState();
  const { setOpenDialog } = useDialogStore();

  const handleCheckNow = () => {
    if (getNumberOfDays) {
      getNumberOfDays();
    }

    setOpenDialog(true);
  };

  return (
    <div className="h-[260px] flex flex-col justify-center items-center ">
      <h1 className="text-4xl font-medium mb-9 text-accent">BOOK ROOM NOW</h1>

      <form className="h-[300px] lg:h-[70px] w-full px-44">
        <div className="flex flex-col w-full h-full lg:flex-row">
          <div className="flex-1 border-r bg-white">
            <CheckIn />
          </div>

          <div className="flex-1 border-r bg-white">
            <CheckOut />
          </div>

          <div className="flex-1 border-r bg-white">
            <NumberOfPeople />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCheckNow}
          >
            Check Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
