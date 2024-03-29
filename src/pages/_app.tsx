import { TodoProvider } from "@/context";
import theme from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <TodoProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </TodoProvider>
    </ThemeProvider>
  );
}
