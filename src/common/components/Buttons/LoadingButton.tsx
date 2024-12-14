import { LoadingButton as LoadingButtonMUI, LoadingButtonProps } from '@mui/lab';
import { Theme } from '@mui/material';
import { useTheme } from '@mui/styles';

function LoadingButton({ children, loading, fullWidth, sx, disabled, ...other }: LoadingButtonProps) {
  const theme = useTheme<Theme>();

  return (
    <LoadingButtonMUI
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled || loading}
      sx={{
        px: 3,
        py: '12px',
        backgroundColor: '#111111 !important',
        color: theme.palette.grey['200'],
        borderRadius: '4px',
        textTransform: 'uppercase',
        fontWeight: '500',
        ...sx,
      }}
      {...other}
    >
      {children}
    </LoadingButtonMUI>
  );
}

export default LoadingButton;
