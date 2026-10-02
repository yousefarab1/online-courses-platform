import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { lightTheme, darkTheme } from "../theme/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("themeMode") || "light";
    });

    useEffect(() => {
        localStorage.setItem("themeMode", mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prevMode) =>
            prevMode === "light" ? "dark" : "light"
        );
    };

    const theme = useMemo(() => {
        return mode === "light" ? lightTheme : darkTheme;
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            {children(theme)}
        </ThemeContext.Provider>
    );
};

export const useThemeMode = () => {
    return useContext(ThemeContext);
};
