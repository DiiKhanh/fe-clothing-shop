import { sendPostRequest, sendGetRequest } from '../request';
import {
  LoginPayload,
  LoginWithSocialMediaAccountPayload,
  RequestNewPasswordPayload,
  ResetTokenPayload,
  SignupPayload,
  UpdatePasswordPayload,
} from '../types/auth';

export const signup = async (account: SignupPayload) => {
  return await sendPostRequest('/auth/signup', account);
};

export const login = async (account: LoginPayload) => {
  return await sendPostRequest('/auth/login', account);
};

export const loginWithSocialMediaAccount = async (data: LoginWithSocialMediaAccountPayload) => {
  return await sendPostRequest('/auth/login-with-social-media-account', data);
};

export const getUserProfile = async () => {
  return await sendGetRequest('/auth/user/profile');
};

export const requestNewPassword = async (data: RequestNewPasswordPayload) => {
  return await sendPostRequest('/auth/forgot-password', data);
};

export const updatePassword = async (data: UpdatePasswordPayload) => {
  return await sendPostRequest('/auth/reset-password', data);
};

export const checkResetToken = async (data: ResetTokenPayload) => {
  const { isValidToken } = await sendPostRequest('/auth/check-reset-token', data);
  return isValidToken;
};
