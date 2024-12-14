import { ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import PageContainer from '@/common/components/Layout/PageContainer';
import Products from '@/modules/product/components/Products';
import { getProductsByType } from '@/services/product';

function ProductsPage({ products, type }: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const headTitle = `Sản phẩm ${type} | Clothing Shop`;

  return (
    <PageContainer barTitle={type} headTitle={headTitle}>
      <Products products={products} />
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { type } = context.query;
  const products = await getProductsByType(type as string);

  return {
    props: {
      products,
      type,
    },
  };
};

export default ProductsPage;
