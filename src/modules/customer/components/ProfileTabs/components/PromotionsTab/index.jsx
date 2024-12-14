import { Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import PromotionList from '@/modules/promotion/components/List';
import Button from '@/common/components/Buttons/Button.tsx';
import { appAssets } from '@/common/assets';
import config from '@/config';
import { useSelector } from 'react-redux';
import { selectPromotions } from '@/redux/slices/promotions.ts';

function PromotionsTab() {
  const customerPromotions = useSelector(selectPromotions);

  return (
    <>
      <Typography variant="h5">Ưu đãi của bạn</Typography>
      <Typography variant="body1" sx={{ mt: '6px' }}>
        Bạn có thể xem các ưu đãi của mình tại đây.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {customerPromotions?.length === 0 ? (
        <Stack direction="column" alignItems="center">
          <Typography variant="h6">Bạn chưa có ưu đãi nào</Typography>
          <Image src={appAssets.promotion} width={300} height={300} alt="Không tìm thấy ưu đãi nào" />
          <Link href={config.routes.promotions}>
            <Button className="px-12">Nhận ưu đãi ngay</Button>
          </Link>
        </Stack>
      ) : (
        <PromotionList promotions={customerPromotions} isUsedInProfile />
      )}
    </>
  );
}

export default PromotionsTab;
