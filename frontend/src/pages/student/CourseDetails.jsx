import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    MenuItem,
    Paper,
    Rating,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";
import {
    getCourse,
    enrollInCourse,
} from "../../services/courseService";

import {
    getCourseReviews,
    addCourseReview,
} from "../../services/reviewService";

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();

    const [course, setCourse] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    const [enrolling, setEnrolling] = useState(false);
    const [submittingReview, setSubmittingReview] = useState(false);

    const [error, setError] = useState("");
    const [reviewError, setReviewError] = useState("");

    const [rating, setRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");

    useEffect(() => {
        const loadCourse = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getCourse(id);

                setCourse(data.course);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load course."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [id]);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                setReviewsLoading(true);
                setReviewError("");

                const data = await getCourseReviews(id);

                setReviews(data.reviews || []);
            } catch (error) {
                setReviewError(
                    error.response?.data?.message ||
                    "Failed to load reviews."
                );
            } finally {
                setReviewsLoading(false);
            }
        };

        loadReviews();
    }, [id]);

    const isEnrolled = course?.students?.some(
        (studentId) =>
            studentId === user?._id ||
            studentId?._id === user?._id
    );

    const handleEnroll = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role !== "student") {
            return;
        }

        try {
            setEnrolling(true);
            setError("");

            await enrollInCourse(id);

            const data = await getCourse(id);
            setCourse(data.course);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to enroll in this course."
            );
        } finally {
            setEnrolling(false);
        }
    };

    const handleAddReview = async () => {
        if (!reviewComment.trim()) return;

        try {
            setSubmittingReview(true);
            setReviewError("");

            const data = await addCourseReview(
                id,
                rating,
                reviewComment.trim()
            );

            setReviews((prev) => [
                data.review,
                ...prev,
            ]);

            setReviewComment("");
            setRating(5);
        } catch (error) {
            setReviewError(
                error.response?.data?.message ||
                "Failed to add review."
            );
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error && !course) {
        return (
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Course Header */}
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 3, md: 5 },
                    mb: 4,
                }}
            >
                <Stack spacing={2}>
                    <Typography
                        variant="h3"
                        fontWeight={700}
                        sx={{
                            fontSize: {
                                xs: "2rem",
                                md: "3rem",
                            },
                        }}
                    >
                        {course.title}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            flexWrap: "wrap",
                        }} useFlexGap
                    >
                        {course.category && (
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 1,
                                    backgroundColor: "primary.main",
                                    color: "white",
                                    fontSize: 14,
                                }}
                            >
                                {course.category}
                            </Box>
                        )}

                        {course.level && (
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 1,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    fontSize: 14,
                                }}
                            >
                                {course.level}
                            </Box>
                        )}
                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            maxWidth: 800,
                            lineHeight: 1.8,
                        }}
                    >
                        {course.description}
                    </Typography>
                </Stack>
            </Paper>

            {/* Course Info + Enrollment */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "2fr 1fr",
                    },
                    gap: 3,
                    mb: 5,
                }}
            >
                {/* Course Content */}
                <Paper variant="outlined" sx={{ p: 3 }}>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        gutterBottom
                    >
                        Course Content
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        {course.lessons?.length || 0} lessons available
                    </Typography>

                    {course.lessons?.length > 0 ? (
                        <Stack spacing={1}>
                            {course.lessons.map((lesson, index) => (
                                <Box
                                    key={lesson._id}
                                    sx={{
                                        p: 2,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography fontWeight={600}>
                                        {index + 1}. {lesson.title}
                                    </Typography>

                                    {lesson.duration > 0 && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {lesson.duration} minutes
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        <Typography color="text.secondary">
                            No lessons have been added yet.
                        </Typography>
                    )}
                </Paper>

                {/* Enrollment Card */}
                <Paper
                    variant="outlined"
                    sx={{
                        p: 3,
                        height: "fit-content",
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{ mb: 1 }}
                    >
                        ${course.price}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        {course.students?.length || 0} students enrolled
                    </Typography>

                    {user?.role === "student" ? (
                        isEnrolled ? (
                            <Button
                                component={Link}
                                to={`/courses/${course._id}/learn`}
                                variant="contained"
                                fullWidth
                            >
                                Continue Learning
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleEnroll}
                                disabled={enrolling}
                            >
                                {enrolling
                                    ? "Enrolling..."
                                    : "Enroll Now"}
                            </Button>
                        )
                    ) : !user ? (
                        <Button
                            component={Link}
                            to="/login"
                            variant="contained"
                            fullWidth
                        >
                            Login to Enroll
                        </Button>
                    ) : (
                        <Alert severity="info">
                            Only students can enroll in courses.
                        </Alert>
                    )}
                </Paper>
            </Box>

            {/* Reviews */}
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 2, md: 3 },
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ mb: 3 }}
                >
                    Student Reviews
                </Typography>

                {/* Add Review */}
                {user?.role === "student" && isEnrolled && (
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{ mb: 1.5 }}
                        >
                            Share your experience
                        </Typography>

                        <Rating
                            value={rating}
                            onChange={(_, newValue) => {
                                if (newValue !== null) {
                                    setRating(newValue);
                                }
                            }}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            maxRows={6}
                            placeholder="What did you think about this course?"
                            value={reviewComment}
                            onChange={(e) =>
                                setReviewComment(e.target.value)
                            }
                            sx={{ maxLength: 500 }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 1.5,
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={handleAddReview}
                                disabled={
                                    !reviewComment.trim() ||
                                    submittingReview
                                }
                            >
                                {submittingReview
                                    ? "Submitting..."
                                    : "Submit Review"}
                            </Button>
                        </Box>
                    </Box>
                )}

                {reviewError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {reviewError}
                    </Alert>
                )}

                <Divider sx={{ mb: 3 }} />

                {/* Reviews List */}
                {reviewsLoading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 4,
                        }}
                    >
                        <CircularProgress size={30} />
                    </Box>
                ) : reviews.length === 0 ? (
                    <Typography color="text.secondary">
                        No reviews yet. Be the first to review this
                        course.
                    </Typography>
                ) : (
                    <Stack spacing={3}>
                        {reviews.map((review) => (
                            <Box key={review._id}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Box>
                                        <Typography fontWeight={700}>
                                            {review.student?.name || "Student"}
                                        </Typography>

                                        <Rating
                                            value={review.rating}
                                            readOnly
                                            size="small"
                                        />
                                    </Box>

                                    {review.createdAt && (
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </Typography>
                                    )}
                                </Box>

                                {review.comment && (
                                    <Typography
                                        color="text.secondary"
                                        sx={{
                                            mt: 1,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {review.comment}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Stack>
                )}
            </Paper>
        </Container>
    );
};

export default CourseDetails;