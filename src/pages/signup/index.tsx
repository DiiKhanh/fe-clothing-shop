import { ReactElement } from 'react';
import { Box, Container } from '@mui/material';
import PageContainer from '@/common/components/Layout/PageContainer';
import SignupForm from '@/modules/auth/components/SignupForm';

function SignupPage(): ReactElement {
  return (
    <PageContainer barTitle="Đăng ký" headTitle="Đăng Ký">
      <Box sx={{ my: 10 }}>
        <Container maxWidth="sm">
          <SignupForm />
        </Container>
      </Box>
    </PageContainer>
  );
}

export default SignupPage;
