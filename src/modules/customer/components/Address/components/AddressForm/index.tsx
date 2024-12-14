import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { fetchAddAddress, fetchEditAddress, selectCurrentUser } from '@/redux/slices/auth';
import { Address } from '@/types/customer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AddressPayload } from '@/services/types/customer';
import { getDistricts, getProvinces, getWards } from '@/services/address';
import { AddAddressSchema, FormValuesType, getDefaultValues } from './validation';
import AddressFormView from './view';

type AddressFormProps = {
  selectedAddress?: Address;
  onClose?: () => void;
  onSubmitForm?: (_values: FormValuesType) => void;
};

function AddressForm({ selectedAddress, onClose, onSubmitForm }: AddressFormProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isEditMode = !!selectedAddress;

  const { data: citiesData } = useQuery({
    queryKey: ['vn_provinces'],
    queryFn: getProvinces,
  });

  const { mutate: fetchDistricts, data: districtsData } = useMutation({
    mutationFn: getDistricts,
    onSuccess: (data) => {
      if (!data) return;
      const districtNames = data.results.map((district: { district_name: string }) => district.district_name);
      setDistricts(districtNames);
    },
  });

  const { mutate: fetchWards } = useMutation({
    mutationFn: getWards,
    onSuccess: (data) => {
      if (!data) return;
      const wardNames = data.results.map((ward: { ward_name: string }) => ward.ward_name);
      setWards(wardNames);
    },
  });

  const { mutate: addAddress, isPending: isAdding } = useMutation({
    mutationFn: (address: AddressPayload) => dispatch(fetchAddAddress(address)).unwrap(),
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
    },
  });

  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    mutationFn: (updatedAddress: AddressPayload) => dispatch(fetchEditAddress(updatedAddress)).unwrap(),
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
    },
  });

  useEffect(() => {
    if (!citiesData) return;
    const cityNames = citiesData.results.map((province: { province_name: string }) => province.province_name);
    setCities(cityNames);
  }, [citiesData]);

  const methods = useForm({
    resolver: yupResolver(AddAddressSchema),
    defaultValues: getDefaultValues(selectedAddress, currentUser),
  });

  const { resetField, getValues } = methods;

  const onSubmit = (values: FormValuesType) => {
    if (onSubmitForm) {
      onSubmitForm(values);
      return;
    }

    onClose?.();
    const { name, phone, address, cities, districts, wards } = values;
    const enteredAddress = {
      name,
      phoneNumber: phone,
      detail: address,
      city: cities,
      district: districts,
      ward: wards,
    };

    if (selectedAddress) {
      updateAddress({ ...enteredAddress, _id: selectedAddress._id });
    } else {
      addAddress(enteredAddress);
    }
  };

  const handleChangeCity = async () => {
    resetField('districts', { defaultValue: '' });
    resetField('wards', { defaultValue: '' });

    if (!citiesData) return;
    const selectedCityName = getValues('cities');
    const selectedCity = citiesData.results.find(
      (province: { province_name: string }) => province.province_name === selectedCityName,
    );
    fetchDistricts(selectedCity?.province_id);
  };

  const handleChangeDistrict = async () => {
    resetField('wards', { defaultValue: '' });

    if (!districtsData) return;
    const selectedDistrictName = getValues('districts');
    const selectedDistrict = districtsData.results.find(
      (district: { district_name: string }) => district.district_name === selectedDistrictName,
    );
    fetchWards(selectedDistrict?.district_id);
  };

  return (
    <AddressFormView
      methods={methods}
      isEditMode={isEditMode}
      loading={isAdding || isUpdating}
      cities={cities}
      districts={districts}
      wards={wards}
      onChangeCity={handleChangeCity}
      onChangeDistrict={handleChangeDistrict}
      onSubmit={onSubmit}
      onSubmitForm={onSubmitForm}
    />
  );
}

export default AddressForm;
