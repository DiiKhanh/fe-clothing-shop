import Link from 'next/link';
import Image from 'next/image';
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { UseFormReturn } from 'react-hook-form';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { appAssets } from '@/common/assets';
import { FormValuesType } from './validation';

type LoginFormViewProps = {
  loading: boolean;
  methods: UseFormReturn<FormValuesType, any>;
  onSubmit: (_values: FormValuesType) => void;
  onSignInWithGoogle: () => void;
  onSignInWithFacebook: (
    _userInfo: (ReactFacebookLoginInfo | ReactFacebookFailureResponse) & { name: string; email: string },
  ) => void;
};

function LoginFormView({ loading, methods, onSubmit, onSignInWithGoogle, onSignInWithFacebook }: LoginFormViewProps) {
  const { handleSubmit } = methods;

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
        Đăng nhập
      </Typography>
      <Typography
        sx={{ textAlign: 'center', width: { xs: '80%', md: '70%' }, mx: 'auto', fontWeight: 400, mb: '20px' }}
      >
        Đăng nhập thành viên để nhận nhiều những chương trình ưu đãi hấp dẫn
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="username" label="Email" id="username" placeholder="Tên đăng nhập" />
        <RHFTextField name="password" label="Mật khẩu" id="password" type="password" placeholder="Mật khẩu" />

        <Link href="/reset-password">
          <Typography sx={{ fontWeight: 400, textAlign: 'right' }}>Quên mật khẩu?</Typography>
        </Link>
        <LoadingButton type="submit" fullWidth loading={loading} sx={{ mt: 3, mb: 1 }}>
          Đăng nhập
        </LoadingButton>
      </FormProvider>

      <Divider sx={{ my: 3 }}>Hoặc</Divider>

      <Button
        variant="outlined"
        fullWidth
        sx={{ my: 1, height: '50px' }}
        startIcon={<Image src={appAssets.googleIcon} width={24} height={24} alt="img-googleIcon" />}
        onClick={onSignInWithGoogle}
      >
        Đăng nhập với Google
      </Button>

      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_ID as string}
        size="small"
        textButton="Đăng nhập với Facebook"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,email,user_friends"
        callback={onSignInWithFacebook}
        typeButton="outlined"
        icon={
          <Image
            src={appAssets.facebookIcon}
            width={24}
            height={24}
            alt="img-fbIcon"
            style={{ display: 'inline-block', marginRight: '8px' }}
          />
        }
        buttonStyle={{
          backgroundColor: 'transparent',
          color: 'black',
          textTransform: 'capitalize',
          width: '100%',
          fontSize: '0.875rem',
          height: '50px',
          borderRadius: '8px',
        }}
      />

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: '0.875rem', opacity: '0.7' }}>Chưa có tài khoản?</Typography>
        <Link href="/signup" style={{ fontWeight: 400 }}>
          Đăng ký
        </Link>
      </Stack>
    </Box>
  );
}

export default LoginFormView;
