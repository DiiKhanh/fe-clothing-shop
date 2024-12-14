import { ReactElement, useRef, useState } from 'react';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import WishlistSizesMenu, { WishlistSizesMenuRef } from '../SizesMenu';
import WishlistQuantity, { WishlistQuantityRef } from '../Quantity';
import Button from '@/common/components/Buttons/Button';
import { selectCartProducts } from '@/redux/slices/cart';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import { Product } from '@/types/product';
import { cld } from '@/utils/lib/cloudinary';
import useCart from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

type WishlistDrawerItemProps = {
  product: Product;
};

function WishlistDrawerItem({ product }: WishlistDrawerItemProps): ReactElement {
  const [isSoldOut, setIsSoldOut] = useState(product?.sizes[0]?.quantity - product?.sizes[0].sold === 0);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const cartProducts = useSelector(selectCartProducts);
  const isAddedToCart = cartProducts.findIndex((item) => item.productId._id === product._id) !== -1;
  const cldImg = cld.image(product.images.mainImg);
  const sizesRef = useRef<WishlistSizesMenuRef>();
  const quantityRef = useRef<WishlistQuantityRef>();
  const { handleAddToCart: addToCart } = useCart();
  const { handleRemoveFromWishlist: removeFromWishlist } = useWishlist();

  const handleRemoveFromWishlist = async () => {
    removeFromWishlist(product._id);
  };

  const handleAddToCart = async () => {
    if (!sizesRef.current || !quantityRef.current) return;

    const size = sizesRef.current.getSelectedSize();
    const quantity = +quantityRef.current.getQuantity();
    addToCart(product, size, quantity);
  };

  const handleSizeChange = (isSoldOutParam: boolean) => {
    if (isSoldOutParam) {
      setIsSoldOut(true);
    } else {
      setIsSoldOut(false);
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ my: 4, position: 'relative' }}>
        <CloseIcon
          sx={{ position: 'absolute', top: -20, right: 0, fontSize: 18, cursor: 'pointer' }}
          onClick={() => setModalIsVisible(true)}
        />
        <Grid item xs={4}>
          <AdvancedImage cldImg={cldImg} plugins={[lazyload(), responsive(), placeholder()]} />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Link href={`/shop/products/${product._id}`}>
              <Typography sx={{ fontWeight: 500 }}>{product.name}</Typography>
            </Link>
            <WishlistSizesMenu ref={sizesRef} sizes={product.sizes} onSizeChange={handleSizeChange} />
            <WishlistQuantity ref={quantityRef} price={product.price} id={product._id} />
            {isSoldOut ? (
              <Button className={'w-[200px] rounded-none mt-2 !bg-lightGray100 !text-[#787878]'} disabled>
                Hết hàng
              </Button>
            ) : (
              <Button
                className={`w-[200px] rounded-none mt-2 ${isAddedToCart && '!bg-lightGray100 !text-[#787878]'}`}
                disabled={isAddedToCart}
                onClick={handleAddToCart}
              >
                {isAddedToCart ? 'Đã thêm' : 'Thêm vào giỏ hàng'}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      <ConfirmModal
        isOpen={modalIsVisible}
        title="Xóa sản phẩm?"
        subTitle="Bạn có chắc muốn xóa sản phẩm chứ?"
        confirmTextBtn="Xóa"
        onClose={() => setModalIsVisible(false)}
        onConfirm={handleRemoveFromWishlist}
      />
    </>
  );
}

export default WishlistDrawerItem;
