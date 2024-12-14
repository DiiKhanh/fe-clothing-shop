import { useRouter } from 'next/router';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { Hits, SearchBox, useHits, useSearchBox } from 'react-instantsearch';
import { Box, Card, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import NoSearchResult from '@/modules/search/Result/components/NoResult';
import config from '@/config';
import CustomHit from './components/Hit';

type SearchInputProps = {
  className: string;
  closeSearch: () => void;
};

function SearchInput({ className, closeSearch }: SearchInputProps) {
  const { query } = useSearchBox();
  const { hits } = useHits();
  const router = useRouter();

  const handleSearchSubmit = () => {
    if (isEmpty(query)) return;
    router.push({ pathname: config.routes.search, query: { keyword: query } });
    closeSearch();
  };

  return (
    <Box className={`${className} !bg-white`}>
      <SearchBox
        placeholder="Tìm kiếm sản phẩm"
        autoFocus={true}
        spellCheck={false}
        classNames={{
          root: 'w-full h-8',
          form: 'w-full flex items-center justify-between',
          input: 'w-[90%] border-none outline-none text-xl lg:text-[40px]',
          submitIcon: 'ml-3',
          resetIcon: 'hidden',
        }}
        onSubmit={handleSearchSubmit}
        submitIconComponent={() => <SearchIcon sx={{ fontSize: '30px'}} />}
      />
      <Card elevation={5} className="absolute top-20 left-4 right-4
      z-[1000] bg-white flex flex-col">
        <Typography sx={{ textAlign: 'end', mt: 3, mr: 3, cursor: 'pointer' }} onClick={closeSearch}>
          Đóng
        </Typography>
        {hits.length > 0 ? (
          <Box className="flex-grow max-h-[65vh] overflow-y-scroll z-[100]">
            <Grid container spacing={2}>
            <Hits
            classNames={{list: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center',
              item: 'flex items-center justify-center'
            }}
            hitComponent={({ hit }) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CustomHit hit={hit} onSelect={closeSearch} />
              </Grid>
            )} />
            </Grid>
          </Box>
        ) : (
          <NoSearchResult keyword={query} />
        )}
        {query && (
              <Link
                href={`${config.routes.search}?keyword=${query}`}
                className="text-center block font-medium my-5"
                onClick={closeSearch}
              >
                Xem tất cả
                <KeyboardDoubleArrowRightIcon />
              </Link>
            )}
      </Card>
    </Box>
  );
}

export default SearchInput;
