import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from 'react-google-login';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { toast } from 'react-toastify';
import { fetchSocialMediaUserLogin, fetchUserLogin } from '@/redux/slices/auth';
import { assignPromotions } from '@/redux/slices/promotions';
import { assignProductsToCart } from '@/redux/slices/cart';
import { assignProductsToWishlist } from '@/redux/slices/wishlist';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { refreshToken } from '@/utils/auth';
import config from '@/config';
import { LoginPayload, LoginWithSocialMediaAccountPayload } from '@/services/types/auth';
import { LoginSchema, defaultValues } from './validation';
import LoginFormView from './view';

type LoginFormProps = {
  onLogin?: () => void;
};

function LoginForm({ onLogin }: LoginFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (account: LoginPayload) => dispatch(fetchUserLogin(account)).unwrap(),
    onSuccess: (data) => {
      const { message, user } = data;
      
      if (onLogin) {
        onLogin();
      } 

      if (user) {
        router.replace('/');
        toast.success(message);
        dispatch(assignProductsToCart({ cart: user?.cart }));
        dispatch(assignProductsToWishlist({ products: user?.wishlist }));
        dispatch(assignPromotions({ promotions: user?.promotions }));
      } else {
        toast.error(message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: loginWithSocialMedia } = useMutation({
    mutationFn: (data: LoginWithSocialMediaAccountPayload) => dispatch(fetchSocialMediaUserLogin(data)).unwrap(),
    onSuccess: (data) => {
      const { user } = data;
      dispatch(assignProductsToCart({ cart: user?.cart }));
      dispatch(assignProductsToWishlist({ products: user?.wishlist }));
      dispatch(assignPromotions({ promotions: user?.promotions }));

      if (onLogin) {
        onLogin();
      } else {
        router.replace(config.routes.home);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    const account = {
      username: values.username,
      password: values.password,
    };
    login(account);
  };

  const handleLoginWithSocialMedia = (name: string, email: string) => {
    loginWithSocialMedia({ name, email });
  };

  const onLoginGoogleSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    refreshToken(res);
    const googleProfile = (res as GoogleLoginResponse).profileObj;
    handleLoginWithSocialMedia(googleProfile.name, googleProfile.email);
  };

  const onLoginGoogleFailure = () => {
    toast.error('Login failed');
  };

  const { signIn: handleLoginWithGoogle } = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    onSuccess: onLoginGoogleSuccess,
    onFailure: onLoginGoogleFailure,
    accessType: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
  });

  const handleSignInWithFacebook = (
    userInfo: (ReactFacebookLoginInfo | ReactFacebookFailureResponse) & { name: string; email: string },
  ) => {
    handleLoginWithSocialMedia(userInfo.name, userInfo.email);
  };

  return (
    <LoginFormView
      methods={methods}
      loading={isPending}
      onSubmit={handleSubmit}
      onSignInWithGoogle={handleLoginWithGoogle}
      onSignInWithFacebook={handleSignInWithFacebook}
    />
  );
}

export default LoginForm;
