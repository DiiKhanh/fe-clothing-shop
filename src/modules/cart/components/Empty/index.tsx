import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/common/components/Buttons/Button';
import { appAssets } from '@/common/assets';

function EmptyCart() {
  return (
    <Box sx={{ textAlign: 'center', my: 3 }}>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }}>Bạn chưa chọn sản phẩm.</Typography>
      <Box>
        <Image src={appAssets.emptyCartIcon} width={300} height={300} alt="Giỏ hàng trống" className="mx-auto" />
      </Box>
      <Typography>Hãy nhanh tay chọn ngay sản phẩm yêu thích.</Typography>
      <Link href={'/'}>
        <Button className="my-4">Tiếp tục mua hàng</Button>
      </Link>
    </Box>
  );
}

export default EmptyCart;
