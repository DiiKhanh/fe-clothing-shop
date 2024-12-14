import { ReactElement } from 'react';
import { printNumberWithCommas } from '@/utils/common';
import { Alert, Box, Stack, Typography } from '@mui/material';

type GeneralInforProps = {
  name: string;
  _id: string;
  price: number;
  isSoldOut: boolean;
  oldPrice?: number;
};

function GeneralInfor(props: GeneralInforProps): ReactElement {
  return (
    <Box sx={{ my: '12px' }}>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }}>{props.name}</Typography>
      {props.isSoldOut && (
        <Alert severity="error" sx={{ maxWidth: '130px' }}>
          Hết hàng
        </Alert>
      )}
      <Typography sx={{ my: '8px' }}>Mã số: {props._id}</Typography>
      {props.oldPrice ? (
        <Stack direction="row" alignItems="center">
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 400, mr: '12px', textDecorationLine: 'line-through' }}>
            {printNumberWithCommas(props.oldPrice)}
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 400 }} className="text-primary">
            {printNumberWithCommas(props.price)} đ
          </Typography>
        </Stack>
      ) : (
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }} className="text-primary">
          {printNumberWithCommas(props.price)} đ
        </Typography>
      )}
    </Box>
  );
}

export default GeneralInfor;
