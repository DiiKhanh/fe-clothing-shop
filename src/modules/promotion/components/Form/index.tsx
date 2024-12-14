import { ChangeEvent, ReactElement } from 'react';
import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import Title from '@/common/components/_shared/UIElements/Title';
import { useSelector } from 'react-redux';
import { selectPromotions } from '@/redux/slices/promotions';
import PromotionItem from '../List/components/Item';
import { selectCartProducts } from '@/redux/slices/cart';
import { isValidPromotion } from '@/utils/promotion';
import Button from '@/common/components/Buttons/Button';
import Link from 'next/link';
import config from '@/config';

type PromotionRadioBtnFormProps = {
  selectedPromotion: string | undefined;
  onChangePromotion: (_event: ChangeEvent<HTMLInputElement>) => void;
};

function PromotionRadioBtnForm({ selectedPromotion, onChangePromotion }: PromotionRadioBtnFormProps): ReactElement {
  const customerPromotions = useSelector(selectPromotions);
  const cartProducts = useSelector(selectCartProducts);
  const totalProductsPrice = cartProducts.reduce((acc, currentItem) => {
    return acc + currentItem.productId.price * currentItem.quantity;
  }, 0);

  return (
    <Box sx={{ mb: 5 }}>
      <Title sx={{ mb: 5 }}>Ưu đãi của bạn ({customerPromotions.length})</Title>
      {customerPromotions.length === 0 ? (
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Bạn chưa có mã khuyến mãi nào
          </Typography>
          <Link href={config.routes.promotions}>
            <Button>Lấy mã ngay</Button>
          </Link>
        </Stack>
      ) : (
        <FormControl fullWidth>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={selectedPromotion}
            onChange={onChangePromotion}
          >
            <Grid container spacing={4}>
              {customerPromotions.map((promotion) => (
                <Grid key={promotion._id} item xs={12} md={6}>
                  <FormControlLabel
                    value={JSON.stringify(promotion)}
                    control={<Radio />}
                    label={
                      <PromotionItem
                        item={promotion}
                        isValid={isValidPromotion(totalProductsPrice, promotion)}
                        isUsedInPayment
                      />
                    }
                    disabled={!isValidPromotion(totalProductsPrice, promotion)}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      )}
    </Box>
  );
}

export default PromotionRadioBtnForm;
