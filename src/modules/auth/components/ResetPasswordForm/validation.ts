import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email'),
});

export const defaultValues = {
  email: '',
};

export type FormValuesType = typeof defaultValues;
