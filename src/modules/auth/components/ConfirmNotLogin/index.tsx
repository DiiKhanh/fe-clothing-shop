import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import Button from '@/common/components/Buttons/Button';
import config from '@/config';

function ConfirmNotLogin() {
  return (
    <>
      <Typography sx={{ display: { xs: 'block', md: 'none' }, my: 4, textAlign: 'center' }}>Hoặc</Typography>
      <Box>
        <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
          Mua hàng không cần đăng nhập
        </Typography>
        <Typography sx={{ textAlign: 'center', fontWeight: 400 }}>
          Chào mừng! Bạn không cần tạo tài khoản để đặt hàng
        </Typography>
        <Box sx={{ textAlign: 'center', my: '20px' }}>
          <Link href={config.routes.checkoutShipping}>
            <Button>Xác nhận mua hàng không đăng nhập</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default ConfirmNotLogin;
