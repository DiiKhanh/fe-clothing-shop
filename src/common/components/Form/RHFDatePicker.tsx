import { Controller, useFormContext } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SxProps, Theme } from '@mui/material';

type RHFDatePickerProps = {
  name: string;
  text?: string;
  label: string;
  sx?: SxProps<Theme>;
};

export default function RHFDatePicker({ name, ...other }: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker {...field} format="DD/MM/YYYY" value={field.value || other.text} {...other} />
        </LocalizationProvider>
      )}
    />
  );
}
