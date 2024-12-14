import { ReactElement, useEffect, useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import NextImage from 'next/image';
import { GlassMagnifier } from 'react-image-magnifiers';
import { Stack } from '@mui/material';
import BackdropLoading from '@/common/components/Loading/BackdropLoading';
import { appAssets } from '@/common/assets';
import { ProductImages } from '@/types/product';
import { env } from '@/config/env';

type PreviewImagesProps = {
  images: ProductImages;
};

function PreviewImages({ images }: PreviewImagesProps): ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
  };

  return (
    <>
      <Slider {...settings} arrows={false} className="imageContainer">
        <GlassMagnifier
          imageSrc={`${env.CLOUDINARY_PREFIX_PATH}/${images.mainImg}`}
          magnifierSize="50%"
          imageAlt=""
        />

        <GlassMagnifier
          imageSrc={`${env.CLOUDINARY_PREFIX_PATH}/${images.subImg}`}
          magnifierSize="50%"
          imageAlt=""
        />
      </Slider>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        {Object.values(images).map((image) => (
          <NextImage
            key={image}
            src={`${env.CLOUDINARY_PREFIX_PATH}/${image}`}
            width={200}
            height={200}
            style={{ objectFit: 'cover', objectPosition: 'center', height: '100%', width: '100px' }}
            alt=""
            placeholder="blur"
            blurDataURL={appAssets.loadingGif}
          />
        ))}
      </Stack>
    </>
  );
}

PreviewImages.propTypes = {
  images: PropTypes.object.isRequired,
};

export default PreviewImages;
