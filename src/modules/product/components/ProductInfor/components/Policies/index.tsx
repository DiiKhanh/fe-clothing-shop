import { ReactElement } from 'react';
import { Box, Grid, Typography, Stack, Theme } from '@mui/material';
import { useTheme } from '@mui/styles';
import Image from 'next/image';

function Policies(): ReactElement {
  const theme = useTheme<Theme>();

  const items = [
    {
      image: '/assets/images/ghn.png',
      title: 'Giao hàng nhanh',
      subTitle: 'Từ 2 - 5 ngày',
    },
    {
      image: '/assets/images/free.png',
      title: 'Vận chuyển',
      subTitle: 'Đồng giá 25k',
    },
    {
      image: '/assets/images/order.png',
      title: 'Sản phẩm',
      subTitle: 'Đa dạng các dòng sản phẩm',
    },
    {
      image: '/assets/images/returns.png',
      title: 'Chính sách đổi trả',
      subTitle: 'Không áp dụng đổi trả với sản phẩm sale từ 30%',
    },
    {
      image: '/assets/images/pay.png',
      title: 'Hình thức thanh toán',
      subTitle: 'Thanh toán dễ dàng nhiều hình thức',
    },
    {
      image: '/assets/images/hotline.png',
      title: 'Hotline hỗ trợ',
      subTitle: '0349175927',
    },
  ];

  return (
    <Box sx={{ backgroundColor: theme.palette.grey['200'], mt: 2 }}>
      <Grid container sx={{ textAlign: { xs: 'center', lg: 'left' }, mt: 6, px: 4, pb: '40px' }} spacing={5}>
        {items.map((item) => (
          <Grid key={item.title} item xs={6} lg={4}>
            <Stack direction={{ xs: 'column', lg: 'row' }} alignItems="center" spacing={1}>
              <Image alt={item.title} src={item.image} width={50} height={50} />
              <Box>
                <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>{item.title}</Typography>
                <Typography sx={{ fontSize: '12px' }}>{item.subTitle}</Typography>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Policies;
