import { ThemeOptions, createTheme } from "@mui/material/styles";
import { Manrope } from "next/font/google";

const font = Manrope({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#3a77ff",
    },
    secondary: {
      main: "#0288d1",
    },
    error: {
      main: "#ff1744",
    },
    warning: {
      main: "#ef6c00",
    },
    info: {
      main: "#5c6bc0",
    },
    success: {
      main: "#8bc34a",
    },
  },
  typography: {
    fontFamily: font.style.fontFamily,
  },
};

const theme = createTheme(themeOptions);

export default theme;
