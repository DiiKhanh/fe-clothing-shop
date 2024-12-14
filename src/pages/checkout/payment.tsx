import { ReactElement } from 'react';
import { Container } from '@mui/material';
import BuySteppers from '@/common/components/_shared/Payment/Steppers';
import PageContainer from '@/common/components/Layout/PageContainer';
import config from '@/config';
import PaymentForm from '@/modules/payment';

const breadcrumbs = [
  { id: 'checkout/login', url: config.routes.checkoutLogin, name: 'Đăng nhập' },
  { id: 'checkout/shipping', url: config.routes.checkoutShipping, name: 'Thông tin đặt hàng' },
  { id: 'checkout/payment', url: config.routes.checkoutPayment, name: 'Thanh toán' },
];

function CheckoutPaymentPage(): ReactElement {
  return (
    <PageContainer barTitle="Đặt hàng" headTitle="Đặt Hàng" breadcrumbs={breadcrumbs}>
      <>
        <BuySteppers activeStep={2} />
        <Container maxWidth={false}>
          <PaymentForm />
        </Container>
      </>
    </PageContainer>
  );
}

export default CheckoutPaymentPage;
