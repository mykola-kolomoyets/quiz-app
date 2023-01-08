import { ObjectValues } from "./common";

const BUTTON_VIEW = {
  primary: "primary",
  ghost: "ghost",
} as const;

export type ButtonView = ObjectValues<typeof BUTTON_VIEW>;
