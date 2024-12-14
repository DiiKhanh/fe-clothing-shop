import { ReactElement } from 'react';
import { Stack } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/common/components/Buttons/Button';
import { appAssets } from '@/common/assets';
import config from '@/config';

function ServerErrorPage(): ReactElement {
  return (
    <>
      <Head>
        <title>Đã xảy ra lỗi | Clothing Shop</title>
      </Head>
      <Stack direction="column" alignItems="center" sx={{ mt: 20, mb: 16 }}>
        <Image src={appAssets.serverError} width={450} height={450} alt="Đã xảy ra lỗi" />
        <Link href={config.routes.home}>
          <Button className="mt-3">Trở về trang chủ</Button>
        </Link>
      </Stack>
    </>
  );
}

export default ServerErrorPage;
