import { create } from "zustand";
import { initialState, SnackbarStore } from "./models";

export const useSnackbarStore = create<SnackbarStore>((set) => {
  return {
    ...initialState,

    openSnackbar: (data) => {
      set({ ...data, isOpened: true });
    },

    closeSnackbar: () => {
      set(initialState);
    },
  };
});
