import { ObjectValues } from "./common";

const TITLE_VARIANT = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
} as const;

const TITLE_VIEW = {
  primary: "primary",
  secondary: "secondary",
} as const;

const TEXT_VIEW = {
  primary: "primary",
  caption: "caption",
  mini: "mini",
} as const;

const TYPOGRAPHY_COLOR = {
  white: "white",
  black: "black",
} as const;

const TYPOGRAPHY_WEIGHT = {
  medium: "medium",
  regular: "regular",
} as const;

const TYPOGRAPHY_ALIGNMENT = {
  left: "left",
  center: "center",
  right: "right",
} as const;

export type TitleView = ObjectValues<typeof TITLE_VIEW>;
export type TitleVariant = ObjectValues<typeof TITLE_VARIANT>;
export type TextView = ObjectValues<typeof TEXT_VIEW>;

export type TypographyColor = ObjectValues<typeof TYPOGRAPHY_COLOR>;
export type TypographyWeight = ObjectValues<typeof TYPOGRAPHY_WEIGHT>;
export type TypographyAlignment = ObjectValues<typeof TYPOGRAPHY_ALIGNMENT>;

export type TypographyProps = {
  color?: TypographyColor;
  weight?: TypographyWeight;
  align?: TypographyAlignment;
};
