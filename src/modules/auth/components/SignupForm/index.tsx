import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Dayjs } from 'dayjs';
import { fetchUserSignup } from '@/redux/slices/auth';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { SignupPayload } from '@/services/types/auth';
import { GENDER } from '@/utils/constants';
import config from '@/config';
import { SignupSchema, defaultValues } from './validation';
import SignupFormView from './view';

function SignupForm() {
  const [gender, setGender] = useState(GENDER.male);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: (account: SignupPayload) => dispatch(fetchUserSignup(account)).unwrap(),
    onSuccess: (data) => {
      const { message, data: account } = data;
      if (account) {
        toast.success(message);
        router.replace(config.routes.login);
      } else {
        toast.error(message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });

  const onSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
    birthday: Dayjs;
  }) => {
    const account = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phone: values.phone,
      address: values.address,
      gender: gender,
      birthday: new Date(values.birthday.toDate()).toISOString(),
    };
    signupMutation(account);
  };

  return (
    <SignupFormView
      methods={methods}
      loading={isPending}
      gender={gender}
      onSubmit={onSubmit}
      onGenderChange={(gender) => setGender(gender)}
    />
  );
}

export default SignupForm;
