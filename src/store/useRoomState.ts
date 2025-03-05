// stores/counterStore.ts
import { IFormSearchResult } from "@/components/features/home/result-search-booking/defination";
import { calculateDaysBetweenDates } from "@/helpers/date-helper";
import { create } from "zustand";

interface RoomState {
  loading: boolean;
  numberOfPeople: number;
  dateCheckIn: Date | null;
  dateCheckOut: Date | null;
  numberOfDays: number;
  resultSearchBooking: IFormSearchResult

  getNumberOfDays?: () => void;

  setLoading: (status: boolean) => void;
  searchRoom: () => void;
  setDateCheckIn: (date: Date | null) => void;
  setDateCheckOut: (date: Date |  null) => void;
  setNumberOfPeople: (count: number) => void;
  setResultSearchBooking: (result: IFormSearchResult) => void;
  reset: () => void;
}

const useBookingState = create<RoomState>((set) => ({
  loading: false,

  numberOfDays: 0,

  numberOfPeople: 1,

  dateCheckIn: new Date(),

  dateCheckOut: new Date(),

  resultSearchBooking: {},

  setResultSearchBooking: (resultSearchBooking) => set(() => ({ resultSearchBooking })),

  getNumberOfDays: () =>
    set((state) => ({
      numberOfDays: calculateDaysBetweenDates(
        state.dateCheckIn,
        state.dateCheckOut
      ),
    })),

  // FIXME: wrong logic
  searchRoom: () =>
    set((state) => ({ numberOfPeople: state.numberOfPeople - 1 })),

  setDateCheckIn: (date) => set(() => ({ dateCheckIn: date })),

  setDateCheckOut: (date) => set(() => ({ dateCheckOut: date })),

  setNumberOfPeople: (count) => set(() => ({ numberOfPeople: count })),

  setLoading: (loading) => set(() => ({ loading })),

  reset: () => set({ numberOfPeople: 0 }),
}));

export default useBookingState;
