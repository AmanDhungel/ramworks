import { create } from "zustand";
type DialogStore = {
  open: boolean;
  setIsOpen: () => void;
};

const useDialogOpen = create<DialogStore>((set) => ({
  open: false,
  setIsOpen: () => set((state) => ({ open: !state.open })),
}));

export default useDialogOpen;
