import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  memo,
} from "react";
import clsx from "clsx";
import Text from "@/components/ui/typography/text";
import s from "./TextField.module.scss";

type TextFieldProps = {
  label: string;
  errorMessage?: string;
  additionalClasses?: string;
  status?: "error" | "success";
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { label, errorMessage, additionalClasses, status, ...rest } = props;

  return (
    <div
      className={clsx(s.wrapper, additionalClasses, {
        [s.error]: !!errorMessage,
      })}
    >
      <label className={s.label}>
        <Text className={s.labelContent} view="caption" color="white">
          {label}
        </Text>

        <input
          ref={ref}
          className={clsx(s.field, "focus-outline", {
            [s.success]: status && status === "success",
            [s.error]: !!errorMessage || (status && status === "error"),
          })}
          {...rest}
        />
      </label>

      {errorMessage ? (
        <Text className={s.errorMessage} view="caption" weight="regular">
          {errorMessage}
        </Text>
      ) : null}
    </div>
  );
});

export default memo(TextField);
