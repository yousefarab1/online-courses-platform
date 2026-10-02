import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        {(theme) => (
          <MuiThemeProvider theme={theme}>
            <CssBaseline />

            <AuthProvider>
              <App />
            </AuthProvider>
          </MuiThemeProvider>
        )}
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
