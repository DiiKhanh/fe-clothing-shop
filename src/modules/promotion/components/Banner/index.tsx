import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import Image from 'next/image';

type PromotionBannerProps = {
  image: string;
};

function PromotionBanner({ image }: PromotionBannerProps): ReactElement {
  return (
    <Stack direction="row" justifyContent="center">
      <Image src={image} width={1000} height={1000} priority alt="img-promotionBanner" />
    </Stack>
  );
}

PromotionBanner.propTypes = {
  image: PropTypes.string.isRequired,
};

export default PromotionBanner;
