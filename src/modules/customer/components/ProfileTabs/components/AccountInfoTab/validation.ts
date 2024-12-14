import * as Yup from 'yup';
import dayjs from 'dayjs';
import { checkValidVietNamPhoneNumber } from '@/utils/common';

export const AccountSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập họ tên'),
  phone: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .test('viet_nam_phone_number', 'Số điện thoại không hợp lệ', function (phoneNumber) {
      return checkValidVietNamPhoneNumber(phoneNumber);
    }),
  email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
  birthday: Yup.date().required('Vui lòng chọn ngày sinh'),
});

export const defaultValues = {
  name: '',
  phone: '',
  email: '',
  birthday: dayjs(new Date()).format('YYYY-MM-DD'),
};

export type FormValuesType = typeof defaultValues;
