import { FC, memo } from "react";
import s from "./Spinner.module.scss";

const Spinner: FC = () => (
  <div className={s.wrapper}>
    <div className={s.inner}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Spinner;
