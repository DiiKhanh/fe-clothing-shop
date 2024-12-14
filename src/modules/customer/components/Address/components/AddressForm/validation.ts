import * as Yup from 'yup';
import { checkValidVietNamPhoneNumber } from '@/utils/common';
import { Address, Customer } from '@/types/customer';

export const AddAddressSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập họ tên'),
  email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
  phone: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .test('viet_nam_phone_number', 'Số điện thoại không hợp lệ', function (phoneNumber) {
      return checkValidVietNamPhoneNumber(phoneNumber as string);
    }),
  address: Yup.string().required('Vui lòng nhập địa chỉ'),
  cities: Yup.string().required('Vui lòng chọn tỉnh/thành phố'),
  districts: Yup.string().required('Vui lòng chọn quận/huyện'),
  wards: Yup.string().required('Vui lòng chọn phường/xã'),
});

export const getDefaultValues = (selectedAddress: Address | undefined, customer: Customer | undefined) => ({
  name: selectedAddress?.name || '',
  email: customer?.email || '',
  phone: selectedAddress?.phone || '',
  address: selectedAddress?.detail || '',
  cities: selectedAddress?.city || '',
  districts: selectedAddress?.district || '',
  wards: selectedAddress?.ward || '',
});

export type FormValuesType = ReturnType<typeof getDefaultValues>;
