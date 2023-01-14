import { ObjectValues } from "./common";

const SNACKBAR_TYPE = {
  success: "success",
  error: "error",
} as const;

export type SnackbarType = ObjectValues<typeof SNACKBAR_TYPE>;
