import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { changePassword } from '@/services/customer';
import { toast } from 'react-toastify';
import { PasswordSchema, defaultValues } from './validation';
import { useMutation } from '@tanstack/react-query';
import ChangePasswordAccordionView from './view';

type ChangePasswordAccordionProps = {
  onValidatePhone: () => void;
};

function ChangePasswordAccordion({ onValidatePhone }: ChangePasswordAccordionProps) {
  const methods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues,
  });

  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: (values: { password: string }) => changePassword({ newPassword: values.password }),
    onSuccess: ({ message }) => {
      toast.success(message || 'Đổi mật khẩu thành công');
    },
    onError: (error) => {
      toast.error(error.message || 'Có lỗi xảy ra, vui lòng thử lại!!');
    },
  });

  const handleSubmit = async (values: { password: string }) => {
    updatePassword(values);
  };

  return (
    <ChangePasswordAccordionView
      methods={methods}
      loading={isPending}
      onSubmit={handleSubmit}
      onValidatePhone={onValidatePhone}
    />
  );
}

export default ChangePasswordAccordion;
