import { MouseEventHandler } from 'react';
import { Badge, Button, IconButton, Stack, Theme, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import config from '@/config';
import { useRouter } from 'next/router';
import { makeStyles, useTheme } from '@mui/styles';
import { selectCartProducts } from '@/redux/slices/cart';
import { selectWishlistProducts } from '@/redux/slices/wishlist';
import { useAppSelector } from '@/hooks/useAppSelector';
import { PROFILE_TABS } from '@/utils/constants';
import useAuth from '@/hooks/useAuth';

type ActionsProps = {
  openSearch: MouseEventHandler<HTMLButtonElement>;
  showSideBar: MouseEventHandler<HTMLButtonElement>;
  showCartPreview: MouseEventHandler<HTMLButtonElement>;
  showWishlist: MouseEventHandler<HTMLButtonElement>;
};

const useStyles = makeStyles((theme: Theme) => ({
  actionItem: {
    width: '1rem',
    lineHeight: '1rem',
    paddingLeft: '1rem',

    transition: 'all 300ms linear',
    '&:hover': { opacity: 0.6 },
    color: theme.palette.grey['200'],
  },
}));

function Actions({ openSearch, showSideBar, showCartPreview, showWishlist }: ActionsProps) {
  const cartProducts = useAppSelector(selectCartProducts);
  const wishlistProducts = useAppSelector(selectWishlistProducts);
  const router = useRouter();
  const isAuthenticated = useAuth();
  const theme = useTheme<Theme>();
  const styles = useStyles();
  const isInSearchPage = router.pathname === config.routes.search;

  const authHandler = () => {
    if (!isAuthenticated) {
      router.push(config.routes.login);
    } else {
      router.push(`${config.routes.profile}?tab=${PROFILE_TABS.ACCOUNT}`);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      {!isInSearchPage && (
        <Tooltip title="Tìm kiếm sản phẩm">
          <IconButton className={styles.actionItem} onClick={openSearch}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Tài khoản">
        <IconButton className={styles.actionItem} onClick={authHandler}>
          <PersonIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Danh sách yêu thích">
        <IconButton className={styles.actionItem} onClick={showWishlist}>
          <Badge badgeContent={wishlistProducts?.length} color="info">
            <FavoriteBorderIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Giỏ hàng">
        <IconButton className={styles.actionItem} onClick={showCartPreview}>
          <Badge badgeContent={cartProducts?.length} color="info">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Button
        onClick={showSideBar}
        sx={{ ...styles, color: theme.palette.grey['200'], display: { xs: 'block', lg: 'none' } }}
      >
        <MenuIcon sx={{ fontSize: '30px' }} />
      </Button>
    </Stack>
  );
}

export default Actions;
