import { sendPostRequest } from '../request';
import {
  AddressPayload,
  ChangePasswordPayload,
  RemoveAddressPayload,
  UpdateAddressToDefaultPayload,
  UpdateProfilePayload,
  VerifyEmailPayload,
  VerifyPhoneNumberPayload,
} from '../types/customer';

export const updateProfile = async (data: UpdateProfilePayload) => {
  return await sendPostRequest('/customer/update-profile', data);
};

export const verifyPhoneNumber = async (data: VerifyPhoneNumberPayload) => {
  return await sendPostRequest('/customer/verify-phone-number', data);
};

export const verifyEmail = async (data: VerifyEmailPayload) => {
  return await sendPostRequest('/customer/verify-email', data);
};

export const updateUserIsVerified = async () => {
  return await sendPostRequest('/customer/user-is-verified', {});
};

export const changePassword = async (data: ChangePasswordPayload) => {
  return await sendPostRequest('/customer/change-password', data);
};

export const addAddress = async (data: AddressPayload) => {
  return await sendPostRequest('/customer/add-address', data);
};

export const editAddress = async (data: AddressPayload) => {
  return await sendPostRequest('/customer/edit-address', data);
};

export const removeAddress = async (data: RemoveAddressPayload) => {
  return await sendPostRequest('/customer/remove-address', data);
};

export const updateAddressToDefault = async (data: UpdateAddressToDefaultPayload) => {
  return await sendPostRequest('/customer/update-address-to-default', data);
};
