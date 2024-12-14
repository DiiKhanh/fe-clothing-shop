import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { printNumberWithCommas } from '@/utils/common';
import { Product } from '@/types/product';
import { cld } from '@/utils/lib/cloudinary';
import useAuth from '@/hooks/useAuth';
import useLoginModal from '@/hooks/useLoginModal';
import { useTheme } from '@mui/styles';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/auth';
import { useWishlist } from '@/hooks/useWishlist';
import Button from '@/common/components/Buttons/Button';
import { selectCartProducts } from '@/redux/slices/cart';
import useCart from '@/hooks/useCart';

type ProductItemProps = {
  product: Product;
  forDetail?: boolean;
};

function ProductItem({ product, forDetail }: ProductItemProps): ReactElement {
  const isAuthenticated = useAuth();
  const [isOpenSizes, setIsOpenSizes] = useState(false);
  const { onOpenModal, render: renderLoginModal } = useLoginModal();
  const theme = useTheme<Theme>();
  const currentUser = useSelector(selectCurrentUser);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const cartProducts = useSelector(selectCartProducts);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { handleAddToWishlist: addToWishlist, handleRemoveFromWishlist: removeFromWishlist } = useWishlist();
  const { handleAddToCart: addToCart } = useCart();

  const mainImg = cld.image(product.images.mainImg);
  const subImg = cld.image(product.images.subImg);

  useEffect(() => {
    const isAdded = currentUser
      ? currentUser.wishlist.findIndex((item) => (item as Product)._id === product._id) !== -1
      : false;
    setIsAddedToWishlist(isAdded);
  }, [currentUser, product._id]);

  useEffect(() => {
    const isAdded = cartProducts?.findIndex((item) => item.productId._id === product._id) !== -1;
    setIsAddedToCart(isAdded);
  }, [cartProducts, product._id]);

  const renderDetailInfor = () => {
    return (
      <div className="font-normal ml-1">
        <Tooltip title={product.name}>
          <p className="line-clamp-1 font-semibold">{product.name}</p>
        </Tooltip>
        {renderBasicInfor()}
      </div>
    );
  };

  const renderBasicInfor = () => {
    return (
      <>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {renderPrice()}
          <Tooltip title="Thêm vào danh sách yêu thích">
            <IconButton>
              {isAddedToWishlist ? (
                <FavoriteIcon sx={{ color: theme.palette.error.light }} onClick={handleRemoveFromWishlist} />
              ) : (
                <FavoriteBorderIcon onClick={handleAddToWishlist} />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
        <Button
          disabled={isAddedToCart}
          className={`py-2 px-4 text-[11px] rounded-full ${isAddedToCart && '!bg-lightGray100 !text-[#787878]'}`}
          onClick={handleOpenSizes}
        >
          {isAddedToCart ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
        </Button>
      </>
    );
  };

  const renderPrice = () => {
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

  const renderSizes = () => {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 3, pt: 2 }}>
        {product.sizes.map((size) => {
          const isSoldOut = size.quantity - size.sold === 0;
          return (
            <Typography
              key={size._id}
              sx={{ cursor: isSoldOut ? 'default' : 'pointer', color: isSoldOut ? 'gray' : 'black' }}
              onClick={!isSoldOut ? () => handleAddToCart(size.name) : () => {}}
            >
              {size.name}
            </Typography>
          );
        })}
      </Stack>
    );
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      onOpenModal();
      return;
    }

    addToWishlist(product._id, () => {
      setIsAddedToWishlist(true);
    });
  };

  const handleRemoveFromWishlist = async () => {
    removeFromWishlist(product._id, () => {
      setIsAddedToWishlist(false);
    });
  };

  const handleOpenSizes = () => {
    setIsOpenSizes(true);
  };

  const handleAddToCart = (size: string) => {
    addToCart(product, size, 1);
    setIsOpenSizes(false);
  };

  return (
    <>
      <div className="group flex relative overflow-hidden pb-[12px]">
        <div
          className={`${
            !isOpenSizes && 'group-hover:translate-x-[-100%]'
          } transition-all duration-700 ease-in-out cursor-pointer`}
        >
          <Link href={`/shop/products/${product._id}`}>
            <AdvancedImage cldImg={mainImg} plugins={[responsive(), placeholder()]} />
          </Link>
        </div>
        {isOpenSizes && (
          <div className="absolute bottom-[12px] w-full bg-lightGray100 px-3 pb-4 pt-1 text-[13px]">
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <IconButton onClick={() => setIsOpenSizes(false)}>
                <CloseIcon sx={{ fontSize: '12px' }} />
              </IconButton>
            </Stack>

            <p className="text-center font-bold">Chọn size để thêm vào giỏ hàng</p>
            {renderSizes()}
          </div>
        )}
        <div
          className={`w-full absolute right-[-300%] ${
            !isOpenSizes && 'group-hover:right-0'
          } transition-all duration-700 ease-in-out cursor-pointer`}
        >
          <Link href={`/shop/products/${product._id}`}>
            <AdvancedImage cldImg={subImg} plugins={[lazyload(), responsive(), placeholder()]} />
          </Link>
        </div>
      </div>
      {forDetail ? renderDetailInfor() : renderPrice()}
      {renderLoginModal()}
    </>
  );
}

export default ProductItem;
