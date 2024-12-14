import React, { FormEvent, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { printNumberWithCommas } from '@/utils/common';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import useCart from '@/hooks/useCart';
import { cld } from '@/utils/lib/cloudinary';
import { CartItem as CartItemType } from '@/types/customer';
import { Product } from '@/types/product';
import Cell from '../Cell';

type CartItemProps = {
  cartItem: CartItemType;
};

function CartItem({ cartItem }: CartItemProps) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { handleRemoveOneFromCart, handleUpdateQuantity } = useCart();
  const quantityRef = useRef<HTMLInputElement>(null);

  const product = cartItem.productId as Product;

  const handleRemoveFromCart = () => {
    const callback = () => {
      setModalIsVisible(false);
    };
    handleRemoveOneFromCart(product._id, cartItem.size, callback);
  };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>, productId: string, size: string) => {
  //   e.preventDefault();
  //   if (!quantityRef.current?.value) return;
  //   handleUpdateQuantity(productId, size, +quantityRef.current?.value);
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, productId: string, size: string) => {
    e.preventDefault();
    if (!quantityRef.current?.value) return;

    const enteredQuantity = +quantityRef.current.value;
    const productSize = product.sizes.find(item => item.name === cartItem.size);
    if (productSize && enteredQuantity > productSize.quantity) {
        alert(`Số lượng không thể vượt quá ${productSize.quantity}.`);
        return;
    }

    handleUpdateQuantity(productId, size, enteredQuantity);
};

  return (
    <>
      <tr>
        <Cell rowSpan={2} className="w-[100px]">
          <AdvancedImage
            cldImg={cld.image(product.images.mainImg)}
            plugins={[lazyload(), responsive(), placeholder()]}
            style={{ width: '100px' }}
            alt={product.name}
          />
          <button
            onClick={() => setModalIsVisible(true)}
            className="flex items-center font-light hover:text-[#0056b3] transition-all duration-300 ease-linear"
          >
            <DeleteIcon className="mr w-3 h-3" />
            &nbsp;<span>Xóa</span>
          </button>
        </Cell>
        <Cell className="py-3">
          <p className="text-sm text-[#444] mb-1 hover:text-[#0056b3] transition duration-300">
            <Link href={`/shop/products/${cartItem._id}`} className="font-medium">
              {product.name}
            </Link>
          </p>
          <p>
            {cartItem.size} / {printNumberWithCommas(product.price)}
          </p>
        </Cell>
      </tr>
      <tr>
        <Cell>
          <form onSubmit={(e) => handleSubmit(e, product._id, cartItem.size)} className="flex">
            <input
              type="number"
              required
              min={1}
              ref={quantityRef}
              defaultValue={cartItem.quantity}
              className="w-[100px] lg:w-auto py-[0.5rem] px-3 text-base font-normal text-[#495057] border-[1px] border-solid border-[#ced4da] flex-1 rounded outline-none focus:border-[#ee4266] transition duration-150"
            />
            <button className="py-1 px-2 ml-2 text-[13px] leading-6 rounded-[0.2rem] text-[#343a40] border-[1px] border-solid border-[#343a40] hover:text-white hover:bg-[#343a40] hover:border-[#343a40] transition-all duration-300 ease-linear">
              CẬP NHẬT
            </button>
          </form>
          =<b> {printNumberWithCommas(cartItem.quantity * product.price)} đ</b>
        </Cell>
      </tr>
      <ConfirmModal
        isOpen={modalIsVisible}
        title="Xóa sản phẩm?"
        subTitle="Bạn có chắc muốn xóa sản phẩm chứ?"
        confirmTextBtn="Xóa"
        onClose={() => setModalIsVisible(false)}
        onConfirm={handleRemoveFromCart}
      />
    </>
  );
}

export default CartItem;
