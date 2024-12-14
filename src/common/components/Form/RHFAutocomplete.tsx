import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, SxProps, TextField, Theme } from '@mui/material';

type RHFAutocompleteProps<T> = {
  name: string;
  onChangeValue?: Function;
  label: string;
  options: T[];
  getOptionLabel?: ((_option: T) => string) | undefined;
  isOptionEqualToValue?: ((_option: T, _value: T) => boolean) | undefined;
  sx?: SxProps<Theme> | undefined;
};

export default function RHFAutocomplete<T extends {}>({ name, ...other }: RHFAutocompleteProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            value={field.value || ''}
            fullWidth
            onChange={(_, value) => {
              field.onChange(value);
              if (other.onChangeValue) other.onChangeValue();
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={other.label}
                value={field.value}
                error={!!error}
                helperText={error?.message}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
}
