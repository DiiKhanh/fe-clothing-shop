import { ChangeEvent, ReactElement } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Divider } from '@mui/material';
import ShippingMethod from '@/modules/payment/components/Checkout/components/Methods/components/ShippingMethod';
import Title from '@/common/components/_shared/UIElements/Title';

type CheckoutMethodsProps = {
  method: string;
  onChangeMethod: (_event: ChangeEvent<HTMLInputElement>) => void;
};

function CheckoutMethods({ method, onChangeMethod }: CheckoutMethodsProps): ReactElement {
  return (
    <>
      <Title sx={{ mb: 5 }}>Phương thức thanh toán</Title>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="cod"
          name="radio-buttons-group"
          value={method}
          onChange={onChangeMethod}
        >
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label={
              <ShippingMethod
                method="cod"
                title="Thanh toán khi nhận hàng"
                desc="Quý khách sẽ thanh toán bằng tiền mặt khi nhận được hàng."
              />
            }
          />
          <Divider sx={{ marginY: 4 }} orientation="horizontal" />
          <FormControlLabel
            value="online-payment-vnpay"
            control={<Radio />}
            label={
              <ShippingMethod
                method="pay-card"
                title="Thanh toán qua VNPay"
                desc="Quý khách sẽ được chuyển đến VNPay để thanh toán."
              />
            }
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default CheckoutMethods;
