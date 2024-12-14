import Link from 'next/link';
import { Card, CardActions, CardContent, Divider, Stack, Typography } from '@mui/material';

import Title from '@/common/components/_shared/UIElements/Title';
import Button from '@/common/components/Buttons/Button';
import { printNumberWithCommas } from '@/utils/common';
import { isNumber } from '@/utils/common';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';

type PreviewOrderProps = {
  cartProducts: (CartItem & { productId: Product })[];
  totalPrice: number;
  shippingPrice: number;
  selectedPromotion: string;
  onPay: (_price: number) => void;
};

function PreviewOrder({ cartProducts, totalPrice, shippingPrice, selectedPromotion, onPay }: PreviewOrderProps) {
  const parsedPromotion = selectedPromotion ? JSON.parse(selectedPromotion) : {};
  const discountPrice = (totalPrice * parsedPromotion?.percentage) / 100;

  const handlePay = () => {
    if (isNumber(discountPrice)) {
      onPay(totalPrice - discountPrice);
    } else {
      onPay(totalPrice);
    }
  };

  return (
    <Card>
      <CardContent>
        <Title>Đơn hàng của bạn</Title>
        <Divider sx={{ marginY: '12px' }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 500 }}>Sản phẩm</Typography>
          <Typography sx={{ fontWeight: 500 }}>Thành tiền</Typography>
        </Stack>
        <ul>
          {cartProducts.map((cartProduct) => (
            <li key={`${cartProduct.productId._id}-${cartProduct.size}`} className="my-2">
              <div className="flex justify-between gap-8">
                <span className="font-normal">
                  {cartProduct.quantity} X{' '}
                  <Link
                    href={`/shop/products/${cartProduct.productId._id}`}
                    className="hover:text-[#0056b3] transition duration-300"
                  >
                    {cartProduct.productId.name}
                  </Link>{' '}
                  - {cartProduct.size}
                </span>
                <span className="font-normal">
                  {printNumberWithCommas(cartProduct.productId.price * cartProduct.quantity)}đ
                </span>
              </div>
            </li>
          ))}
        </ul>

        <Divider sx={{ marginY: 2 }} orientation="horizontal" />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: '4px' }}>
          <Typography>Phí vận chuyển</Typography>
          <Typography>{printNumberWithCommas(shippingPrice)}đ</Typography>
        </Stack>
        {isNumber(discountPrice) && (
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: '4px' }}>
            <Typography>Ưu đãi</Typography>
            <Typography>- {printNumberWithCommas(discountPrice)}đ</Typography>
          </Stack>
        )}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: '4px' }}>
          <Typography>Tổng thanh toán</Typography>
          <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>
            {isNumber(discountPrice)
              ? printNumberWithCommas(totalPrice - discountPrice)
              : printNumberWithCommas(totalPrice)}
            đ
          </Typography>
        </Stack>

        <CardActions>
          <Button className="w-full my-3" onClick={handlePay} name="redirect">
            Thanh toán
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default PreviewOrder;
