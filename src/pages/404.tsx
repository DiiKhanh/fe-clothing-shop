import { ReactElement } from 'react';
import { Stack } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '@/common/components/Buttons/Button';
import { appAssets } from '@/common/assets';

function NotFoundPage(): ReactElement {
  const router = useRouter();

  const handleBackToPreviousPage = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Trang không tồn tại | Clothing Shop</title>
      </Head>
      <Stack direction="column" alignItems="center" sx={{ mt: 20, mb: 16 }}>
        <Image src={appAssets.notFound} width={450} height={450} alt="Sản phẩm không tồn tại" />
        <Button className="mt-3" onClick={handleBackToPreviousPage}>
          Trở về
        </Button>
      </Stack>
    </>
  );
}

export default NotFoundPage;
