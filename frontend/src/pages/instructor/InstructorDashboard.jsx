
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Stack,
    Typography,
    Chip,
    CircularProgress,
    Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PeopleIcon from "@mui/icons-material/People";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "../../services/courseService";
import { useAuth } from "../../context/AuthContext";

const InstructorDashboard = () => {
    const { user } = useAuth();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true);

                const data = await getCourses({
                    instructor: user?._id,
                    limit: 100,
                });

                setCourses(data.courses || []);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to load your courses."
                );
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            loadCourses();
        }
    }, [user]);

    const handleDelete = async (courseId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmed) return;

        try {
            await deleteCourse(courseId);

            setCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseId)
            );
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to delete course."
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
                {/* Header */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}

                    sx={{ mb: 5, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            Instructor Dashboard
                        </Typography>

                        <Typography color="text.secondary">
                            Welcome back, {user?.name}.
                        </Typography>
                    </Box>

                    <Button
                        component={Link}
                        to="/instructor/courses/new"
                        variant="contained"
                        startIcon={<AddIcon />}
                    >
                        Create Course
                    </Button>
                </Stack>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {/* Stats */}
                <Grid container spacing={3} sx={{ mb: 5 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "none",
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 2,
                                            backgroundColor: "action.hover",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <SchoolOutlinedIcon color="primary" />
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Courses
                                        </Typography>

                                        <Typography variant="h5" fontWeight={700}>
                                            {courses.length}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "none",
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 2,
                                            backgroundColor: "action.hover",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <PeopleIcon color="secondary" />
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Students
                                        </Typography>

                                        <Typography variant="h5" fontWeight={700}>
                                            {courses.reduce(
                                                (total, course) =>
                                                    total + (course.students?.length || 0),
                                                0
                                            )}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Courses */}
                <Box>
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                        My Courses
                    </Typography>

                    {courses.length === 0 ? (
                        <Card
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "none",
                            }}
                        >
                            <CardContent sx={{ py: 6, textAlign: "center" }}>
                                <Typography variant="h6" gutterBottom>
                                    You haven't created any courses yet.
                                </Typography>

                                <Typography color="text.secondary" sx={{ mb: 3 }}>
                                    Create your first course and start teaching.
                                </Typography>

                                <Button
                                    component={Link}
                                    to="/instructor/courses/new"
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                >
                                    Create Course
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Grid container spacing={3}>
                            {courses.map((course) => (
                                <Grid size={{ xs: 12, md: 6 }} key={course._id}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            boxShadow: "none",
                                        }}
                                    >
                                        <CardContent>
                                            <Stack
                                                direction="row"


                                                spacing={2}
                                                sx={{ mb: 2, justifyContent: "space-between", alignItems: "flex-start" }}
                                            >
                                                <Typography variant="h6" fontWeight={700}>
                                                    {course.title}
                                                </Typography>

                                                {course.level && (
                                                    <Chip
                                                        label={course.level}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                )}
                                            </Stack>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    mb: 3,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {course.description}
                                            </Typography>

                                            <Stack
                                                direction="row"

                                                sx={{
                                                    justifyContent: "space-between"
                                                    , alignItems: "center"
                                                }}
                                            >
                                                <Typography fontWeight={700}>
                                                    ${course.price}
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary">
                                                    {course.students?.length || 0} students
                                                </Typography>
                                            </Stack>

                                            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                                                <Button
                                                    component={Link}
                                                    to={`/instructor/courses/${course._id}/edit`}
                                                    variant="outlined"
                                                    size="small"
                                                >
                                                    Edit
                                                </Button >

                                                <Button
                                                    component={Link}
                                                    to={`/instructor/courses/${course._id}/lessons`}
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    Manage Lessons
                                                </Button>

                                                <Button
                                                    onClick={() => handleDelete(course._id)}
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                >
                                                    Delete
                                                </Button>
                                            </Stack >
                                        </CardContent >
                                    </Card >
                                </Grid >
                            ))}
                        </Grid >
                    )}
                </Box >
            </Box >
        </Container >
    );
};

export default InstructorDashboard;
