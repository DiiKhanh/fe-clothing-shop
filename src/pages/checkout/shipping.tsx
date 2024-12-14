import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import PageContainer from '@/common/components/Layout/PageContainer';
import CartInfor from '@/modules/cart/components/Infor';
import EmptyCart from '@/modules/cart/components/Empty';
import { selectCartProducts } from '@/redux/slices/cart';
import config from '@/config';

const breadcrumbs = [
  { id: 'checkout/login', url: config.routes.checkoutLogin, name: 'Đăng nhập' },
  { id: 'checkout/shipping', url: config.routes.checkoutShipping, name: 'Thông tin đặt hàng' },
];

function CheckoutShippingPage(): ReactElement {
  const products = useSelector(selectCartProducts);

  return (
    <PageContainer barTitle="Đặt hàng" headTitle="Đặt Hàng" breadcrumbs={breadcrumbs}>
      {products.length === 0 ? <EmptyCart /> : <CartInfor />}
    </PageContainer>
  );
}

export default CheckoutShippingPage;
