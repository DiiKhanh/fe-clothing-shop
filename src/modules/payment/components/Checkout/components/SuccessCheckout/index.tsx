import Button from '@/common/components/Buttons/Button';
import BackdropLoading from '@/common/components/Loading/BackdropLoading';
import BuySteppers from '@/common/components/_shared/Payment/Steppers';
import Title from '@/common/components/_shared/UIElements/Title';
import { updateOrders } from '@/redux/slices/auth';
import { checkOut } from '@/redux/slices/cart';
import { checkOutOrder, createOrder } from '@/services/order';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function SuccessCheckout(): ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const router = useRouter();
  const dispatch = useDispatch();

  const { name, email } = router.query;
  const shippingInfor = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('shippingInfor') || '{}');

  useEffect(() => {
    const updateOrder = async () => {
      const order = JSON.parse(localStorage.getItem('order') || '{}');
      const { orderId, updatedOrders } = await createOrder(order);
      if (updatedOrders) {
        dispatch(updateOrders({ updatedOrders }));
      }

      if (router.query.vnp_ResponseCode === '00') {
        await checkOutOrder({ orderId: orderId });
      }

      dispatch(checkOut());
    };

    updateOrder();
  }, [router.query.vnp_ResponseCode, dispatch]);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  return (
    <>
      <BuySteppers activeStep={3} />
      <Title sx={{ textAlign: 'center' }}>ĐẶT HÀNG THÀNH CÔNG</Title>
      <Image src={`/assets/images/cod.svg`} alt="img-cod" width={120} height={120} className="mx-auto my-10" />
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ mb: '12px' }}>
            Cảm ơn Quý khách {name || shippingInfor.name} đã mua hàng trên Clothing Shop!
          </Typography>
          <Typography sx={{ width: { md: '85%', lg: '80%', xl: '65%' }, mx: 'auto', mb: '12px', px: '12px' }}>
            Thời gian giao hàng dự kiến từ 2 - 5 ngày (có thể kéo dài hơn nếu bị ảnh hưởng bởi những tình huống bất khả
            kháng: thiên tai, bão lũ...). Clothing Shop sẽ liên lạc với quý khách để xác nhận đơn và thông báo cụ thể.
          </Typography>
          <Typography>Rất mong quý khách hàng thông cảm!</Typography>
          <Typography sx={{ width: { md: '85%', lg: '80%', xl: '65%' }, mx: 'auto', mb: '12px', px: '12px' }}>
            Để xem lại thông tin đơn hàng, quý khách vui lòng kiểm tra xác nhận đơn hàng đã được gửi qua email{' '}
            <strong>{email || shippingInfor.email}</strong>
          </Typography>
          <Typography sx={{ width: { md: '85%', lg: '80%', xl: '65%' }, mx: 'auto', mb: '12px', px: '12px' }}>
            Trong trường hợp Quý khách không phải là Người trực tiếp nhận hàng. Quý khách vui lòng thông báo cho Người
            nhận luôn bật điện thoại để nhận liên lạc từ nhân viên giao hàng của Clothing Shop
          </Typography>
          <Link href="/">
            <Button className="px-10 mb-8">Trở về trang chủ</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default SuccessCheckout;
