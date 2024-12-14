import {
  Box,
  Button as ButtonMUI,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useState } from 'react';
import AddAddressModal from '../../../Address/components/AddAddressModal';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import { Address } from '@/types/customer';
import { useCustomTheme } from '@/common/styles/theme';
import Button from '@/common/components/Buttons/Button';

type AddressesTabViewProps = {
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (_address: Address | null) => void;
  onUpdateToDefault: (_addressId: string) => void;
  onRemoveAddress: () => void;
};

function AddressesTabView({
  addresses,
  selectedAddress,
  onSelectAddress,
  onUpdateToDefault,
  onRemoveAddress,
}: AddressesTabViewProps) {
  const [showAddAddressModal, setShowAddressModal] = useState(false);
  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);

  const theme = useCustomTheme();

  const handleUpdateAddress = (item: Address) => {
    setShowAddressModal(true);
    onSelectAddress(item);
  };

  const handleCloseAddressFormModal = () => {
    setShowAddressModal(false);
    onSelectAddress(null);
  };

  const handleOpenConfirmModal = (item: Address) => {
    setShowConfirmRemoveModal(true);
    onSelectAddress(item);
  };

  const handleCloseConfirmModal = () => {
    onSelectAddress(null);
    setShowConfirmRemoveModal(false);
  };

  const handleRemoveAddress = () => {
    setShowConfirmRemoveModal(false);
    onRemoveAddress();
  };

  const handleMarkAsDefault = (e: React.ChangeEvent<HTMLInputElement>, address: Address) => {
    if (e.target.checked) {
      onUpdateToDefault(address._id);
    }
  };

  return (
    <>
      <Box>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
          <Box>
            <Typography variant="h5">Địa chỉ giao hàng</Typography>
            <Typography variant="body1" sx={{ mt: '6px' }}>
              Quản lý thông tin những địa chỉ giao hàng của bạn
            </Typography>
          </Box>
          <Button className="text-xs px-3 h-10 mt-3 md:mt-0" onClick={() => setShowAddressModal(true)}>
            <AddIcon sx={{ mr: 1 }} /> Thêm địa chỉ mới
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {addresses?.map((item, index) => (
          <Fragment key={index}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              sx={{ mt: 3 }}
              spacing={{ md: 8 }}
            >
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                  <Divider orientation="vertical" sx={{ height: 20, backgroundColor: theme.palette.grey[400] }} />
                  <Typography style={{ color: theme.palette.grey[700] }}>{item.phone}</Typography>
                </Stack>
                <Typography style={{ color: theme.palette.grey[700] }}>
                  {item.detail}, {item.ward}, {item.district}, {item.city}
                </Typography>
                {item.isDefault && (
                  <Box sx={{ border: `1px solid ${theme.palette.grey[900]}`, display: 'inline-block', px: 1, mt: 1 }}>
                    <Typography>Mặc định</Typography>
                  </Box>
                )}
              </Box>
              <Box sx={{ mt: { xs: 1, md: 0 } }}>
                <ButtonMUI onClick={() => handleUpdateAddress(item)}>Chỉnh sửa</ButtonMUI>
                <ButtonMUI sx={{ color: theme.palette.error.main }} onClick={() => handleOpenConfirmModal(item)}>
                  Xóa
                </ButtonMUI>
                {!item.isDefault && (
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox onChange={(e) => handleMarkAsDefault(e, item)} />}
                      label="Mặc định"
                    />
                  </FormGroup>
                )}
              </Box>
            </Stack>

            {index !== addresses.length - 1 && <Divider sx={{ my: 1 }} />}
          </Fragment>
        ))}
      </Box>

        <AddAddressModal
          isVisible={showAddAddressModal}
          address={selectedAddress || undefined}
          onClose={handleCloseAddressFormModal}
        />

      <ConfirmModal
        isOpen={showConfirmRemoveModal}
        title="Xóa địa chỉ?"
        subTitle="Bạn có chắc muốn xóa địa chỉ chứ?"
        confirmTextBtn="Xóa"
        onClose={handleCloseConfirmModal}
        onConfirm={handleRemoveAddress}
      />
    </>
  );
}

export default AddressesTabView;
