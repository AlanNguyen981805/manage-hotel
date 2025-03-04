// stores/counterStore.ts
import { calculateDaysBetweenDates } from "@/helpers/dateHelper";
import { create } from "zustand";

interface RoomState {
  loading: boolean;
  numberOfPeople: number;
  dateCheckIn: Date | null;
  dateCheckOut: Date | null;
  numberOfDays: number;

  getNumberOfDays?: () => void;

  setLoading: (status: boolean) => void;
  searchRoom: () => void;
  setDateCheckIn: (date: Date) => void;
  setDateCheckOut: (date: Date) => void;
  setNumberOfPeople: (count: number) => void;
  reset: () => void;
}

const useRoomState = create<RoomState>((set) => ({
  loading: false,

  numberOfDays: 0,

  numberOfPeople: 1,

  dateCheckIn: new Date(),

  dateCheckOut: new Date(),

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

export default useRoomState;
