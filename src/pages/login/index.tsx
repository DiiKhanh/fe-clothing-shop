import { ReactElement } from 'react';
import { Box, Container } from '@mui/material';
import LoginForm from '@/modules/auth/components/LoginForm';
import PageContainer from '@/common/components/Layout/PageContainer';

function LoginPage(): ReactElement {
  return (
    <PageContainer barTitle="Đăng nhập" headTitle="Đăng Nhập">
      <Box sx={{ my: 10 }}>
        <Container maxWidth="sm">
          <LoginForm />
        </Container>
      </Box>
    </PageContainer>
  );
}

export default LoginPage;
