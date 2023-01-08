import { ComponentProps, FC, PropsWithChildren, useMemo } from "react";
import Balancer from "react-wrap-balancer";
import clsx from "clsx";
import { TitleVariant, TitleView, TypographyProps } from "@/shared/utils/types";
import s from "./Title.module.scss";

type TitleProps = {
  view: TitleView;
  tag?: TitleVariant;
} & TypographyProps &
  PropsWithChildren &
  ComponentProps<"h1">;

const Title: FC<TitleProps> = ({
  view,
  color = "white",
  tag = "h5",
  weight = "regular",
  align = "left",
  children,
  className,
  ...props
}) => {
  const Tag = tag;

  const titleClasses = useMemo(() => {
    return clsx(s.wrapper, s[view], color, weight, align, className);
  }, [view, color, weight, align]);

  return (
    <Tag className={titleClasses} {...props}>
      <Balancer ratio={0.35}>{children}</Balancer>
    </Tag>
  );
};

export default Title;
