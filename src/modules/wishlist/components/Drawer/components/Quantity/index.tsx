import React, { ReactElement, useImperativeHandle, useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { printNumberWithCommas } from '@/utils/common';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';

export type WishlistQuantityRef = {
  getQuantity: () => number;
};

type WishlistQuantityProps = {
  price: number;
  id: string;
};

export default React.forwardRef<WishlistQuantityRef | undefined, WishlistQuantityProps>(function WishlistQuantity(
  { price, id },
  ref,
): ReactElement {
  const [quantity, setQuantity] = useState(1);

  const cartProducts = useSelector(selectCartProducts);
  const isAddedToCart = cartProducts.findIndex((item) => item.productId._id === id) !== -1;

  useImperativeHandle(ref, () => ({
    getQuantity: () => {
      return quantity;
    },
  }));

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100px', mt: 1, border: 1, py: '4px', px: 1 }}
      >
        <IconButton onClick={handleDecreaseQuantity} disabled={quantity === 1 || isAddedToCart}>
          <RemoveIcon sx={{ fontSize: '14px' }} />
        </IconButton>
        <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>{quantity}</Typography>
        <IconButton onClick={handleIncreaseQuantity} disabled={isAddedToCart}>
          <AddIcon sx={{ fontSize: '14px' }} />
        </IconButton>
      </Stack>
      <Typography sx={{ fontWeight: 500, mt: 1 }}>{printNumberWithCommas(price * quantity)}đ</Typography>
    </Box>
  );
});
