import { FC } from "react";
import { IonIcon } from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { BankAvatar } from "@/view/shared/components";
import styles from "./bankSelect.module.scss";
import { classx } from "@/view/utils";

interface BankSelectProps {
  bankCode: string;
  bankName?: string;
  onSelectBank?: () => void;
}

export const BankSelect: FC<BankSelectProps> = ({ bankCode, bankName, onSelectBank }) => {
  return (
    <div className={styles.bankSelectGroup}>
      <span className={styles.label}>Institución financiera</span>

      <button type="button" onClick={onSelectBank} className={styles.bankSelect}>
        <div className={styles.institution}>
          {bankName && (
            <BankAvatar bankCode={bankCode} className={styles.institutionImg} />
          )}

          <span className={classx(!bankName && styles.institutionPlaceholder)}>
            {bankName?.toCapitalize() ?? "Elige el banco"}
          </span>
        </div>

        <span className={styles.iconWrapper}>
          <IonIcon icon={chevronForward} className={styles.chevronIcon} />
        </span>
      </button>
    </div>
  );
};
