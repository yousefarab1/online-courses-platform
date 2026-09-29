import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Alert,
    CircularProgress,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await login(formData);

            if (data.user.role === "admin") {
                navigate("/admin");
            } else if (data.user.role === "instructor") {
                navigate("/instructor");
            } else {
                navigate("/courses");
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "calc(100vh - 72px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 6,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: "100%",
                        p: 4,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Welcome back
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Login to continue learning.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;