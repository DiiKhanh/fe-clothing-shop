import { ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import { selectCartProducts } from '@/redux/slices/cart';
import { selectCurrentUser } from '@/redux/slices/auth';
import CheckoutMethods from '@/modules/payment/components/Checkout/components/Methods';
import PreviewOrder from '@/modules/payment/components/Order/components/Preview';
import CompanyBill, { RefType } from '@/modules/payment/components/CompanyBill';
import { TRANSPORTATION_COST, paymentMethods } from '@/utils/constants';
import PromotionRadioBtnForm from '@/modules/promotion/components/Form';
import { fetchUpdatePromotionQuantity } from '@/redux/slices/promotions';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { env } from '@/config/env';

function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [selectedPromotion, setSelectedPromotion] = useState<string>();
  const cartProducts = useAppSelector(selectCartProducts);
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ref = useRef<RefType | null>(null);
  const { toName, toPhone, toAddress, toNote, toEmail } = router.query;
  const totalProductsPrice = cartProducts.reduce(
    (acc: number, currentItem: { productId: { price: number }; quantity: number }) => {
      return acc + currentItem.productId.price * currentItem.quantity;
    },
    0,
  );
  const totalPrice = totalProductsPrice + TRANSPORTATION_COST;

  const payHandler = async (totalPrice: number) => {
    const { companyName, companyAddress, companyTaxNumber } = ref.current!.getInvoiceCompany();

    const formatedCartProducts = cartProducts.map((cartProduct: CartItem) => ({
      product: (cartProduct.productId as Product)._id,
      name: (cartProduct.productId as Product).name,
      price: (cartProduct.productId as Product).price,
      amount: cartProduct.quantity,
      size: cartProduct.size,
      image: `${env.CLOUDINARY_PREFIX_PATH}/${(cartProduct.productId as Product).images.mainImg}`,
    }));

    const shippingInfor = JSON.parse(localStorage.getItem('shippingInfor') || '{}');

    const order = {
      toName: toName || shippingInfor.name,
      toPhone: toPhone || shippingInfor.phone,
      toEmail: toEmail || shippingInfor.email,
      toAddress: toAddress || shippingInfor.address,
      toNote: toNote || shippingInfor.note,
      products: formatedCartProducts,
      totalProductsPrice,
      shippingPrice: TRANSPORTATION_COST,
      totalPrice,
      companyName,
      companyAddress,
      companyTaxNumber,
      paymentMethod: paymentMethod === 'cod' ? paymentMethods.COD : paymentMethods.VNPAY,
      customerId: currentUser?._id,
    };
    localStorage.setItem('order', JSON.stringify(order));

    if (selectedPromotion) {
      const parsedSelectedPromotion = JSON.parse(selectedPromotion);
      dispatch(fetchUpdatePromotionQuantity(parsedSelectedPromotion._id));
    }

    if (paymentMethod === 'cod') {
      toast.success('Đặt hàng thành công');
      router.replace(
        {
          pathname: '/checkout/success',
          query: {
            name: toName || shippingInfor.name,
            email: toEmail || shippingInfor.email,
            method: 'cod',
          },
        },
        '/checkout/success',
      );
      return;
    }

    router.replace(`${env.API_URL}/payments/vnpay?totalPrice=${totalPrice}`);
  };

  const changePaymentMethodHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const changePromotionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPromotion(e.target.value);
  };

  return (
    <Grid container spacing={3} className="mt-5 mb-10">
      <Grid item xs={12}>
        <PromotionRadioBtnForm selectedPromotion={selectedPromotion} onChangePromotion={changePromotionHandler} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <CheckoutMethods method={paymentMethod} onChangeMethod={changePaymentMethodHandler} />
        <CompanyBill ref={ref} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <PreviewOrder
          cartProducts={cartProducts}
          totalPrice={totalPrice}
          shippingPrice={TRANSPORTATION_COST}
          selectedPromotion={selectedPromotion || '{}'}
          onPay={payHandler}
        />
      </Grid>
    </Grid>
  );
}

export default PaymentForm;
