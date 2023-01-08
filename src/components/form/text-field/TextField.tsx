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
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { label, errorMessage, additionalClasses, ...rest } = props;

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

        <input ref={ref} className={clsx(s.field, "focus-outline")} {...rest} />
      </label>
    </div>
  );
});

export default memo(TextField);
