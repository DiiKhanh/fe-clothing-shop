import { useState } from 'react';
import AccordionSummary from './components/Summary';
import AccordionDetails from './components/Details';
import { Box, Grid, Stack, Typography } from '@mui/material';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import Button from '@/common/components/Buttons/Button';
import Accordion from './components/Accordion';
import { UseFormReturn } from 'react-hook-form';
import { FormValuesType } from './validation';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCurrentUser } from '@/redux/slices/auth';

type ChangePasswordAccordionViewProps = {
  methods: UseFormReturn<FormValuesType, any>;
  loading: boolean;
  onSubmit: (_values: { password: string }) => void;
  onValidatePhone: () => void;
};

function ChangePasswordAccordionView({
  methods,
  loading,
  onSubmit,
  onValidatePhone,
}: ChangePasswordAccordionViewProps) {
  const [expanded, setExpanded] = useState('panel1');

  const { handleSubmit } = methods;
  const currentUser = useAppSelector(selectCurrentUser);

  const handleChange = (panel: string) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : '');
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ fontWeight: 'bold' }}>Đổi mật khẩu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {currentUser?.verified ? (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name="password"
                    label="Mật khẩu mới"
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    id="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </Grid>
              </Grid>
              <Stack direction="row" justifyContent="flex-end">
                <LoadingButton loading={loading} type="submit" sx={null}>
                  Lưu
                </LoadingButton>
              </Stack>
            </FormProvider>
          ) : (
            <Box>
              <Typography>Vui lòng xác thực email của bạn trước khi thiết lập mật khẩu.</Typography>
              <Typography sx={{ fontStyle: 'italic' }}>
                Lưu ý: bạn phải sở hữu email trước khi xác thực!
              </Typography>
              <Button className="mt-3" onClick={onValidatePhone} disabled={!currentUser?.email}>
                Xác thực
              </Button>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ChangePasswordAccordionView;
