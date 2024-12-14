import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import config from '@/config';
import ProductsSkeleton from '@/common/components/Skeleton/Products';
import SearchResults from '@/modules/search/Result';
import SearchForm from '@/modules/search/Form';
import index from '@/utils/lib/algolia';
import { mapProductsToView } from '@/utils/product';
import { Product } from '@/types/product';
import { useMutation } from '@tanstack/react-query';

type SearchProps = {
  loadedProducts: Product[];
  lastPage: number;
  keyword: string;
};

function Search({ loadedProducts, lastPage, keyword }: SearchProps) {
  const [products, setProducts] = useState<any[]>(loadedProducts);
  const [maxPage, setMaxPage] = useState<number>(lastPage);
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { mutate: fetchProducts, isPending } = useMutation({
    mutationFn: () =>
      index.search(router.query.keyword as string, {
        page: router.query.page ? +router.query.page - 1 : 0,
      }),
    onSuccess: (data) => {
      const { hits, page: searchPage, nbPages: searchTotalPage } = data;
      setMaxPage(searchTotalPage);
      setPage(searchPage + 1);
      setProducts(mapProductsToView(hits));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, router.query.keyword, router.query.page]);

  const handleSelectTag = async (tag: string) => {
    if (searchInputRef?.current) {
      searchInputRef!.current!.value = tag;
    }
    router.replace({ pathname: config.routes.search, query: { keyword: tag } });
  };

  return (
    <>
      <SearchForm />
      {isPending ? (
        <ProductsSkeleton />
      ) : (
        <SearchResults
          products={products}
          keyword={keyword}
          maxPage={maxPage}
          page={page}
          onSelectTag={handleSelectTag}
        />
      )}
    </>
  );
}

export default Search;
