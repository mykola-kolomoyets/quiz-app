import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";
import { VariantStatus } from "@/shared/utils/types/variant";
import Title from "@/components/ui/typography/title";
import s from "./Radio.module.scss";

type RadioProps = {
  id: string;
  label: string;
  status?: VariantStatus;
  checked: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { id, label, status, ...rest } = props;

  return (
    <div className={s.wrapper}>
      <label
        className={clsx(s.radio, {
          [s.selected]: status === "selected" || rest.checked,
          [s.correct]: status === "correct",
          [s.incorrect]: status === "incorrect",
        })}
        htmlFor={id}
      >
        <input
          ref={ref}
          className={s.input}
          id={id}
          name={id}
          type="radio"
          {...rest}
        />

        <Title
          className={s.label}
          view="secondary"
          weight="medium"
          color="white"
        >
          {label}
        </Title>
      </label>
    </div>
  );
});

export default Radio;
