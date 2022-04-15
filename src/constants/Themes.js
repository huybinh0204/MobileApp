import { DarkTheme as Dark, DefaultTheme as Default } from '@react-navigation/native';
import colors from './Colors';
import fontSize from './FontSizes';
import spacing from './Spacing';
import typography from './Typography';

const ColorScheme = {
  LIGHT: 'light',
  DARK: 'dark',
};

const LightTheme = {
  ...Default,
  colors: {
    ...Default.colors,
    ...colors,
    textColor: colors.beta900,
  },
  spacing,
  fontSize,
  typography,
};

const DarkTheme = {
  ...Dark,
  colors: {
    ...Dark.colors,
    ...colors,
    textColor: colors.white,
  },
  spacing,
  fontSize,
  typography,
};

export { ColorScheme, LightTheme, DarkTheme };
