import React from 'react';
import Title from '@/common/components/_shared/UIElements/Title';
import { CartItem as CartItemType } from '@/types/customer';
import CartItem from './components/CartItem';
import { printNumberWithCommas } from '@/utils/common';
import { getTotalPrice } from './service';
import Cell from './components/Cell';

type DetailCartViewProps = {
  products: CartItemType[];
};

function DetailCartView({ products }: DetailCartViewProps) {
  const totalPrice = getTotalPrice(products);

  return (
    <div>
      <Title>ĐƠN HÀNG CỦA BẠN</Title>
      <table className="w-full text-[#111] mt-2">
        <tbody>
          {products.map((cartProduct) => (
            <CartItem key={cartProduct._id} cartItem={cartProduct} />
          ))}
          <tr>
            <Cell className="text-right">Tổng: </Cell>
            <Cell>
              <div>
                <b className="text-lg">{printNumberWithCommas(totalPrice)} đ</b>
              </div>
            </Cell>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DetailCartView;
