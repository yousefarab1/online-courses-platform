import { Box } from "@mui/material";
import Navbar from "../components/layout/Navbar";

const MainLayout = ({ children }) => {
    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Navbar />

            <Box component="main">
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;