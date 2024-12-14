import Button from '@/common/components/Buttons/Button.tsx';
import PropTypes from 'prop-types';
import { Box, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import PurchaseHistoryTable from './components/PurchaseHistoryTable';
import { appAssets } from '@/common/assets';

function PurchaseHistoryTab({ orders }) {
  return (
    <Box>
      <Typography variant="h5">Lịch sử mua hàng</Typography>
      <Typography variant="body1" sx={{ mt: '6px' }}>
        Bạn có thể xem lịch sử mua hàng và trạng thái đơn hàng tại đây.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {orders.length === 0 ? (
        <Stack direction="column" alignItems="center">
          <Typography variant="h6">Bạn chưa có đơn hàng nào</Typography>
          <Image src={appAssets.emptyOrderIcon} width={200} height={200} alt="Không có lịch sử mua hàng" />
          <Link href="/">
            <Button className="px-12">Mua sắm ngay</Button>
          </Link>
        </Stack>
      ) : (
        <PurchaseHistoryTable orders={orders} />
      )}
    </Box>
  );
}

PurchaseHistoryTab.propTypes = {
  orders: PropTypes.array.isRequired,
};

PurchaseHistoryTab.defaultProps = {
  orders: [],
};

export default PurchaseHistoryTab;
