import { MOST_SEARCHED } from '@/utils/constants';
import { Product } from '@/types/product';
import { Box, Button, Grid, Pagination, Stack, Typography } from '@mui/material';
import Products from '../../product/components/Products';
import { ReactElement } from 'react';
import NoSearchResult from './components/NoResult';
import { useRouter } from 'next/router';
import config from '@/config';

type SearchResultsProps = {
  products: Product[];
  keyword: string;
  maxPage: number;
  page: number;
  onSelectTag: (_tag: string) => Promise<void>;
};

function SearchResults({ products, keyword, maxPage, page, onSelectTag }: SearchResultsProps): ReactElement {
  const router = useRouter();

  const handlePageChange = async (_: any, page: number) => {
    router.replace({ pathname: config.routes.search, query: { keyword, page } });
  };

  if (products && products.length > 0) {
    return (
      <>
        <Typography sx={{ textAlign: 'center', my: 4, fontSize: 16, fontWeight: 400 }}>
          Kết quả tìm kiếm cho từ khóa &quot;<strong>{keyword}</strong>&quot;
        </Typography>
        <Box sx={{ px: { xs: 2, xl: 0 } }}>
          <Typography sx={{ fontSize: 18, fontWeight: 400 }}>Được tìm kiếm nhiều:</Typography>
          <Grid container spacing={2} sx={{ mt: 1, mb: 5 }}>
            {MOST_SEARCHED.map((item) => (
              <Grid item key={item}>
                <Button className="px-4 py-1 rounded-xl lowercase" onClick={() => onSelectTag(item)}>
                  {item}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Products products={products} />
        <Stack direction="row" justifyContent="center" sx={{ my: 6 }}>
          <Pagination count={maxPage} page={page} color="primary" onChange={handlePageChange} />
        </Stack>
      </>
    );
  }

  return <NoSearchResult keyword={keyword} />;
}

export default SearchResults;
