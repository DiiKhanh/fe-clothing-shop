/* eslint-disable max-len */
import PageContainer from '@/common/components/Layout/PageContainer';
import { getProductsByKeyword } from '@/services/product';
import { ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Product } from '@/types/product';
import { Container } from '@mui/material';
import Search from '@/modules/search';

interface IGetStaticProps {
  products: Product[];
  lastPage: number;
}

function SearchPage({
  loadedProducts,
  keyword,
  lastPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  return (
    <PageContainer barTitle="Tìm kiếm sản phẩm" headTitle="Tìm kiếm sản phẩm">
      <Container maxWidth={false}>
        <Search loadedProducts={loadedProducts} lastPage={lastPage} keyword={keyword} />
      </Container>
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { keyword } = context.query;
  const safeKeyword = keyword ? keyword : null;

  const { products, lastPage }: IGetStaticProps = await getProductsByKeyword(safeKeyword as string, 1);

  return {
    props: {
      loadedProducts: products,
      keyword: safeKeyword,
      lastPage,
    },
  };
};

export default SearchPage;
