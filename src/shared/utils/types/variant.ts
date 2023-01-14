import { ObjectValues } from "./common";

const VARIANT_STATUS = {
  selected: "selected",
  correct: "correct",
  incorrect: "incorrect",
} as const;

export type VariantStatus = ObjectValues<typeof VARIANT_STATUS>;
