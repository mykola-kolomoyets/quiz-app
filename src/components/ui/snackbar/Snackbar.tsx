import { FC, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useSnackbarStore } from "@/store/snackbar";
import { snackbarVariants } from "./animations";
import Title from "../typography/title";
import Text from "../typography/text";
import s from "./Snackbar.module.scss";

type SnackbarProps = {
  additionalClasses?: string;
};

const Snackbar: FC<SnackbarProps> = ({ additionalClasses }) => {
  const { isOpened, description, type } = useSnackbarStore();

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {isOpened ? (
        <motion.div
          className={clsx(s.wrapper, additionalClasses, {
            [s.success]: isSuccess,
            [s.error]: !isSuccess,
          })}
          {...snackbarVariants}
        >
          <Title
            className={s.title}
            view="secondary"
            weight="medium"
            color="white"
          >
            {isSuccess ? "Correct!" : "Incorrect!"}
          </Title>

          <Text
            className={s.subtitle}
            view="mini"
            weight="medium"
            color="white"
          >
            {isSuccess ? "Quote of the day:" : "Why?"}
          </Text>

          {description ? (
            <Text
              className={s.description}
              view="primary"
              weight="regular"
              color="white"
            >
              {description}
            </Text>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default memo(Snackbar);
