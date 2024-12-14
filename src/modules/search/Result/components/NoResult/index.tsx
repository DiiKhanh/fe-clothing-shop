import { ReactElement } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { appAssets } from '@/common/assets';

type NoSearchResultProps = {
  keyword: string;
};

function NoSearchResult({ keyword }: NoSearchResultProps): ReactElement {
  return (
    <Box sx={{ textAlign: 'center', my: '120px' }}>
      <Image src={appAssets.hangerIcon} width={60} height={60} style={{ margin: '0 auto' }} alt="img-hangerIcon"/>
      <Typography sx={{ mt: 3, mb: 1, fontSize: 22, fontWeight: 400 }}>KHÔNG CÓ KẾT QUẢ TÌM KIẾM</Typography>
      <Typography sx={{ fontWeight: 400 }}>
        Không tìm thấy kết quả cho tìm kiếm &quot;<strong>{keyword}</strong>&quot;
      </Typography>
    </Box>
  );
}

export default NoSearchResult;
