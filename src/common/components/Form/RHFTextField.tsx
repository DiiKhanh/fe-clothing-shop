import { TextField, TextareaAutosize, TextFieldProps, TextareaAutosizeProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type RHFTextFieldProps = TextFieldProps &
  TextareaAutosizeProps & {
    name: string;
    label: string;
    isRequired?: boolean;
    id?: string;
    tag?: string;
    text?: string;
    type?: string;
  };

export default function RHFTextField({ name, label, isRequired = true, ...other }: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <label htmlFor={other.id} className="inline-block mb-2">
            {label} {isRequired && <span className="text-primary">*</span>}
          </label>
          {other.tag === 'textarea' ? (
            <TextareaAutosize
              {...field}
              value={field.value || other.text || ''}
              minRows={3}
              // eslint-disable-next-line max-len
              className="block w-full leading-6 border-[1px] border-solid border-lightGray100 rounded-[0.5rem] py-[16.5px] px-[14px]"
              {...other}
            />
          ) : (
            <TextField
              {...field}
              value={field.value || other.text || ''}
              error={!!error}
              sx={{ width: '100%' }}
              helperText={error?.message}
              {...other}
            />
          )}
        </div>
      )}
    />
  );
}
