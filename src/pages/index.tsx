import { ReactElement } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Intro from '@/common/components/Intro';
import HomeCarousel from '@/modules/home/components/Carousel';
import HomePromotionBanner from '@/modules/home/components/HomePromotionBanner';
import HotProducts from '@/modules/home/components/HotProducts';
import ProductsOfType from '@/modules/home/components/TShirtProducts';
import SaleOffProducts from '@/modules/home/components/SaleOffProducts';
import { getDiscountProducts, getHotProducts, getProductsByType } from '@/services/product';
import { getIntroImages } from '@/services/image';
import { Stack } from '@mui/material';
import { appAssets } from '@/common/assets';
import 'lightgallery.js/dist/css/lightgallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home({
  hotProducts = [],
  discountProducts = [],
  tshirtProducts = [],
  trouserProducts = [],
  introImages = [],
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  return (
    <>
      <Head>
        <title>Clothing Shop - Cửa Hàng Online Quần Áo Thời Trang Nam Nữ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="xl:px-[3%]">
        <HomeCarousel />
        <Intro images={introImages} />
        <HomePromotionBanner />
        <HotProducts products={hotProducts} />
        <Stack justifyContent="center">
          <Image src={appAssets.banner3} alt="img-banner3" width={1000} height={1000} className="w-full"/>
        </Stack>
        <ProductsOfType products={tshirtProducts} keyword="Áo Thun" />
        <Stack direction={{ md: 'row' }} justifyContent="center" sx={{ mt: 10 }}>
          <Image src={appAssets.banner4} alt="img-banner4" width={300} height={300} className="w-full"/>
          <Image src={appAssets.banner5} alt="img-banner5" width={300} height={300} className="w-full"/>
        </Stack>
        <ProductsOfType products={trouserProducts} keyword="Quần" />
        <SaleOffProducts products={discountProducts} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const promises = [
    getHotProducts(),
    getDiscountProducts(),
    getProductsByType('Áo Thun'),
    getProductsByType('Quần'),
    getIntroImages(),
  ];
  const [hotProducts, discountProducts, tshirtProducts, trouserProducts, introImages] = await Promise.all(promises);

  return {
    props: {
      hotProducts,
      discountProducts,
      tshirtProducts,
      trouserProducts,
      introImages,
    },
  };
};
