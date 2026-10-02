import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    LinearProgress,
    Typography,
} from "@mui/material";

import { getMyCourses } from "../../services/courseService";
import { getCourseProgress } from "../../services/progressService";

import CourseCard from "../../components/courses/CourseCard";

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [progress, setProgress] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMyCourses = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyCourses();
                const enrolledCourses = data.courses || [];

                setCourses(enrolledCourses);

                // Get progress for every enrolled course
                const progressData = {};

                await Promise.all(
                    enrolledCourses.map(async (course) => {
                        try {
                            const result = await getCourseProgress(course._id);

                            progressData[course._id] =
                                result.progress?.progressPercentage || 0;
                        } catch {
                            progressData[course._id] = 0;
                        }
                    })
                );

                setProgress(progressData);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load your courses."
                );
            } finally {
                setLoading(false);
            }
        };

        loadMyCourses();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                    My Learning
                </Typography>

                <Typography color="text.secondary">
                    Continue learning from the courses you have enrolled in.
                </Typography>
            </Box>

            {loading ? (
                <Box
                    sx={{
                        minHeight: 300,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : courses.length === 0 ? (
                <Box
                    sx={{
                        textAlign: "center",
                        py: 10,
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        gutterBottom
                    >
                        You haven't enrolled in any courses yet.
                    </Typography>

                    <Typography color="text.secondary">
                        Explore our courses and start learning today.
                    </Typography>

                    <Button
                        component={Link}
                        to="/courses"
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Browse Courses
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {courses.map((course) => {
                        const courseProgress = progress[course._id] || 0;

                        return (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4 }}
                                key={course._id}
                            >
                                <Box>
                                    <CourseCard course={course} />

                                    {/* Progress */}
                                    <Box sx={{ mt: 2 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                mb: 0.5,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Course Progress
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                            >
                                                {courseProgress}%
                                            </Typography>
                                        </Box>

                                        <LinearProgress
                                            variant="determinate"
                                            value={courseProgress}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                            }}
                                        />
                                    </Box>

                                    {/* Continue Learning */}
                                    <Button
                                        component={Link}
                                        to={`/courses/${course._id}/learn`}
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 1.5 }}
                                    >
                                        {courseProgress === 100
                                            ? "Review Course"
                                            : "Continue Learning"}
                                    </Button>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Container>
    );
};

export default MyCourses;
