import { ReactElement } from 'react';
import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import { selectWishlistProducts } from '@/redux/slices/wishlist';
import WishlistDrawerItem from './components/Item';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Product } from '@/types/product';

type WishlistDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
};

function WishlistDrawer({ isVisible, onClose }: WishlistDrawerProps): ReactElement {
  const wishlistProducts = useAppSelector<Product[]>(selectWishlistProducts);

  return (
    <Drawer anchor="right" open={isVisible} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '100vw', sm: '30rem' },
          maxHeight: '100vh',
          px: 3,
          py: 4,
          position: 'relative',
          height: '100vh',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            <FavoriteBorderIcon sx={{ mr: 1 }} />
            Danh sách yêu thích
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Box sx={{ paddingBottom: 3 }}>
          {wishlistProducts?.length > 0 &&
            wishlistProducts.map((product) => <WishlistDrawerItem key={product._id} product={product} />)}
        </Box>

        {wishlistProducts?.length === 0 && (
          <Typography sx={{ textAlign: 'center', fontWeight: 400, mt: 10 }}>
            Bạn không có sản phẩm nào trong danh sách yêu thích
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}

export default WishlistDrawer;
