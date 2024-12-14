import { ReactElement } from 'react';
import { appAssets } from '@/common/assets';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/common/components/Buttons/Button';
import config from '@/config';

function HomePromotionBanner(): ReactElement {
  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ pt: 5, pb: 1, fontSize: '1.5rem' }} variant="body2">
          Chương trình ưu đãi
        </Typography>
        <Typography sx={{ fontWeight: 'light' }}>Nhiều ưu đãi đang chờ bạn lấy</Typography>
      </Box>
      <Image
        src={appAssets.promotionBanner}
        width={1000}
        height={1000}
        alt="Chương trình ưu đãi"
        className="w-full mt-6"
      />
      <Box sx={{ textAlign: 'center', marginY: 3 }}>
        <Link href={config.routes.promotions}>
          <Button>Xem tất cả ưu đãi</Button>
        </Link>
      </Box>
    </>
  );
}

export default HomePromotionBanner;
