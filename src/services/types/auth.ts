export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  gender: string;
  birthday: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginWithSocialMediaAccountPayload {
  name: string;
  email: string;
}

export interface RequestNewPasswordPayload {
  email: string;
  isCustomer: boolean;
}

export interface UpdatePasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetTokenPayload {
  token: string;
}
