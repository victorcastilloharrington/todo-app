import { ThemeOptions, createTheme } from '@mui/material/styles';
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});


const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#fdd835',
    },
    secondary: {
      main: '#00b0ff',
    },
    background: {
      default: '#080808',
    },
    text: {
      primary: '#f5f5f5',
    },
    error: {
      main: '#ff1744',
    },
    warning: {
      main: '#ef6c00',
    },
    info: {
      main: '#5c6bc0',
    },
    success: {
      main: '#8bc34a',
    },
  },
  typography: {
    fontFamily: nunito.style.fontFamily,
  },
};

const theme = createTheme(themeOptions)

export default theme