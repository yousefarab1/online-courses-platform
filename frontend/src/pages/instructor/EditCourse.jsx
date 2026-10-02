import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    getCourse,
    updateCourse,
} from "../../services/courseService";

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        level: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const data = await getCourse(id);

                const course = data.course;

                setFormData({
                    title: course.title || "",
                    description: course.description || "",
                    price: course.price ?? "",
                    category: course.category || "",
                    level: course.level || "",
                });
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load course."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!formData.title.trim()) {
            setError("Course title is required.");
            return;
        }

        if (!formData.description.trim()) {
            setError("Course description is required.");
            return;
        }

        if (formData.price === "" || Number(formData.price) < 0) {
            setError("Please enter a valid price.");
            return;
        }

        try {
            setSaving(true);

            await updateCourse(id, {
                title: formData.title.trim(),
                description: formData.description.trim(),
                price: Number(formData.price),
                category: formData.category,
                level: formData.level,
            });

            navigate("/instructor");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update course."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Container maxWidth="md">
                <Box
                    sx={{
                        minHeight: "60vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 5 }}>
                <Button
                    component={Link}
                    to="/instructor"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 3 }}
                >
                    Back to Dashboard
                </Button>

                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Edit Course
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Update your course information.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        backgroundColor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        p: { xs: 2, sm: 4 },
                    }}
                >
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Stack spacing={3}>
                        <TextField
                            label="Course Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            minRows={5}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            inputProps={{ min: 0, step: 0.01 }}
                            fullWidth
                            required
                        />

                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>

                            <Select
                                name="category"
                                value={formData.category}
                                label="Category"
                                onChange={handleChange}
                            >
                                <MenuItem value="Programming">Programming</MenuItem>
                                <MenuItem value="Web Development">
                                    Web Development
                                </MenuItem>
                                <MenuItem value="Database">Database</MenuItem>
                                <MenuItem value="IoT">IoT</MenuItem>
                                <MenuItem value="AI">AI</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Level</InputLabel>

                            <Select
                                name="level"
                                value={formData.level}
                                label="Level"
                                onChange={handleChange}
                            >
                                <MenuItem value="beginner">Beginner</MenuItem>
                                <MenuItem value="intermediate">
                                    Intermediate
                                </MenuItem>
                                <MenuItem value="advanced">Advanced</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<SaveOutlinedIcon />}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default EditCourse;
