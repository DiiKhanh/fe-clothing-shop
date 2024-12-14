import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
});

export const defaultValues = {
  username: '',
  password: '',
};

export type FormValuesType = typeof defaultValues;
