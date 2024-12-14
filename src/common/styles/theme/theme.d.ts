import { createTheme } from '@mui/material/styles';
import { ThemeOptions as ThemeOptionsOld } from '@mui/material/styles/createTheme';
import palette from './palette';
import typography from './typography';

const themeOptions: ThemeOptionsOld = {
  palette,
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

type CustomTheme = {
  [Key in keyof typeof themeOptions]: (typeof themeOptions)[Key];
};
declare module '@mui/material/styles/createTheme' {
  export interface Theme extends CustomTheme {}
  export interface ThemeOptions extends CustomTheme {}
}

export const customTheme = createTheme(themeOptions);
