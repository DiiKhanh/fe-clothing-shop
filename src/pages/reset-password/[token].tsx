import { ReactNode, useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Box, Container } from '@mui/material';
import * as authServices from '@/services/auth';
import PageContainer from '@/common/components/Layout/PageContainer';
import ChangePasswordForm from '@/modules/auth/components/ChangePasswordForm';
import { ResetTokenPayload } from '@/services/types/auth';

function ChangePasswordPage({ isValidToken }: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode {
  const router = useRouter();

  useEffect(() => {
    if (!isValidToken) {
      router.replace('/');
    }
  }, [isValidToken, router]);

  return (
    <PageContainer barTitle="Đặt lại mật khẩu" headTitle="Đặt Lại Mật Khẩu">
      <Box sx={{ my: 10 }}>
        <Container maxWidth="sm">
          <ChangePasswordForm />
        </Container>
      </Box>
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const data: ResetTokenPayload = {
    token: context?.params?.token as string,
  };
  const isValidToken: boolean = await authServices.checkResetToken(data);

  return {
    props: {
      isValidToken,
    },
  };
};

export default ChangePasswordPage;
