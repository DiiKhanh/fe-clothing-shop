import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import RHFAutocomplete from '@/common/components/Form/RHFAutocomplete';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { UseFormReturn } from 'react-hook-form';
import { FormValuesType } from './validation';

type AddressFormViewProps = {
  methods: UseFormReturn<FormValuesType, any>;
  isEditMode: boolean;
  loading: boolean;
  cities: string[];
  districts: string[];
  wards: string[];
  onChangeCity: Function;
  onChangeDistrict: Function;
  onSubmit: (_values: FormValuesType) => void;
  onSubmitForm?: (_values: FormValuesType) => void;
};

function AddressFormView({
  methods,
  isEditMode,
  loading,
  cities,
  districts,
  wards,
  onChangeCity,
  onChangeDistrict,
  onSubmit,
  onSubmitForm,
}: AddressFormViewProps) {
  const { handleSubmit } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ và tên" />
      <RHFTextField name="email" label="Email" id="email" placeholder="Địa chỉ email" />
      <RHFTextField name="phone" label="Số điện thoại" id="phone" placeholder="Số điện thoại" />
      <RHFTextField name="address" label="Địa chỉ" id="address" placeholder="Địa chỉ" />
      <RHFAutocomplete
        name="cities"
        label="Tỉnh/Thành phố (*)"
        options={cities || []}
        getOptionLabel={(option: string) => option}
        isOptionEqualToValue={(option: string, value: string) => option === value}
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={onChangeCity}
      />

      <RHFAutocomplete
        name="districts"
        label="Quận/Huyện (*)"
        options={districts}
        getOptionLabel={(option: string) => option}
        isOptionEqualToValue={(option: string, value: string) => option === value}
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={onChangeDistrict}
      />

      <RHFAutocomplete
        name="wards"
        label="Phường/Xã (*)"
        options={wards}
        getOptionLabel={(option: string) => option}
        isOptionEqualToValue={(option: string, value: string) => option === value}
        sx={{ mt: 4, mb: 2 }}
      />

      <LoadingButton fullWidth loading={loading} type="submit" sx={{ mt: 3, mb: 1 }}>
        {onSubmitForm ? 'Thanh toán' : isEditMode ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}
      </LoadingButton>
    </FormProvider>
  );
}

export default AddressFormView;
