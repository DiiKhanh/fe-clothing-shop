import React, { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { InstantSearch } from 'react-instantsearch-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { NextComponentType } from 'next';
import { ToastContainer } from 'react-toastify';
import 'regenerator-runtime/runtime';
import store from 'src/redux/store';
import { createEmotionCache } from '@/utils/common';
import ThemeProvider from '@/common/styles/theme';
import MainLayout from '@/common/components/Layout/MainLayout';
// import GoogleAnalytics from '@/modules/ga';
import 'react-toastify/dist/ReactToastify.css';
import '@/common/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { searchClient } from '@/utils/lib/algolia';

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (props: AppLayoutProps) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <Provider store={store}>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider>
          {getLayout(
            <InstantSearch searchClient={searchClient} indexName="product" stalledSearchDelay={500}>
              <QueryClientProvider client={queryClient}>
                <MainLayout>
                  {/* <GoogleAnalytics /> */}
                  <Component {...pageProps} />
                </MainLayout>
              </QueryClientProvider>
            </InstantSearch>,
          )}
        </ThemeProvider>
        <ToastContainer autoClose={3000} limit={5} pauseOnFocusLoss={false}theme="colored" pauseOnHover={false}/>
      </CacheProvider>
    </Provider>
  );
};

export default MyApp;
