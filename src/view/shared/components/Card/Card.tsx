import { ReactNode, FC } from "react";
import styles from "./card.module.scss";
import classNames from "classnames";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return <section className={classNames(styles.card, className)}>{children}</section>;
};
