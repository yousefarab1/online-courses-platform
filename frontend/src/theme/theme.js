import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2563EB",
        },
        secondary: {
            main: "#0F766E",
        },
        background: {
            default: "#F8FAFC",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#0F172A",
            secondary: "#64748B",
        },
    },

    typography: {
        fontFamily: "Inter, Arial, sans-serif",

        h1: {
            fontWeight: 700,
        },

        h2: {
            fontWeight: 700,
        },

        h3: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 10,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "10px 18px",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)",
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
            },
        },
    },
});

export default theme;