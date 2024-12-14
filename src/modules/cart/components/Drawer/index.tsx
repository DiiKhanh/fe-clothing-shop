import { useRouter } from 'next/router';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import config from '@/config';
import { useAppSelector } from '@/hooks/useAppSelector';
import CartDrawerView from './view';

type CartDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
};

function CartDrawer({ isVisible, onClose }: CartDrawerProps) {
  const isAuthenticated = useAppSelector<boolean>(selectIsAuthenticated);
  const router = useRouter();

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push(config.routes.checkoutShipping);
    } else {
      router.push(config.routes.checkoutLogin);
    }

    onClose();
  };

  const handlePreviewCart = () => {
    router.push(config.routes.cart);
    onClose();
  };

  return (
    <CartDrawerView
      isVisible={isVisible}
      onCheckout={handleCheckout}
      onClose={onClose}
      onPreviewCart={handlePreviewCart}
    />
  );
}

export default CartDrawer;
