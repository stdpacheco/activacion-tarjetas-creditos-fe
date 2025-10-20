import { FC } from "react";
import styles from "./bank-avatar.module.scss";
interface BankAvatarProps {
  bankCode: string;
  className?: string;
}

const getLogo = (_codigo: string | undefined) => {
  return "";
};

export const BankAvatar: FC<BankAvatarProps> = ({ bankCode, className }) => {
  const logo = getLogo(bankCode);

  return (
    <img
      className={className ?? styles.bankAvatar}
      src={logo}
      alt={bankCode}
      draggable={false}
    />
  );
};
