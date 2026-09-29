import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Link, useParams } from "react-router-dom";

import {
    getCourseLessons,
    createLesson,
    updateLesson,
    deleteLesson,
} from "../../services/lessonService";

import { getCourse } from "../../services/courseService";

const ManageLessons = () => {
    const { courseId } = useParams();

    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoUrl: "",
        order: "",
        duration: "",
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const [courseData, lessonsData] = await Promise.all([
                    getCourse(courseId),
                    getCourseLessons(courseId),
                ]);

                setCourse(courseData.course);
                setLessons(lessonsData.lessons || []);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load course lessons."
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [courseId]);

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            videoUrl: "",
            order: "",
            duration: "",
        });

        setEditingId(null);
        setShowForm(false);
    };

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
            setError("Lesson title is required.");
            return;
        }

        if (!formData.order || Number(formData.order) < 1) {
            setError("Order must be at least 1.");
            return;
        }

        if (formData.duration !== "" && Number(formData.duration) < 0) {
            setError("Duration cannot be negative.");
            return;
        }

        const lessonData = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            videoUrl: formData.videoUrl.trim(),
            order: Number(formData.order),
            duration:
                formData.duration === ""
                    ? 0
                    : Number(formData.duration),
        };

        try {
            setSaving(true);

            if (editingId) {
                const data = await updateLesson(editingId, lessonData);

                const updatedLesson = data.lesson;

                setLessons((prev) =>
                    prev.map((lesson) =>
                        lesson._id === editingId
                            ? updatedLesson
                            : lesson
                    )
                );
            } else {
                const data = await createLesson(courseId, lessonData);

                setLessons((prev) =>
                    [...prev, data.lesson].sort(
                        (a, b) => a.order - b.order
                    )
                );
            }

            resetForm();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to save lesson."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (lesson) => {
        setEditingId(lesson._id);

        setFormData({
            title: lesson.title || "",
            description: lesson.description || "",
            videoUrl: lesson.videoUrl || "",
            order: lesson.order ?? "",
            duration: lesson.duration ?? "",
        });

        setShowForm(true);
        setError("");
    };

    const handleDelete = async (lessonId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this lesson?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteLesson(lessonId);

            setLessons((prev) =>
                prev.filter((lesson) => lesson._id !== lessonId)
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to delete lesson."
            );
        }
    };

    if (loading) {
        return (
            <Container maxWidth="lg">
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
        <Container maxWidth="lg">
            <Box sx={{ py: 5 }}>
                <Button
                    component={Link}
                    to="/instructor"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 3 }}
                >
                    Back to Dashboard
                </Button>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight={700}>
                            Manage Lessons
                        </Typography>

                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            {course?.title}
                        </Typography>
                    </Box>

                    {!showForm && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                setError("");
                                setShowForm(true);
                            }}
                        >
                            Add Lesson
                        </Button>
                    )}
                </Stack>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {/* Lesson Form */}
                {showForm && (
                    <Card
                        sx={{
                            mb: 4,
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "none",
                        }}
                    >
                        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                                {editingId ? "Edit Lesson" : "Add Lesson"}
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <TextField
                                        label="Lesson Title"
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
                                        minRows={3}
                                        fullWidth
                                    />

                                    <TextField
                                        label="Video URL"
                                        name="videoUrl"
                                        value={formData.videoUrl}
                                        onChange={handleChange}
                                        fullWidth
                                        placeholder="https://..."
                                    />

                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={2}
                                    >
                                        <TextField
                                            label="Order"
                                            name="order"
                                            type="number"
                                            value={formData.order}
                                            onChange={handleChange}
                                            inputProps={{ min: 1 }}
                                            fullWidth
                                            required
                                        />

                                        <TextField
                                            label="Duration (minutes)"
                                            name="duration"
                                            type="number"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            inputProps={{ min: 0 }}
                                            fullWidth
                                        />
                                    </Stack>

                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={1}
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<SaveOutlinedIcon />}
                                            disabled={saving}
                                        >
                                            {saving
                                                ? "Saving..."
                                                : editingId
                                                    ? "Save Changes"
                                                    : "Add Lesson"}
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outlined"
                                            startIcon={<CancelOutlinedIcon />}
                                            onClick={resetForm}
                                            disabled={saving}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                )}

                {/* Lessons */}
                {lessons.length === 0 ? (
                    <Card
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "none",
                        }}
                    >
                        <CardContent sx={{ py: 6, textAlign: "center" }}>
                            <Typography variant="h6" gutterBottom>
                                No lessons yet.
                            </Typography>

                            <Typography color="text.secondary" sx={{ mb: 3 }}>
                                Add the first lesson to this course.
                            </Typography>

                            {!showForm && (
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => setShowForm(true)}
                                >
                                    Add Lesson
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <Stack spacing={2}>
                        {lessons.map((lesson, index) => (
                            <Card
                                key={lesson._id}
                                sx={{
                                    border: "1px solid",
                                    borderColor: "divider",
                                    boxShadow: "none",
                                }}
                            >
                                <CardContent>
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        justifyContent="space-between"
                                        alignItems={{ xs: "flex-start", sm: "center" }}
                                        spacing={2}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                                sx={{ mb: 1 }}
                                            >
                                                <Chip
                                                    label={`Lesson ${lesson.order}`}
                                                    size="small"
                                                />

                                                {lesson.duration > 0 && (
                                                    <Chip
                                                        label={`${lesson.duration} min`}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                )}
                                            </Stack>

                                            <Typography variant="h6" fontWeight={600}>
                                                {lesson.title}
                                            </Typography>

                                            {lesson.description && (
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ mt: 1 }}
                                                >
                                                    {lesson.description}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Stack direction="row" spacing={1}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<EditOutlinedIcon />}
                                                onClick={() => handleEdit(lesson)}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDelete(lesson._id)}
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </CardContent>

                                {index < lessons.length - 1 && <Divider />}
                            </Card>
                        ))}
                    </Stack>
                )}
            </Box>
        </Container>
    );
};

export default ManageLessons;
