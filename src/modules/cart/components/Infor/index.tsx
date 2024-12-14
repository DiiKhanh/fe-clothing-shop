import { Container, Grid } from '@mui/material';
import BuySteppers from '@/common/components/_shared/Payment/Steppers';
import OrderForm from '@/modules/payment/components/Order/components/Form';
import DetailCart from '../Detail';

function CartInfor() {
  return (
    <>
      <BuySteppers activeStep={1} />
      <Container maxWidth={false}>
        <Grid container spacing={4} sx={{ mt: '20px', mb: 4 }}>
          <Grid item xs={12} md={6}>
            <DetailCart />
          </Grid>
          <Grid item xs={12} md={6}>
            <OrderForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CartInfor;
