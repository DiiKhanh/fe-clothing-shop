import { ReactElement } from 'react';
import PageContainer from '@/common/components/Layout/PageContainer';
import ResetPasswordForm from '@/modules/auth/components/ResetPasswordForm';
import { Box, Container } from '@mui/material';

function ResetPasswordPage(): ReactElement {
  return (
    <PageContainer barTitle="Khôi phục mật khẩu" headTitle="Khôi Phục Mật Khẩu">
      <Box sx={{ my: 10 }}>
        <Container maxWidth="sm">
          <ResetPasswordForm />
        </Container>
      </Box>
    </PageContainer>
  );
}

export default ResetPasswordPage;
