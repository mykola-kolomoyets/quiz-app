import { ComponentProps, forwardRef } from "react";
import { ButtonView } from "@/shared/utils/types/button";
import s from "./Button.module.scss";
import clsx from "clsx";

type ButtonProps = {
  view: ButtonView;
  disabled?: boolean;
} & ComponentProps<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { view, disabled, className, children, ...rest } = props;

  const buttonClasses = clsx(s.wrapper, s[view], "focus-outline", className, {
    [s.disabled]: disabled,
  });

  return (
    <button ref={ref} className={buttonClasses} {...rest}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
