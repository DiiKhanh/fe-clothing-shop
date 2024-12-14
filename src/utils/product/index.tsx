import { Box, Typography } from '@mui/material';
import { AppSizes, SIZES } from '@/utils/constants';
import { ProductSize } from '@/types/product';
import { printNumberWithCommas } from '../common';

export const getRemainingQuantity = (productSizes: ProductSize[], selectedSize: string) => {
  const sizeItem = productSizes.find((size) => size.name === selectedSize);
  if (sizeItem) {
    const remainingQuantity = sizeItem.quantity - sizeItem.sold;
    return remainingQuantity;
  }
};

export const isSoldOutForEverySize = (productSizes: ProductSize[], selectedSize: string) => {
  const remainingQuantity = getRemainingQuantity(productSizes, selectedSize);
  if (remainingQuantity === 0) {
    return true;
  }

  return false;
};

export const isSoldOutForAllSizes = (productSizes: ProductSize[]) => {
  let isSoldOut = true;
  Object.keys(SIZES).forEach((key) => {
    if (!isSoldOutForEverySize(productSizes, (SIZES as AppSizes)[key])) {
      isSoldOut = false;
    }
  });
  return isSoldOut;
};

export const renderPrice = (product: any) => {
  if (product.oldPrice) {
    return (
      <Box sx={{ fontSize: { xs: '12px', md: '13px' }, fontWeight: 'bold' }}>
        <strong className="line-through">{printNumberWithCommas(product.oldPrice)}đ</strong>
        <strong className="ml-1 text-[#ff0000]">{printNumberWithCommas(product.price)}đ</strong>
      </Box>
    );
  }

  return (
    <Typography sx={{ fontSize: { xs: '12px', md: '13px' }, fontWeight: 'bold' }}>
      {printNumberWithCommas(product.price)}đ
    </Typography>
  );
};

export const mapProductsToView = (products: any[]) => {
  return products.map((product) => ({ ...product, _id: product._id }));
};
