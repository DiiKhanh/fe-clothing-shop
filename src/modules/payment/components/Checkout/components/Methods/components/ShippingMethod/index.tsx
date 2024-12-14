import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { ReactElement } from 'react';

type ShippingMethodProps = {
  method: string;
  title: string;
  desc: string;
};

function ShippingMethod({ method, title, desc }: ShippingMethodProps): ReactElement {
  return (
    <Stack direction="row" alignItems="center" spacing="20px">
      <Image src={`/assets/images/${method}.svg`} alt="img-method" width={50} height={50} />
      <Box>
        <Typography sx={{ fontWeight: 500, textTransform: 'uppercase' }}>{title}</Typography>
        <Typography sx={{ fontSize: '14px' }}>{desc}</Typography>
      </Box>
    </Stack>
  );
}

export default ShippingMethod;
