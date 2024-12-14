import { Box, Fade, IconButton, Modal, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/auth';
import FormOTP from './components/FormOTP';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: { xs: 'translate(-50%, -50%)', md: 'translate(-50%, -42%)' },
  width: { xs: '97%', md: '600px' },
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 3,
};

type PhoneValidationModalProps = {
  isVisible: boolean;
  onClose: (_event?: {}, _reason?: 'backdropClick' | 'escapeKeyDown') => void;
  onSubmit: (_otpCode: string) => void;
};

function PhoneValidationModal({ isVisible, onClose, onSubmit }: PhoneValidationModalProps) {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isVisible}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={isVisible}>
          <Box sx={style}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <IconButton onClick={() => onClose()}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Box sx={{ paddingX: { xs: 2, md: 4 }, textAlign: 'center' }}>
              <Typography variant="h6">Vui lòng nhập mã xác minh</Typography>
              <Typography sx={{ mt: 4 }}>Mã xác minh của bạn sẽ được gửi bằng email đến</Typography>
              <Typography sx={{ fontWeight: 400, fontSize: 24, mt: 1 }}>{currentUser?.email}</Typography>
              <FormOTP onSubmit={onSubmit} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default PhoneValidationModal;
