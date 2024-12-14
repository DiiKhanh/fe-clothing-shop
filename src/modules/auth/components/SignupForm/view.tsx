import { UseFormReturn } from 'react-hook-form';
import Link from 'next/link';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import RHFDatePicker from '@/common/components/Form/RHFDatePicker';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { GENDER } from '@/utils/constants';
import config from '@/config';
import { FormValuesType } from './validation';

type SignupFormViewProps = {
  loading: boolean;
  gender: string;
  methods: UseFormReturn<FormValuesType, any>;
  onSubmit: (_values: FormValuesType) => void;
  onGenderChange: (_gender: string) => void;
};

function SignupFormView({ methods, loading, gender, onSubmit, onGenderChange }: SignupFormViewProps) {
  const { handleSubmit } = methods;

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
        Đăng ký
      </Typography>
      <Typography
        sx={{ textAlign: 'center', width: { xs: '80%', md: '70%' }, mx: 'auto', fontWeight: 400, mb: '20px' }}
      >
        Đăng ký trở thành thành viên của Clothing Shop
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ và tên" />
        <RHFTextField name="email" label="Email" id="email" placeholder="Địa chỉ email" />
        <RHFTextField name="password" type="password" label="Mật khẩu" id="password" placeholder="Mật khẩu" />
        <RHFTextField
          name="confirmPassword"
          type="password"
          label="Xác nhận mật khẩu"
          id="confirmPassword"
          placeholder="Nhập lại mật khẩu"
        />
        <RHFTextField name="phone" label="Số điện thoại" id="phone" placeholder="Số điện thoại" />
        <RHFTextField name="address" label="Địa chỉ" id="address" placeholder="Địa chỉ" />

        <FormControl sx={{ mb: 2 }}>
          <FormLabel>
            <label className="inline-block mb-2">
              Giới tính <span className="text-primary">*</span>
            </label>
          </FormLabel>
          <RadioGroup row defaultValue={GENDER.male} value={gender} onChange={(e) => onGenderChange(e.target.value)}>
            <FormControlLabel value={GENDER.male} control={<Radio />} label={GENDER.male} />
            <FormControlLabel value={GENDER.female} control={<Radio />} label={GENDER.female} />
            <FormControlLabel value={GENDER.other} control={<Radio />} label={GENDER.other} />
          </RadioGroup>
        </FormControl>

        <Box>
          <RHFDatePicker name="birthday" label="Ngày sinh" sx={{ width: '100%', fontWeight: 400 }} />
        </Box>

        <LoadingButton fullWidth loading={loading} type="submit" sx={{ mt: 3, mb: 1 }}>
          Đăng ký
        </LoadingButton>
      </FormProvider>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
        <Typography sx={{ fontSize: '0.875rem', opacity: '0.7' }}>Đã có tài khoản?</Typography>
        <Link href={config.routes.login} style={{ fontWeight: 400 }}>
          Đăng nhập
        </Link>
      </Stack>
    </Box>
  );
}

export default SignupFormView;
