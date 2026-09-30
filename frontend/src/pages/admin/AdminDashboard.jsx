import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    getDashboardStats,
    getAllUsers,
    getAllCourses,
    deleteUser,
    deleteAnyCourse,
} from "../../services/adminService";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const [statsData, usersData, coursesData] = await Promise.all([
                getDashboardStats(),
                getAllUsers(),
                getAllCourses(),
            ]);

            setStats(statsData.stats);
            setUsers(usersData.users);
            setCourses(coursesData.courses);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to load admin dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const handleDeleteUser = async (userId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) return;

        try {
            await deleteUser(userId);

            setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== userId)
            );

            setStats((prev) =>
                prev
                    ? {
                        ...prev,
                        totalUsers: Math.max(prev.totalUsers - 1, 0),
                    }
                    : prev
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to delete user."
            );
        }
    };

    const handleDeleteCourse = async (courseId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmed) return;

        try {
            await deleteAnyCourse(courseId);

            setCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseId)
            );

            setStats((prev) =>
                prev
                    ? {
                        ...prev,
                        totalCourses: Math.max(prev.totalCourses - 1, 0),
                    }
                    : prev
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to delete course."
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
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={1} sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700}>
                    Admin Dashboard
                </Typography>

                <Typography color="text.secondary">
                    Manage users, courses, and platform activity.
                </Typography>
            </Stack>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Statistics */}
            <Grid container spacing={2} sx={{ mb: 5 }}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Total Users"
                        value={stats?.totalUsers || 0}
                        icon={<PeopleIcon />}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Students"
                        value={stats?.totalStudents || 0}
                        icon={<SchoolIcon />}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Instructors"
                        value={stats?.totalInstructors || 0}
                        icon={<PersonIcon />}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Courses"
                        value={stats?.totalCourses || 0}
                        icon={<MenuBookIcon />}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Enrollments"
                        value={stats?.totalEnrollments || 0}
                        icon={<SchoolIcon />}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Reviews"
                        value={stats?.totalReviews || 0}
                        icon={<RateReviewIcon />}
                    />
                </Grid>
            </Grid>

            {/* Users */}
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                Users
            </Typography>

            <Card sx={{ mb: 5 }}>
                {users.length === 0 ? (
                    <CardContent>
                        <Typography color="text.secondary">
                            No users found.
                        </Typography>
                    </CardContent>
                ) : (
                    users.map((user, index) => (
                        <Box key={user._id}>
                            <CardContent>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}


                                    spacing={2}
                                    sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}
                                >
                                    <Box>
                                        <Typography fontWeight={600}>
                                            {user.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {user.email}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mt: 0.5,
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            Role: {user.role}
                                        </Typography>
                                    </Box>

                                    <Button
                                        color="error"
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteUser(user._id)}
                                        disabled={user.role === "admin"}
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                            </CardContent>

                            {index < users.length - 1 && <Divider />}
                        </Box>
                    ))
                )}
            </Card>

            {/* Courses */}
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                Courses
            </Typography>

            <Card>
                {courses.length === 0 ? (
                    <CardContent>
                        <Typography color="text.secondary">
                            No courses found.
                        </Typography>
                    </CardContent>
                ) : (
                    courses.map((course, index) => (
                        <Box key={course._id}>
                            <CardContent>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}

                                    spacing={2}
                                >
                                    <Box>
                                        <Typography fontWeight={600}>
                                            {course.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Instructor:{" "}
                                            {course.instructor?.name || "Unknown"}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Students: {course.students?.length || 0}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{ mt: 0.5 }}
                                        >
                                            Price: ${course.price}
                                        </Typography>
                                    </Box>

                                    <Button
                                        color="error"
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() =>
                                            handleDeleteCourse(course._id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                            </CardContent>

                            {index < courses.length - 1 && <Divider />}
                        </Box>
                    ))
                )}
            </Card>
        </Container>
    );
};

const StatCard = ({ title, value, icon }) => {
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center" }}

                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            {title}
                        </Typography>

                        <Typography variant="h4" fontWeight={700}>
                            {value}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "primary.main",
                            color: "white",
                        }}
                    >
                        {icon}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default AdminDashboard;