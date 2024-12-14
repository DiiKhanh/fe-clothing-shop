import * as React from 'react';
import { Stack, Typography, Modal, Box } from '@mui/material';
import Button from '@/common/components/Buttons/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  subTitle: string;
  confirmTextBtn: string;
  onClose?: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  isOpen,
  title,
  subTitle,
  confirmTextBtn,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {subTitle}
        </Typography>
        <Stack direction="row" justifyContent="flex-end" spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Button variant="text" className="text-[#111] border-[#111] !bg-white" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="contained" onClick={onConfirm}>
            {confirmTextBtn}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
