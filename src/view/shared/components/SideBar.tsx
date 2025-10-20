interface ISidebarProps {
  isExpanded?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export const SideBar = ({ children, header }: ISidebarProps) => {
  return (
    <aside className="max-h-screen hidden lg:block md:hidden sm:hidden">
      <nav className="flex h-screen flex-col  bg-white shadow-sm">
        {header}
        {children}
      </nav>
    </aside>
  );
};
