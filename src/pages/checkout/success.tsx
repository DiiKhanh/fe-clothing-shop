import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import SuccessCheckout from '@/modules/payment/components/Checkout/components/SuccessCheckout';
import FailedCheckout from '@/modules/payment/components/Checkout/components/FailedCheckout';
import PageContainer from '@/common/components/Layout/PageContainer';
import config from '@/config';
import { Container } from '@mui/material';

const breadcrumbs = [
  { id: 'checkout/login', url: config.routes.checkoutLogin, name: 'Đăng nhập' },
  { id: 'checkout/shipping', url: config.routes.checkoutShipping, name: 'Thông tin đặt hàng' },
  { id: 'checkout/payment', url: config.routes.checkoutPayment, name: 'Thanh toán' },
  { id: 'checkout/success', url: config.routes.checkoutSuccess, name: '...' },
];

function CheckoutSuccessPage(): ReactElement {
  const router = useRouter();

  return (
    <PageContainer barTitle="Đặt hàng" headTitle="Đặt Hàng" breadcrumbs={breadcrumbs}>
      <Container maxWidth={false}>
        {router.query.vnp_ResponseCode && router.query.vnp_ResponseCode !== '00' ? (
          <FailedCheckout />
        ) : (
          <SuccessCheckout />
        )}
      </Container>
    </PageContainer>
  );
}

export default CheckoutSuccessPage;
