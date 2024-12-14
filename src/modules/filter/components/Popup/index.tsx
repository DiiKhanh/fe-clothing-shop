import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import { ReactElement, ReactNode } from 'react';

type FilterDrawerProps = {
  isVisible: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

function FilterDrawer({ isVisible, onClose, children }: FilterDrawerProps): ReactElement {
  return (
    <Drawer anchor="left" open={isVisible} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '100vw', sm: '26rem' },
          maxHeight: '100vh',
          px: 3,
          py: 4,
          position: 'relative',
          height: '100vh',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            <TuneIcon sx={{ mr: 1 }} />
            Bộ lọc
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {children}
      </Box>
    </Drawer>
  );
}

export default FilterDrawer;
