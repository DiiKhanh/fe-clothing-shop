import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { fetchUpdateProfile, fetchVerifyUser } from '@/redux/slices/auth';
import { verifyEmail } from '@/services/customer';
import { toast } from 'react-toastify';
import { AccountSchema, FormValuesType, defaultValues } from './validation';
import AccountInfoTabView from './view';
import { useMutation } from '@tanstack/react-query';
import { UpdateProfilePayload } from '@/services/types/customer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Ref } from './components/PhoneValidationModal/components/GenderRadioButtonsGroup';
import { Customer } from '@/types/customer';

type AccountInfoTabProps = {
  currentUser: Customer | undefined;
};

function AccountInfoTab({ currentUser }: AccountInfoTabProps) {
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const genderRef = useRef<Ref | null>(null);
  const otpCodeRef = useRef<number>();
  const dispatch = useAppDispatch();

  const { mutate: updateProfile } = useMutation({
    mutationFn: (values: UpdateProfilePayload) => dispatch(fetchUpdateProfile(values)).unwrap(),
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: sendCodeEmail } = useMutation({
    mutationFn: () => verifyEmail({ email: currentUser?.email || '' }),
    onSuccess: ({ message, otpCode }) => {
      otpCodeRef.current = otpCode.toString();
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: verifyUser } = useMutation({
    mutationFn: () => dispatch(fetchVerifyUser()).unwrap(),
    onSuccess: ({ message }) => {
      otpCodeRef.current = undefined;
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(AccountSchema),
    defaultValues,
  });

  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset({
      name: currentUser?.name,
      phone: currentUser?.phone,
      email: currentUser?.email,
      birthday: dayjs(currentUser?.birthday || new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'),
    });
  }, [currentUser, reset]);

  const onSubmit = (values: FormValuesType) => {
    if (!genderRef.current) return;

    const { name, phone, birthday } = values;
    const selectedGender = genderRef.current.getSelectedGender();
    updateProfile({
      name,
      phoneNumber: phone,
      birthday: new Date(birthday).toISOString(),
      gender: selectedGender,
    });
  };

  const handleSendOTPCode = () => {
    if (!currentUser?.email) return;
    setShowPhoneModal(true);
    sendCodeEmail();
  };

  const handleSubmitOtpCode = (enteredOTP: string) => {
    if (!otpCodeRef.current) return;

    if (enteredOTP !== otpCodeRef.current.toString()) {
      toast.error('Mã xác minh không đúng');
      return;
    }

    setShowPhoneModal(false);
    verifyUser();
  };

  return (
    <AccountInfoTabView
      methods={methods}
      genderRef={genderRef}
      loading={isSubmitting}
      modalVisible={showPhoneModal}
      onCloseModal={() => setShowPhoneModal(false)}
      onSendOTPCode={handleSendOTPCode}
      onSubmitOTPCode={handleSubmitOtpCode}
      onSubmit={onSubmit}
    />
  );
}

export default AccountInfoTab;
