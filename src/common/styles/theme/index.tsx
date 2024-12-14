import { ReactNode } from 'react';
import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { useTheme } from '@mui/styles';
import palette from './palette';
import typography from './typography';
import { CustomTheme } from './theme';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const themeOptions: CustomTheme = {
    palette: {
      ...palette,
    mode
    },
    shape: { borderRadius: 8 },
    typography,
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
      },
    },
  };
  const customTheme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

export const useCustomTheme = () => {
  return useTheme<CustomTheme>();
};
