import { FC } from "react";
import { motion } from "framer-motion";

interface SpinButtonProps {
  icon: string;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const SpinButton: FC<SpinButtonProps> = ({
  icon,
  onClick,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <motion.button
      onClick={!isLoading && !disabled ? onClick : undefined}
      className={`p-2 rounded-full focus:outline-none ${
        isLoading || disabled ? "pointer-events-none" : ""
      }`}
      whileTap={!isLoading && !disabled ? { rotate: 360 } : {}}
      animate={isLoading ? { rotate: [0, 360] } : { rotate: 0 }}
      transition={{
        rotate: isLoading
          ? { duration: 1, repeat: Infinity, ease: "linear" }
          : { type: "spring", stiffness: 260, damping: 20 },
      }}
      disabled={isLoading || disabled}
    >
      <img className="cursor-pointer" width={18} src={icon} alt="icon" />
    </motion.button>
  );
};

export default SpinButton;
