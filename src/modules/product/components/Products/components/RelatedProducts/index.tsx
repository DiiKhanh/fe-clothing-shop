import Title from '@/common/components/_shared/UIElements/Title';
import { Box, Container } from '@mui/material';
import Slider from 'react-slick';
import ProductItem from '../Item';
import { CSSProperties, ReactElement } from 'react';
import { Product } from '@/types/product';

type ArrowProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

type RelatedProductsProps = {
  products: Product[];
};

function NextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', width: 50, height: 50, right: 20 }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', width: 50, height: 50, left: 20, zIndex: 2 }}
      onClick={onClick}
    />
  );
}

function RelatedProducts({ products }: RelatedProductsProps): ReactElement {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    slidesToShow: products.length >= 6 ? 6 : products.length,
    slidesToScroll: 3,
    autoplay: true,
    speed: 1000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ mt: 8, mb: 5 }}>
        <Title sx={{ textAlign: 'center' }}>Sản phẩm được gợi ý cho bạn</Title>
        <Slider {...settings} className="my-3">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} forDetail={false} />
          ))}
        </Slider>
      </Box>
    </Container>
  );
}

export default RelatedProducts;
