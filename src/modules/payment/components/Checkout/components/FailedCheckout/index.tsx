import { ReactElement } from 'react';
import Image from 'next/image';
import BuySteppers from '@/common/components/_shared/Payment/Steppers';
import Title from '@/common/components/_shared/UIElements/Title';
import Button from '@/common/components/Buttons/Button';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { appAssets } from '@/common/assets';

function FailedCheckout(): ReactElement {
  return (
    <>
      <BuySteppers activeStep={3} />
      <Title sx={{ textAlign: 'center' }}>ĐÃ HỦY ĐƠN HÀNG</Title>
      <Image src={appAssets.payCardIcon} alt="img-payCardIcon" width={120} height={120} className="mx-auto my-10" />
      <Box sx={{ textAlign: 'center', px: '12px' }}>
        <Typography>Đơn hàng đã bị hủy vì quý khách đã hủy giao dịch</Typography>
        <Typography>Quý khách vui lòng thực hiện lại thanh toán để hoàn tất đặt hàng</Typography>
        <Typography>Chân thành cảm ơn quý khách đã tin tưởng Clothing Shop</Typography>
        <Link href="/checkout/shipping">
          <Button className="px-10 mb-8 mt-3">Thanh toán lại</Button>
        </Link>
      </Box>
    </>
  );
}

export default FailedCheckout;
