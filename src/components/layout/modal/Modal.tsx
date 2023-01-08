import { useRef, memo } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Title from "@/components/ui/typography/title";
import s from "./Modal.module.scss";

export type ModalProps = {
  /**
        The content of the component.
    */
  children: React.ReactNode;
  /**
        The title of the component.
    */
  title?: string;
  /**
   * Position of modal by Y axis
   */
  position?: "top" | "center";
  /**
        If true the component is shown.
    */
  opened: boolean;
  /**
        Callback function for close the component.
    */
  onClose?: () => void;
  /**
        Override or extend the styles applied to the component.
    */
  additionalClasses?: string;
};

const Modal: React.FC<ModalProps> = ({
  children,
  position,
  title,
  opened,
  onClose,
  additionalClasses = "",
}) => {
  const bodyRef = useRef(document.body);

  const closeHandler = () => {
    onClose?.();
  };

  return createPortal(
    <AnimatePresence>
      {opened && (
        <motion.div
          className={s.backdrop}
          onClick={closeHandler}
          initial={{ opacity: 0, pointerEvents: "none" }}
          animate={{
            opacity: 1,
            pointerEvents: "auto",
            transition: {
              duration: 0.2,
            },
          }}
          exit={{
            opacity: 0,
            pointerEvents: "none",
            transition: {
              duration: 0.2,
            },
          }}
        >
          <div className={clsx(s.inner, "o-hidden")}>
            <div
              className={clsx(s.box, additionalClasses, {
                [s.top]: position === "top",
              })}
              onClick={(e) => e.stopPropagation()}
            >
              {onClose ? (
                <div className={s.header}>
                  {title && <Title view="secondary">{title}</Title>}
                </div>
              ) : null}
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    bodyRef.current
  );
};

export default memo(Modal);
