import { Box, Fade, IconButton, Modal, Stack } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from '@/modules/auth/components/LoginForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: { xs: 'translate(-50%, -50%)', md: 'translate(-50%, -42%)' },
  width: { xs: '100%', md: '700px' },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};

type LoginModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

function LoginModal({ isVisible, onClose }: LoginModalProps) {
  const handleLogin = () => {
    onClose();
  };

  return (
    <Modal
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
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Box sx={{ paddingX: 5 }}>
            <LoginForm onLogin={handleLogin} />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default LoginModal;
