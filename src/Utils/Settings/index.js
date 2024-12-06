import { QueryClient } from "@tanstack/react-query";
import { createTheme } from "@mui/material/styles";

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
    primary: { main: "#5093e0" },
    secondary: { main: "#f2cc0e" },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
  components: {
    // Button customizations
    MuiButton: {
      styleOverrides: {
        root: {
          height: "55px",
          "&:hover": {
            // Add other hover styles as needed
          },
        },
      },
    },
    // TextField customizations for disabled state
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFilledInput-root.Mui-disabled": {
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          },
        },
      },
    },
    // InputBase customizations for general input fields
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          },
        },
      },
    },
  },
});
