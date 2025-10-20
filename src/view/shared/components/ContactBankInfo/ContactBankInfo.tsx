import { FC } from "react";
import styles from "./contact-bank-info.module.scss";
interface ContactBankInfoProps {
  contact: string;
  typeAccount: string;
  numberAccount: string;
}
export const ContactBankInfo: FC<ContactBankInfoProps> = ({
  contact,
  numberAccount,
  typeAccount,
}) => {
  return (
    <div className={styles.contactBackInfoContainer}>
      <span className={styles.contactBackInfoNameContact}>{contact}</span>
      <div className={styles.contactBackInfoAccount}>
        {typeAccount && numberAccount && (
          <span>
            {typeAccount} - {numberAccount}
          </span>
        )}
      </div>
    </div>
  );
};
