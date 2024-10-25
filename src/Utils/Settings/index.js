import { QueryClient } from "@tanstack/react-query";
import { createTheme } from '@mui/material/styles';

// REACT QUERY SETTINGS
export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 300000,
      refetchOnWindowFocus: false,
      staleTime: 0,
      retry: 3,
    },
  },
});

// REACT QUERY DEVTOOL CONFIGURATION
export const RQ_DEVTOOL_CONFIG = {
  initialIsOpen: false,
  position: "bottom-left",
};

// MUI THEMING
export const THEME = createTheme({
  palette: {
    primary: { main: "#37a862" },
    secondary: { main: "#f2cc0e" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // opacity: 0.8,
          "&:hover": {
            // opacity: 1,
            // Add other hover styles as needed
          },
          height: "55px",
        },
      },
    },
    // Add other components with hover styles as needed
  },
});
