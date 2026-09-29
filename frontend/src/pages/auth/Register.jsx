import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";

import { registerUser } from "../../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
            await registerUser(formData);

            navigate("/login");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
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
                        Create your account
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Start your learning journey with EduFlow.
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
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

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
                                "Create Account"
                            )}
                        </Button>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                        >
                            Already have an account?{" "}
                            <Box
                                component={Link}
                                to="/login"
                                sx={{
                                    color: "primary.main",
                                    textDecoration: "none",
                                    fontWeight: 600,
                                }}
                            >
                                Login
                            </Box>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;