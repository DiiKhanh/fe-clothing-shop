import { Box, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { FormValuesType } from './validation';

type ResetPasswordFormViewProps = {
  loading: boolean;
  methods: UseFormReturn<FormValuesType, any>;
  onSubmit: (_values: FormValuesType) => void;
};

function ResetPasswordFormView({ methods, onSubmit, loading }: ResetPasswordFormViewProps) {
  const { handleSubmit } = methods;

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
        Khôi phục mật khẩu
      </Typography>
      <Typography sx={{ textAlign: 'center', width: { xs: '80%' }, mx: 'auto', fontWeight: 400, mb: '20px' }}>
        Chúng tôi sẽ gửi một email khôi phục mật khẩu đến bạn
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="email" label="Email" placeholder="Địa chỉ email" />
        <LoadingButton type="submit" fullWidth loading={loading} sx={{ mt: 1 }}>
          Xác nhận
        </LoadingButton>
      </FormProvider>
    </Box>
  );
}

export default ResetPasswordFormView;
