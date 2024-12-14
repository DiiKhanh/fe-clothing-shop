import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  confirmPassword: Yup.string()
    .required('Vui lòng xác nhận lại mật khẩu')
    .test('equal', 'Mật khẩu không trùng khớp', function (confirmPassword) {
      const { password } = this.parent;
      return password === confirmPassword;
    }),
});

export const defaultValues = {
  password: '',
  confirmPassword: '',
};

export type FormValuesType = typeof defaultValues;
