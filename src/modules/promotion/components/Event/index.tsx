import { ReactElement, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PromotionBanner from '../Banner';
import BackdropLoading from '@/common/components/Loading/BackdropLoading';
import PromotionList from '../List';
import { Promotion } from '@/types/promotion';

type PromotionEventProps = {
  banner: string;
  title: string;
  promotions: Promotion[];
};

function PromotionEvent({ banner, title, promotions }: PromotionEventProps): ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  return (
    <Box sx={{ my: 6 }}>
      <PromotionBanner image={banner} />
      <Typography variant="h3" textAlign="center" sx={{ my: 6 }}>
        {title}
      </Typography>
      <PromotionList promotions={promotions} />
    </Box>
  );
}

export default PromotionEvent;
