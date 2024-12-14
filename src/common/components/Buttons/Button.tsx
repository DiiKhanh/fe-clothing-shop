import { Button as ButtonMUI, Theme, ButtonProps as ButtonMUIProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/styles';

type ButtonProps = ButtonMUIProps & {
  loading?: boolean;
};

function Button({ children, loading, disabled, startIcon, sx, ...rest }: ButtonProps) {
  const theme = useTheme<Theme>();

  return (
    <ButtonMUI
      {...rest}
      sx={{
        px: 3,
        py: '12px',
        backgroundColor: disabled ? '#cecece !important' : '#111111 !important',
        color: theme.palette.grey['200'],
        borderRadius: '4px',
        textTransform: 'uppercase',
        fontWeight: '500',
        ...sx,
      }}
      startIcon={loading ? <CircularProgress size="18px" /> : startIcon}
      disabled={disabled || loading}
    >
      {children}
    </ButtonMUI>
  );
}

export default Button;
