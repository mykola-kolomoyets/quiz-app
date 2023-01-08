import { ComponentProps, FC, useMemo } from "react";
import clsx from "clsx";
import { TextView, TypographyProps } from "@/shared/utils/types";
import s from "./Text.module.scss";

type TextProps = {
  view: TextView;
} & TypographyProps &
  ComponentProps<"p">;

const Text: FC<TextProps> = ({
  view,
  weight,
  align,
  color,
  className,
  children,
  ...props
}) => {
  const textClasses = useMemo(() => {
    return clsx(s.wrapper, s[view], color, weight, align, className);
  }, [view, color, weight, align]);

  return (
    <p className={textClasses} {...props}>
      {children}
    </p>
  );
};

export default Text;
