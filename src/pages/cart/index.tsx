import PageContainer from '@/common/components/Layout/PageContainer';
import CartTable from '@/modules/cart/components/Table';
import PreviewInvoice from '@/modules/cart/components/PreviewInvoice';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';

function CartPage() {
  const cartProducts = useSelector(selectCartProducts);

  return (
    <PageContainer barTitle="Thông tin giỏ hàng của bạn" headTitle="Giỏ Hàng">
      <Container maxWidth={false}>
        <CartTable />
        {cartProducts?.length > 0 && <PreviewInvoice />}
      </Container>
    </PageContainer>
  );
}

export default CartPage;
