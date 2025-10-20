import { IonSkeletonText, IonLabel, IonThumbnail } from "@ionic/react";
import styles from "./skeletonCard.module.scss";

export const SkeletonCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <IonThumbnail>
        <IonSkeletonText animated className={styles.skeletonCardIcon} />
      </IonThumbnail>

      <IonLabel>
        <h3>
          <IonSkeletonText
            animated
            className={styles.skTxtRounded}
            style={{ width: "60%", marginBottom: "10px" }}
          />
        </h3>

        <p>
          <IonSkeletonText
            animated
            className={styles.skTxtRounded}
            style={{ width: "100%" }}
          />
        </p>
      </IonLabel>
    </div>
  );
};
