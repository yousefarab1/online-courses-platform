import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Grid,
    Typography,
    Button
} from "@mui/material";

import { getMyCourses } from "../../services/courseService";
import CourseCard from "../../components/courses/CourseCard";


const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMyCourses = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyCourses();

                setCourses(data.courses || []);
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
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        You haven't enrolled in any courses yet.
                    </Typography>

                    <Typography color="text.secondary">
                        Explore our courses and start learning today.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {courses.map((course) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4 }}
                            key={course._id}
                        >
                            <Box>
                                <CourseCard course={course} />

                                <Button
                                    component={Link}
                                    to={`/courses/${course._id}/learn`}
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 1.5 }}
                                >
                                    Continue Learning
                                </Button>
                            </Box>
                        </Grid>

                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default MyCourses;
