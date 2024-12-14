import { Backdrop, CircularProgress } from '@mui/material';

type BackdropLoadingProps = {
  isVisible: boolean;
};

function BackdropLoading({ isVisible }: BackdropLoadingProps) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isVisible}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default BackdropLoading;
