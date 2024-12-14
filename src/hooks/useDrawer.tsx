import { PropsWithChildren, ReactElement, ReactNode, useState } from 'react';

type DrawerProps = PropsWithChildren & {
  isVisible: boolean;
  onClose: () => void;
};

type DrawerComponent = (_props: DrawerProps) => ReactElement;

export default function useDrawer(Drawer: DrawerComponent) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  const render = (drawerChildren?: ReactNode) => {
    return (
      <Drawer isVisible={isOpen} onClose={handleCloseDrawer}>
        {drawerChildren}
      </Drawer>
    );
  };

  return {
    render,
    onOpen: handleOpenDrawer,
  };
}
