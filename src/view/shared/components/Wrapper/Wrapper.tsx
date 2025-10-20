import { FC, ReactNode } from "react";
import { classx } from "@/view/utils";
import styles from "./wrapper.module.scss";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export const Wrapper: FC<WrapperProps> = ({ children, className }) => {
  return <div className={classx(styles.wrapper, className)}>{children}</div>;
};
