import clsx from "clsx";
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useState,
} from "react";
import Modal from "@/components/layout/modal/Modal";
import Title from "@/components/ui/typography/title";
import s from "./Select.module.scss";
import TextField from "../text-field";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  instanceId: string;
  label: string;
  options: SelectOption[];
  value?: SelectOption;
  onChange?: (value: SelectOption) => void;
  additionalClasses?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    { instanceId, label, options, value, onChange, additionalClasses, ...rest },
    ref
  ) => {
    const [isOpened, setIsOpened] = useState(false);

    const onSelectOpen = useCallback(() => {
      setIsOpened(true);
    }, [setIsOpened]);

    const onOptionSelect = useCallback(
      (value: SelectOption) => {
        onChange && onChange(value);

        setIsOpened(false);
      },
      [onChange, setIsOpened]
    );

    return (
      <div className={clsx(s.wrapper, additionalClasses)}>
        <label>
          <TextField
            ref={ref}
            label={label}
            value={value?.label}
            placeholder="Enter your class"
            onFocus={onSelectOpen}
          />

          <select
            aria-hidden="true"
            name={instanceId}
            id={instanceId}
            className={clsx(s.field, "focus-outline")}
            // onClick={onSelectOpen}
            role="button"
            {...rest}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <Modal
          opened={isOpened}
          title="Select your class"
          onClose={() => setIsOpened(false)}
        >
          <div className={s.optionsWrapper}>
            {options.map((option) => (
              <div
                key={option.label}
                className={clsx(s.option, {
                  [s.active]: option.value === value?.value,
                })}
                onClick={() => onOptionSelect(option)}
              >
                <Title view="secondary">{option.value}</Title>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
);

export default Select;
