import { ReactElement } from 'react';
import { Grid } from '@mui/material';
import PromotionItem from './components/Item';
import { Promotion } from '@/types/promotion';

type PromotionListProps = {
  promotions: Promotion[];
  isUsedInProfile?: boolean;
};

function PromotionList({ promotions, isUsedInProfile = false }: PromotionListProps): ReactElement {
  const validPromotions = promotions.filter((promotion) => !promotion.expired);

  return (
    <Grid container spacing={4} justifyContent="center">
      {validPromotions.map((promotion) => (
        <Grid key={promotion?._id} item xs={12} md={!isUsedInProfile && 8}>
          <PromotionItem item={promotion} isUsedInProfile={isUsedInProfile} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PromotionList;
