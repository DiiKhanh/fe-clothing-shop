import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Button from '@/common/components/Buttons/Button';
import Products from '@/modules/product/components/Products';
import { Product } from '@/types/product';
import { Box } from '@mui/material';
import config from '@/config';

type ProductsOfTypeProps<T> = {
  products: Product[];
  keyword: T;
};

function ProductsOfType({ products, keyword }: ProductsOfTypeProps<string>): ReactElement {
  const router = useRouter();

  const navigateToProductsPage = () => {
    router.push(`${config.routes.products}?type=${keyword}`);
  };

  return (
    <>
      <Products products={products} />
      <Box sx={{ textAlign: 'center', marginY: 3 }}>
        <Button onClick={navigateToProductsPage}>Xem tất cả {keyword.toLowerCase()}</Button>
      </Box>
    </>
  );
}

export default ProductsOfType;
