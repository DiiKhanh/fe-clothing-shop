import { Box, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import FormProvider from '@/common/components/Form/FormProvider';
import { FormValuesType } from './validation';

type ChangePasswordFormViewProps = {
  methods: UseFormReturn<FormValuesType, any>;
  onSubmit: (_values: FormValuesType) => void;
};

function ChangePasswordFormView({ methods, onSubmit }: ChangePasswordFormViewProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
        Thay đổi mật khẩu
      </Typography>
      <Typography sx={{ textAlign: 'center', width: { xs: '80%' }, mx: 'auto', fontWeight: 400, mb: '20px' }}>
        Cập nhật mật khẩu của bạn
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="password" label="Mật khẩu" type="password" />
        <RHFTextField name="confirmPassword" label="Xác nhận mật khẩu" type="password" />
        <LoadingButton type="submit" fullWidth loading={isSubmitting} sx={{ mt: 1 }}>
          Cập nhật
        </LoadingButton>
      </FormProvider>
    </Box>
  );
}

export default ChangePasswordFormView;
