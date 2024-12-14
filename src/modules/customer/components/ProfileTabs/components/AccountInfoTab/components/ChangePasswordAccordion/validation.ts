import * as Yup from 'yup';

export const PasswordSchema = Yup.object().shape({
  password: Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 kí tự'),
  confirmPassword: Yup.string()
    .required('Vui lòng xác nhận lại mật khẩu')
    .test('equal', 'Xác nhận mật khẩu không chính xác', function (confirmPassword) {
      const { password } = this.parent;
      return password === confirmPassword;
    }),
});

export const defaultValues = {
  password: '',
  confirmPassword: '',
};

export type FormValuesType = typeof defaultValues;
