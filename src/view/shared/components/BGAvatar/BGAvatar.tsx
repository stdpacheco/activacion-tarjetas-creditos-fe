import { FC } from "react";
import styles from "./bgAvatar.module.scss";
import { classx } from "@/view/utils";

interface BGAvatarProps {
  name?: string;
  src?: string;
  className?: string;
  size?: number;
  insideSpace?: number;
}

export const BGAvatar: FC<BGAvatarProps> = ({
  name,
  className,
  src,
  size,
  insideSpace,
}) => {
  return (
    <div
      className={classx(styles.bgAvatar, className)}
      style={{ width: size ?? 40, height: size ?? 40 }}
    >
      <span className={styles.bgAvatarText}>
        {name?.toInitials()}
        {src && (
          <img
            src={src}
            width={size ? size - (insideSpace ?? 0) : 36}
            height={size ? size - (insideSpace ?? 0) : 36}
          />
        )}
      </span>
    </div>
  );
};
