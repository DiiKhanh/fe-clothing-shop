import { fetchRemoveAddress, fetchUpdateAddressToDefault } from '@/redux/slices/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AddressesTabView from './view';
import { Address } from '@/types/customer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useMutation } from '@tanstack/react-query';

type AddressesTabProps = {
  addresses: Address[];
};

function AddressesTab({ addresses }: AddressesTabProps) {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const dispatch = useAppDispatch();

  const { mutate: removeAddressMutation } = useMutation({
    mutationFn: () => dispatch(fetchRemoveAddress({ _id: selectedAddress!._id })).unwrap(),
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateToDefaultMutation } = useMutation({
    mutationFn: (addressId: string) => dispatch(fetchUpdateAddressToDefault({ _id: addressId })).unwrap(),
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRemoveAddress = () => {
    if (!selectedAddress) return;
    removeAddressMutation();
  };

  const handleUpdateToDefault = (addressId: string) => {
    updateToDefaultMutation(addressId);
  };

  return (
    <AddressesTabView
      addresses={addresses}
      selectedAddress={selectedAddress}
      onSelectAddress={(address) => setSelectedAddress(address)}
      onRemoveAddress={handleRemoveAddress}
      onUpdateToDefault={handleUpdateToDefault}
    />
  );
}

export default AddressesTab;
