import { createTheme } from "@mui/material/styles";

const commonSettings = {
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
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
            },
        },
    },
};

export const lightTheme = createTheme({
    ...commonSettings,

    palette: {
        mode: "light",

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

    components: {
        ...commonSettings.components,

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)",
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: "#90CAF9",
            contrastText: "#121212",
        },

        secondary: {
            main: "#80CBC4",
        },

        background: {
            default: "#121212",
            paper: "#1E1E1E",
        },

        text: {
            primary: "#F5F5F5",
            secondary: "#A0A0A0",
        },

        divider: "#333333",
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
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.25)",
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
