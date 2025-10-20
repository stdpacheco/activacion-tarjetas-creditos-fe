import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const element = document.getElementById("portal");

export const Portal: FC<PortalProps> = ({ children }) => {
  return createPortal(children, element ?? document.body);
};
