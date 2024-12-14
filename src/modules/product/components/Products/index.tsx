import { ReactElement } from 'react';
import { Box, Grid } from '@mui/material';
import ProductItem from './components/Item';
import { Product } from '@/types/product';

type ProductsProps = {
  products: Product[];
  forDetail?: boolean;
};

function Products({ products, forDetail = false }: ProductsProps): ReactElement {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid key={index} item xs={6} sm={3}>
            <ProductItem forDetail={forDetail} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
