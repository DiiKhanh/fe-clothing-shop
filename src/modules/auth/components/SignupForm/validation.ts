import * as Yup from 'yup';
import dayjs from 'dayjs';
import { checkValidVietNamPhoneNumber } from '@/utils/common';

export const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập họ tên'),
  email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
  password: Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  confirmPassword: Yup.string()
    .required('Vui lòng xác nhận mật khẩu')
    .test('equal', 'Xác nhận mật khẩu không chính xác', function (confirmPassword) {
      const { password } = this.parent;
      return password === confirmPassword;
    }),
  phone: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .test('viet_nam_phone_number', 'Số điện thoại không hợp lệ', function (phoneNumber) {
      if (phoneNumber !== undefined) {
        return checkValidVietNamPhoneNumber(phoneNumber);
      }
      return false;
    }),
  address: Yup.string().required('Vui lòng nhập địa chỉ'),
});

export const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address: '',
  birthday: dayjs(Date.now()),
};

export type FormValuesType = typeof defaultValues;
