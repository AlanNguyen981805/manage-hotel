// stores/counterStore.ts
import { IFormSearchResult } from "@/components/features/home/result-search-booking/defination";
import { calculateDaysBetweenDates } from "@/helpers/date-helper";
import { create } from "zustand";

interface Vendor {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}
interface RoomState {
  isOpenHistory: boolean;
  loading: boolean;
  numberOfPeople: number;
  dateCheckIn: Date | null;
  dateCheckOut: Date | null;
  numberOfDays: number;
  vendor: Vendor | null;
  resultSearchBooking: IFormSearchResult;

  getNumberOfDays?: () => void;

  setLoading: (status: boolean) => void;
  searchRoom: () => void;
  setDateCheckIn: (date: Date | null) => void;
  setDateCheckOut: (date: Date | null) => void;
  setNumberOfPeople: (count: number) => void;
  setResultSearchBooking: (result: IFormSearchResult) => void;
  reset: () => void;
  setNumberOfdays: (count: number) => void;
  setOpenHistory: (open: boolean) => void;
  setVendor: (vendor: Vendor | null) => void;
}

const useBookingState = create<RoomState>((set) => ({
  isOpenHistory: false,

  loading: false,

  numberOfDays: 0,

  numberOfPeople: 1,

  dateCheckIn: new Date(),

  dateCheckOut: new Date(),

  resultSearchBooking: {},

  vendor: null,

  setResultSearchBooking: (resultSearchBooking) =>
    set(() => ({ resultSearchBooking })),

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

  setNumberOfdays: (count) => set(() => ({ numberOfDays: count })),

  setOpenHistory: (open) => set(() => ({ isOpenHistory: open })),

  setVendor: (vendor) => set(() => ({ vendor })),
}));

export default useBookingState;
