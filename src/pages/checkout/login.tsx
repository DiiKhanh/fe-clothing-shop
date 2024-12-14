import { ReactElement, useEffect } from 'react';
import { Container, Divider, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import PageContainer from '@/common/components/Layout/PageContainer';
import Title from '@/common/components/_shared/UIElements/Title';
import BuySteppers from '@/common/components/_shared/Payment/Steppers';
import config from '@/config';
import ConfirmNotLogin from '@/modules/auth/components/ConfirmNotLogin';
import LoginForm from '@/modules/auth/components/LoginForm';
import EmptyCart from '@/modules/cart/components/Empty';
import { selectCartProducts } from '@/redux/slices/cart';
import useAuth from '@/hooks/useAuth';

function CheckoutLoginPage(): ReactElement {
  const cartProducts = useSelector(selectCartProducts);
  const isAuthenticated = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(config.routes.checkoutShipping);
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    router.push(config.routes.checkoutShipping);
  };

  return (
    <PageContainer barTitle="Đăng nhập" headTitle="Đặt Hàng">
      {cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <BuySteppers activeStep={0} />
          <Title sx={{ ml: { xs: 3, xl: 0 } }}>Đăng Nhập</Title>
          <Container maxWidth={false}>
            <Grid container spacing={3} sx={{ mt: '20px', mb: 4 }}>
              <Grid item xs={12} md={6} sx={{ pr: 2 }}>
                <LoginForm onLogin={handleLogin} />
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ mr: '-1px' }} />
              <Grid item xs={12} md={6}>
                <ConfirmNotLogin />
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </PageContainer>
  );
}

export default CheckoutLoginPage;
