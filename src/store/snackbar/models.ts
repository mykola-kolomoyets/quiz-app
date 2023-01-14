import { SnackbarType } from "@/shared/utils/types/snackbar";

export type SnackbarState = {
  isOpened: boolean;
  description: string;
  type: SnackbarType;
};

export type SnackbarStore = {
  openSnackbar: (data: Omit<SnackbarState, "isOpened">) => void;
  closeSnackbar: () => void;
} & SnackbarState;

export const initialState: SnackbarState = {
  isOpened: false,
  description: "",
  type: "success",
};
