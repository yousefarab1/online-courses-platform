import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "background.paper",
                color: "text.primary",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 72,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        sx={{
                            textDecoration: "none",
                            color: "primary.main",
                            fontWeight: 800,
                        }}
                    >
                        EduFlow
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Button
                            component={Link}
                            to="/courses"
                            color="inherit"
                        >
                            Courses
                        </Button>

                        {!user ? (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    color="inherit"
                                >
                                    Login
                                </Button>

                                <Button
                                    component={Link}
                                    to="/register"
                                    variant="contained"
                                >
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <>
                                {user.role === "student" && (
                                    <Button
                                        component={Link}
                                        to="/my-courses"
                                        color="inherit"
                                    >
                                        My Learning
                                    </Button>
                                )}

                                {user.role === "instructor" && (
                                    <Button
                                        component={Link}
                                        to="/instructor"
                                        color="inherit"
                                    >
                                        Dashboard
                                    </Button>
                                )}

                                {user.role === "admin" && (
                                    <Button
                                        component={Link}
                                        to="/admin"
                                        color="inherit"
                                    >
                                        Dashboard
                                    </Button>
                                )}

                                <Typography
                                    variant="body2"
                                    sx={{ mx: 1, display: { xs: "none", md: "block" } }}
                                >
                                    {user.name}
                                </Typography>

                                <Button
                                    onClick={handleLogout}
                                    color="inherit"
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;