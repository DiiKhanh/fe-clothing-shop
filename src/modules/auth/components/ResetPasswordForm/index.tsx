import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { requestNewPassword } from '@/services/auth';
import { RequestNewPasswordPayload } from '@/services/types/auth';
import config from '@/config';
import { ResetPasswordSchema, defaultValues } from './validation';
import ResetPasswordFormView from './view';

function ResetPasswordForm() {
  const router = useRouter();

  const { mutate: requestNewPasswordMutation, isPending } = useMutation({
    mutationFn: ({ email, isCustomer }: RequestNewPasswordPayload) => requestNewPassword({ email, isCustomer }),
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      router.push(config.routes.login);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const onSubmit = async (values: { email: string }) => {
    const { email } = values;
    requestNewPasswordMutation({ email, isCustomer: true });
  };

  return <ResetPasswordFormView methods={methods} loading={isPending} onSubmit={onSubmit} />;
}

export default ResetPasswordForm;
