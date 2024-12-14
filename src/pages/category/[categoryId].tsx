import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import CategoryFilter from '@/modules/filter';
import { getCategories } from '@/services/category';
import { getProductsByCategory } from '@/services/product';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import PageContainer from '@/common/components/Layout/PageContainer';
import { Container } from '@mui/material';

interface IGetStaticProps {
  products: Product[];
  categoryName: string;
}

function ProductType({ products, categoryName }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  const headTitle = `Dòng sản phẩm ${categoryName} | Clothing Shop`;

  return (
    <PageContainer barTitle={categoryName} headTitle={headTitle}>
      <Container maxWidth={false}>
        <CategoryFilter loadedProducts={products} categoryName={categoryName} />
      </Container>
    </PageContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: Category[] = await getCategories();
  const categoryPaths = categories.map((category) => ({ params: { categoryId: category._id } }));

  return {
    paths: categoryPaths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const categoryId = params?.categoryId as string;

  if (!categoryId) {
    return {
      notFound: true,
    };
  }

  const response = await getProductsByCategory(categoryId);

  if (!response || !response.products || !response.categoryName) {
    return {
      notFound: true,
    };
  }

  const { products, categoryName }: IGetStaticProps = response;

  return {
    props: {
      products: products || [],
      categoryName: categoryName || '',
    },
    revalidate: 10,
  };
};

export default ProductType;
