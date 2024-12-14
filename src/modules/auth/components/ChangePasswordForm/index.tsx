import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { updatePassword } from '@/services/auth';
import { UpdatePasswordPayload } from '@/services/types/auth';
import config from '@/config';
import { ChangePasswordSchema, FormValuesType, defaultValues } from './validation';
import ChangePasswordFormView from './view';

function ChangePasswordForm() {
  const router = useRouter();
  const token = router.query.token as string;

  const { mutate: updatePasswordMutation } = useMutation({
    mutationFn: (data: UpdatePasswordPayload) => updatePassword(data),
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      router.replace(config.routes.login);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValuesType) => {
    const { password, confirmPassword } = values;
    const data = { token, password, confirmPassword };
    updatePasswordMutation(data);
  };

  return <ChangePasswordFormView methods={methods} onSubmit={handleSubmit} />;
}

export default ChangePasswordForm;
