import { Box, Divider, Grid, Typography } from '@mui/material';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import ChangePasswordAccordion from './components/ChangePasswordAccordion';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import PhoneValidationModal from './components/PhoneValidationModal';
import GenderRadioButtonsGroup, { Ref } from './components/PhoneValidationModal/components/GenderRadioButtonsGroup';
import { UseFormReturn } from 'react-hook-form';
import { FormValuesType } from './validation';

type AccountInfoTabViewProps = {
  methods: UseFormReturn<FormValuesType, any>;
  loading: boolean;
  genderRef: React.MutableRefObject<Ref | null>;
  modalVisible: boolean;
  onSubmit: (_values: FormValuesType) => void;
  onCloseModal: () => void;
  onSendOTPCode: () => void;
  onSubmitOTPCode: (_otpCode: string) => void;
};

function AccountInfoTabView({
  methods,
  loading,
  genderRef,
  modalVisible,
  onSubmit,
  onCloseModal,
  onSendOTPCode,
  onSubmitOTPCode,
}: AccountInfoTabViewProps) {
  const { handleSubmit, formState } = methods;
  const { isDirty } = formState;

  return (
    <>
      <Box>
        <Typography variant="h5">Thông tin tài khoản</Typography>
        <Typography variant="body1" sx={{ mt: '6px' }}>
          Bạn có thể cập nhật thông tin của mình ở trang này
        </Typography>

        <Divider sx={{ my: 3 }} />

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ và tên" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="phone" label="Số điện thoại" id="phone" placeholder="Số điện thoại" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email" label="Email" id="email" placeholder="Địa chỉ email" disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="birthday" label="Ngày sinh" id="birthday" placeholder="Ngày sinh" type="date" />
            </Grid>
            <Grid item xs={12} md={6}>
              <GenderRadioButtonsGroup ref={genderRef} />
            </Grid>
          </Grid>
          <LoadingButton loading={loading} sx={{ mt: 3 }} type="submit" disabled={!isDirty}>
            Cập nhật thông tin
          </LoadingButton>
        </FormProvider>
        <ChangePasswordAccordion onValidatePhone={onSendOTPCode} />
      </Box>
      <PhoneValidationModal isVisible={modalVisible} onClose={onCloseModal} onSubmit={onSubmitOTPCode} />
    </>
  );
}

export default AccountInfoTabView;
