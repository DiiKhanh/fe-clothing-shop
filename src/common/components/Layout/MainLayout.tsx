import WishlistDrawer from '@/modules/wishlist/components/Drawer';
import { fetchCommonData } from '@/redux/slices/data';
import { Box, Fab } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Call';
import { PropsWithChildren, useEffect, useState } from 'react';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import Footer from '../Footer';
import Header from '../Header/index';
import Sidebar from './Sidebar/index';
import BackdropLoading from '../Loading/BackdropLoading';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useDrawer from '@/hooks/useDrawer';
import CartDrawer from '@/modules/cart/components/Drawer';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleTheme } from '@/redux/slices/theme';

function Layout(props: PropsWithChildren) {
  const { render: renderCartDrawer, onOpen: onOpenCartDrawer } = useDrawer(CartDrawer);
  const { render: renderSidebar, onOpen: onOpenSidebar } = useDrawer(Sidebar);
  const { render: renderWishlistDrawer, onOpen: onOpenWishlistDrawer } = useDrawer(WishlistDrawer);

  const [loading, setLoading] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolling = window.scrollY > 0;
      setScrolling(isScrolling);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router.asPath, router.events]);

  useEffect(() => {
    dispatch(fetchCommonData());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Header showSideBar={onOpenSidebar} showCartPreview={onOpenCartDrawer} showWishlist={onOpenWishlistDrawer}
        scrolling={scrolling}
        />
        <Box sx={{ marginTop: '80px' }}>{props.children}</Box>
        <Fab
          color="secondary"
          aria-label="add"
          href="tel:0886025625"
          sx={{ position: 'fixed', bottom: 100, right: 24 }}
        >
          <AddIcon />
        </Fab>
        {/* <MessengerCustomerChat
          pageId={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}
          appId={process.env.NEXT_PUBLIC_FACEBOOK_ID}
          htmlRef={process.env.NEXT_PUBLIC_BASE_URL}
          language="vi_VN"
        /> */}
        <Box sx={{ position: 'fixed', bottom: 30, right: 24, zIndex: 999 }} className='cursor-pointer text-blue'>
          {themeMode === 'dark' ? (
            <Brightness7 onClick={() => dispatch(toggleTheme())} />
          ) : (
            <Brightness4 onClick={() => dispatch(toggleTheme())} />
          )}
        </Box>
        <Footer />
        {renderSidebar()}
        {renderCartDrawer()}
        {renderWishlistDrawer()}
      </Box>
      <BackdropLoading isVisible={loading} />
    </>
  );
}

export default Layout;
