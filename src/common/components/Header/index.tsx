import { MouseEventHandler, useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { InstantSearch } from 'react-instantsearch';
import { Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import config from '@/config';
// import { appAssets } from '@/common/assets';
import { searchClient } from '@/utils/lib/algolia';
import SearchInput from './Search';
import MainNavigation from './MainNavigation';
import Actions from './Actions';
import Logo from '../Logo';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.grey['900'],
    height: '80px',
    paddingLeft: '5%',
    paddingRight: '5%',
    transition: 'background-color 0.3s, backdrop-filter 0.3s',
  },
  blurred: {
    backdropFilter: 'blur(10px)',
    backgroundColor: `${theme.palette.grey['900']}88`
  },
}));

type HeaderProps = {
  showSideBar: MouseEventHandler<HTMLButtonElement>;
  showCartPreview: MouseEventHandler<HTMLButtonElement>;
  showWishlist: MouseEventHandler<HTMLButtonElement>;
  scrolling: boolean;
};

const Header = ({ showSideBar, showCartPreview, showWishlist, scrolling }: HeaderProps) => {
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const styles = useStyles();

  const handleToogleSearch = () => {
    setSearchMode(!searchMode);
  };

  if (searchMode) {
    return (
      <InstantSearch searchClient={searchClient} indexName="product" stalledSearchDelay={500}>
        <SearchInput className={styles.header} closeSearch={handleToogleSearch} />
      </InstantSearch>
    );
  }

  return (
    <Box component="header" className={`${styles.header} ${scrolling ? styles.blurred : ''}`}>
      <Box>
        <Link href={config.routes.home}>
          <Logo />
        </Link>
      </Box>
      <MainNavigation />
      <Actions
        openSearch={handleToogleSearch}
        showSideBar={showSideBar}
        showCartPreview={showCartPreview}
        showWishlist={showWishlist}
      />
    </Box>
  );
};

export default Header;
