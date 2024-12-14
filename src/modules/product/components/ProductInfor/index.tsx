import { Box, Grid, Stack, Typography, Button as ButtonMUI } from '@mui/material';
import Button from '@/common/components/Buttons/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from 'react-toastify';
import GeneralInfor from './components/Generalnfor';
import NumberBox, { NumberBoxRef } from './components/NumberBox';
import PreviewImages from './components/PreviewImages';
import Policies from './components/Policies';
import { ReactElement, useEffect, useRef, useState } from 'react';
import ProductSizes from './components/ProductSizes';
import SizeGuideModal from './components/SizeGuideModal';
import PreservationInstruction from './components/PreservationInstruction';
import { CustomProductSize, Product } from '@/types/product';
import { getRemainingQuantity, isSoldOutForAllSizes, isSoldOutForEverySize } from '@/utils/product';
import { useRouter } from 'next/router';
import useLoginModal from '@/hooks/useLoginModal';
import useCart from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import useAuth from '@/hooks/useAuth';

type ProductInforProps = {
  product: Product;
};

const styles = {
  title: {
    fontWeight: 400,
    position: 'relative',
    paddingLeft: '20px',
    ':before': {
      content: '""',
      width: '12px',
      height: '12px',
      borderRadius: '12px',
      display: 'block',
      position: 'absolute',
      left: 0,
      bottom: '6px',
      background: '#d40f0f',
    },
  },
};

function ProductInfor({ product }: ProductInforProps): ReactElement {
  const [currentSize, setCurrentSize] = useState<CustomProductSize>();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const inputRef = useRef<NumberBoxRef | null>(null);
  const isAuthenticated = useAuth();
  const sizes = product.sizes.map((size) => ({ name: size.name, remainingQuantity: size.quantity - size.sold }));
  const router = useRouter();
  const { onOpenModal, render: renderLoginModal } = useLoginModal();
  const { handleAddToCart: addToCart } = useCart();
  const { handleAddToWishlist: addToWishlist } = useWishlist();

  useEffect(() => {
    setCurrentSize(undefined);
  }, [router.query.productId]);

  const addToCartHandler = async (size: string) => {
    if (!currentSize) {
      toast.error('Bạn vui lòng chọn size');
      return;
    }

    const remainingQuantity = getRemainingQuantity(product.sizes, size);
    if (remainingQuantity && remainingQuantity < +inputRef!.current!.getQuantity()) {
      toast.error('Số lượng sản phẩm còn lại không đủ');
      return;
    }

    addToCart(product, size, +inputRef!.current!.getQuantity());
  };

  const handleChangeSize = (size: CustomProductSize) => {
    setCurrentSize(size);
    inputRef.current?.resetQuantity();
  };

  const handleChooseSize = (sizeName: string) => {
    const size = sizes.find((size) => size.name === sizeName);
    setCurrentSize(size);
    setModalIsVisible(false);
  };

  const handleAddToWishlist = async (productId: string) => {
    if (!isAuthenticated) {
      onOpenModal();
      return;
    }

    addToWishlist(productId);
  };

  return (
    <>
      <Grid container spacing={4} sx={{ mt: '12px' }}>
        <Grid item xs={12} md={5}>
          <Box sx={{ pr: 6 }}>
            <PreviewImages images={product.images} />
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ px: 2 }}>
            <GeneralInfor
              name={product.name}
              _id={product._id.slice(0, 8).toUpperCase()}
              price={product.price}
              oldPrice={product.oldPrice}
              isSoldOut={isSoldOutForAllSizes(product.sizes)}
            />

            <ProductSizes
              sizes={sizes}
              onChange={handleChangeSize}
              product={product}
              isSoldOut={(selectedSize) => isSoldOutForEverySize(product.sizes, selectedSize)}
              currentSize={currentSize}
              onDisplayModal={() => setModalIsVisible(true)}
            />

            <Typography sx={{ fontWeight: 400, mt: 3, mb: 2 }}>Chọn số lượng:</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <NumberBox
                min={1}
                max={currentSize ? (getRemainingQuantity(product.sizes, currentSize.name) as number) : 100}
                ref={inputRef}
              />
              <Button
                className="w-[250px] rounded-none"
                onClick={() => currentSize?.name && addToCartHandler(currentSize?.name)}
              >
                Mua ngay
              </Button>
              <FavoriteBorderIcon
                sx={{ fontSize: '2.5rem', cursor: 'pointer' }}
                onClick={() => handleAddToWishlist(product._id)}
              />
            </Stack>

            <Policies />

            <Box sx={{ mt: 3 }}>
              <Typography sx={styles.title}>
                THÔNG TIN CHI TIẾT <strong className="uppercase">{product.name}</strong>
              </Typography>
              <Typography sx={{ my: 2 }}>{product.description}</Typography>
            </Box>

            {!showMore && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <ButtonMUI
                  variant="outlined"
                  sx={{ borderRadius: 0, textTransform: 'uppercase', px: 4, py: 1 }}
                  onClick={() => setShowMore(true)}
                >
                  Xem thêm
                </ButtonMUI>
              </Box>
            )}

            {showMore && <PreservationInstruction onCollapse={() => setShowMore(false)} />}
          </Box>
        </Grid>
      </Grid>
      <SizeGuideModal
        isVisible={modalIsVisible}
        productSizes={product.sizes}
        onClose={() => setModalIsVisible(false)}
        onSelectSize={handleChooseSize}
      />

      {renderLoginModal()}
    </>
  );
}

export default ProductInfor;
