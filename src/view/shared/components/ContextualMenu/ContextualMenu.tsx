import { FC, ReactNode } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { IItemMenu } from "@/domain/MiscInterfaces/ContextualMenu";
import styles from "./contextualMenu.module.scss";

interface ContextualMenuProps {
  children: ReactNode;
  items: Array<IItemMenu>;
  id?: string;
  className?: string;
  onClick?: () => void;
}

export const ContextualMenu: FC<ContextualMenuProps> = ({
  children,
  items,
  id,
  className,
  onClick,
}) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div id={id} className={className} onClick={onClick}>
          {children}
        </div>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className={styles.contextMenuContent}>
          {items.length
            ? items
                .filter((i) => !i.noShow)
                .map(({ name, onClick }, idx) => (
                  <ContextMenu.Item
                    key={`${name}_${idx}`}
                    onClick={onClick}
                    className={styles.contextMenuItem}
                  >
                    {name}
                  </ContextMenu.Item>
                ))
            : null}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
