import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#9c27b0',
            contrastText: '#ffffff',
        },
        error: {
            main: '#d32f2f',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
    },
    spacing: 16,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#1976d2',
                },
            },
        },
        MuiStack: {
            defaultProps: {
                useFlexGap: true,
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .Mui-error': {
                        color: '#d32f2f',
                        borderColor: '#d32f2f',
                    },
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    '&.Mui-error': {
                        color: '#d32f2f',
                    },
                },
            },
        },
    },
});
