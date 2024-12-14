import { Box, Button as ButtonMUI, Card, CardContent, CardHeader, Radio, Stack, Typography } from '@mui/material';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Button from '@/common/components/Buttons/Button';
import { selectCurrentUser } from '@/redux/slices/auth';
import config from '@/config';
import AddAddressModal from '@/modules/customer/components/Address/components/AddAddressModal';
import { Address } from '@/types/customer';
import { useAppSelector } from '@/hooks/useAppSelector';

function AddressList(): ReactElement {
  const currentUser = useAppSelector(selectCurrentUser);
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [showAddressFormModal, setShowAddressFormModal] = useState(false);

  useEffect(() => {
    setSelectedAddress(currentUser?.address[0]);
  }, [currentUser]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(JSON.parse(event.target.value));
  };

  const controlProps = (address: Address) => ({
    checked: selectedAddress?._id === address._id,
    onChange: handleChange,
    value: JSON.stringify(address),
  });

  const handleCheckoutWithExistingAddress = () => {
    if (!selectedAddress) {
      toast.error('Vui lòng chọn địa chỉ');
      return;
    }

    const { name, phone } = selectedAddress;

    const shippingInfor = {
      name,
      phone,
      address: mapAddressToData(selectedAddress),
      email: currentUser?.email,
      note: '',
    };
    localStorage.setItem('shippingInfor', JSON.stringify(shippingInfor));

    Router.push({
      pathname: config.routes.checkoutPayment,
      query: {
        toName: name,
        toPhone: phone,
        toEmail: currentUser?.email,
        toAddress: mapAddressToData(selectedAddress),
        toNote: '',
      },
    });
  };

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setShowAddressFormModal(true);
  };

  return (
    <>
      <Box>
        {currentUser?.address.map((item) => (
          <Card key={item._id} sx={{ mt: 2 }} elevation={2}>
            <CardContent>
              <CardHeader
                sx={{ p: '6px' }}
                avatar={<Radio {...controlProps(item)} defaultChecked={item.isDefault} />}
                title={
                  <Typography>
                    <strong>{item.name}</strong> | {item.phone}
                  </Typography>
                }
                subheader={
                  <Stack>
                    <Typography>{item.detail}</Typography>
                    <Typography>{`${item.ward}, ${item.district}, ${item.city}`}</Typography>
                  </Stack>
                }
                action={<ButtonMUI onClick={() => handleEditAddress(item)}>Cập nhật</ButtonMUI>}
              />
            </CardContent>
          </Card>
        ))}

        <Button fullWidth className="mt-6" onClick={handleCheckoutWithExistingAddress}>
          CHỌN ĐỊA CHỈ
        </Button>
      </Box>

      <AddAddressModal
        isVisible={showAddressFormModal}
        address={selectedAddress}
        onClose={() => setShowAddressFormModal(false)}
      />
    </>
  );
}

function mapAddressToData(address: Address) {
  const { detail, ward, district, city } = address;
  const formattedAddress = `${detail}, ${ward}, ${district}, ${city}`;
  return formattedAddress;
}

export default AddressList;
