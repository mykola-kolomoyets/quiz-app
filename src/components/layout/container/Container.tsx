import { FC, PropsWithChildren } from "react";
import s from "./Container.module.scss";

const Container: FC<PropsWithChildren> = ({ children }) => (
  <main className={s.wrapper}>{children}</main>
);

export default Container;
