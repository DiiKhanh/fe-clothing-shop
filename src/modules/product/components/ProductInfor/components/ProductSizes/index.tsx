import { Button, Stack, Theme, Typography } from '@mui/material';
import StraightenIcon from '@mui/icons-material/Straighten';
import { useTheme, withStyles } from '@mui/styles';
import openSocket from 'socket.io-client';
import { ReactElement, useEffect, useState } from 'react';
import { CustomProductSize, Product } from '@/types/product';
import { env } from '@/config/env';

type ProductSizesProps = {
  sizes: CustomProductSize[];
  onChange: (_size: CustomProductSize) => void;
  product: Product;
  isSoldOut: (_size: string) => boolean;
  currentSize: CustomProductSize | undefined;
  onDisplayModal: () => void;
};

function ProductSizes({
  sizes,
  onChange,
  product,
  isSoldOut,
  currentSize,
  onDisplayModal,
}: ProductSizesProps): ReactElement {
  const [productSizes, setProductSizes] = useState(sizes);
  const [selectedSize, setSelectedSize] = useState(currentSize);
  const theme = useTheme<Theme>();

  useEffect(() => {
    setSelectedSize(currentSize);
  }, [currentSize]);

  useEffect(() => {
    setProductSizes(sizes);
  }, [sizes]);

  useEffect(() => {
    const socket = openSocket(env.API_URL || '');
    socket.on('orders', (data) => {
      const { action } = data;

      if (action === 'create') {
        const loadedSizes: { productId: string; sizes: CustomProductSize[] }[] = data.productSizes;
        const sizesData = loadedSizes.find((item) => item.productId === product._id);
        if (sizesData) {
          setProductSizes(sizesData.sizes);

          const remainingCurrentSize = sizesData.sizes.find((size) => size.name === selectedSize?.name);
          if (remainingCurrentSize?.remainingQuantity! > 0) {
            setSelectedSize(remainingCurrentSize);
          }
        }
      }
    });
  }, [product._id, selectedSize]);

  const renderSizeButton = (size: CustomProductSize) => {
    const StyledButton = withStyles({
      root: {
        borderColor: theme.palette.grey['900'],
        borderRadius: 0,
        backgroundColor: selectedSize?.name === size.name ? `${theme.palette.grey['900']} !important` : 'transparent',
        color: selectedSize?.name === size.name ? theme.palette.common.white : theme.palette.common.black,
      },
    })(Button);

    return (
      <StyledButton
        key={size.name}
        variant="outlined"
        disabled={size.remainingQuantity === 0 || isSoldOut(size.name)}
        onClick={() => onChange(size)}
      >
        {size.name}
      </StyledButton>
    );
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontWeight: 400 }}>Chọn size:</Typography>
        <Typography
          sx={{ fontWeight: 400, textDecorationLine: 'underline', cursor: 'pointer' }}
          onClick={onDisplayModal}
        >
          <StraightenIcon sx={{ mr: 1 }} />
          Hướng dẫn chọn size
        </Typography>
      </Stack>
      <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        {productSizes.map((size) => renderSizeButton(size))}
      </Stack>

      {selectedSize && (
        <Typography sx={{ fontWeight: 400, fontSize: 14, mt: 1 }}>
          Còn lại: {selectedSize.remainingQuantity} sản phẩm
        </Typography>
      )}
    </>
  );
}

export default ProductSizes;
