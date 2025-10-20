import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuOutline from "@/components/assets/menu-outline.svg";

export interface DropdownButtonItem {
  label: string;
  icon: string;
  onClick: () => void;
}

export interface DropdownButtonProps {
  buttons: DropdownButtonItem[];
  buttonIcon?: string;
  position?: "left" | "middle" | "right";
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  buttons,
  buttonIcon = MenuOutline,
  position = "left",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleButtonClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  const getMenuPositionClass = () => {
    switch (position) {
      case "right":
        return "left-0";
      case "middle":
        return "left-1/2 transform -translate-x-1/2";
      case "left":
      default:
        return "right-0";
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="p-2 rounded-full focus:outline-none">
        <img className="cursor-pointer" src={buttonIcon} width={18} alt="Menu" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, x: "10%", y: "-10%" }}
            animate={{ opacity: 1, scale: 1, x: "0%", y: "0%" }}
            exit={{ opacity: 0, scale: 0.75, x: "10%", y: "-10%" }}
            transition={{ duration: 0.2 }}
            className={`absolute ${getMenuPositionClass()} mt-1 w-80 max-w-[90dvw] bg-white border rounded-lg z-50`}
          >
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button.onClick)}
                className="w-full block px-4 py-4 text-gray-800 hover:bg-gray-100 flex items-center transition-all duration-200 ease-in-out"
              >
                <img
                  className="cursor-pointer mr-4"
                  src={button.icon}
                  width={18}
                  alt={button.label}
                />
                {button.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
