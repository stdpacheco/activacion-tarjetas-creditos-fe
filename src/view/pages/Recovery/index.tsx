import { Outlet, Navigate } from "react-router-dom";
import styles from "./recovery.module.scss";
import { Card } from "@/view/shared/components/Card/Card";
import { useRecoveryProtected } from "@/usecases/Recovery/useRecoveryProtected";
import { BASE_PATH, PublicRoutes } from "@/view/routers/Config";

const Recovery = () => {
  const isAuthorized = useRecoveryProtected();

  return (
    <>
      {!isAuthorized ? (
        <Navigate to={`${BASE_PATH}${PublicRoutes.RECOVERY}`} />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.recoveryContainer}>
            <Card>
              <Outlet />
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Recovery;
