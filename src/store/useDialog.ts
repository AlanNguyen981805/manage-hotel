// stores/counterStore.ts
import { create } from "zustand";

interface DialogState {
  dialogStatus: boolean;
  setOpenDialog: (status: boolean) => void;
}

const useDialogStore = create<DialogState>((set) => ({
  dialogStatus: false,

  setOpenDialog: (status: boolean) => set(() => ({ dialogStatus: status })),
}));

export default useDialogStore;
