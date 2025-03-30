import { create } from "zustand";

interface AuthDialogState {
  isOpen: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}

export const useAuthDialog = create<AuthDialogState>((set) => ({
  isOpen: false,
  openAuthDialog: () => set({ isOpen: true }),
  closeAuthDialog: () => set({ isOpen: false }),
}));
