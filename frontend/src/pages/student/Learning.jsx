import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";

import { getCourseLessons } from "../../services/lessonService";
import {
    getCourseProgress,
    markLessonComplete,
} from "../../services/progressService";

import {
    getLessonComments,
    addLessonComment,
} from "../../services/commentService";

const Learning = () => {
    const { courseId } = useParams();
    const { user } = useAuth();

    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const [progress, setProgress] = useState({
        completedLessons: 0,
        totalLessons: 0,
        progressPercentage: 0,
        completedLessonsData: [],
    });

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const [loading, setLoading] = useState(true);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [submittingComment, setSubmittingComment] = useState(false);

    const [completing, setCompleting] = useState(false);

    const [error, setError] = useState("");
    const [commentsError, setCommentsError] = useState("");

    useEffect(() => {
        const loadLearningData = async () => {
            try {
                setLoading(true);
                setError("");

                const [lessonsData, progressData] = await Promise.all([
                    getCourseLessons(courseId),
                    getCourseProgress(courseId),
                ]);

                const loadedLessons = lessonsData.lessons || [];

                setLessons(loadedLessons);

                if (loadedLessons.length > 0) {
                    setSelectedLesson(loadedLessons[0]);
                }

                setProgress(
                    progressData.progress || {
                        completedLessons: 0,
                        totalLessons: loadedLessons.length,
                        progressPercentage: 0,
                        completedLessonsData: [],
                    }
                );
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load course content."
                );
            } finally {
                setLoading(false);
            }
        };

        loadLearningData();
    }, [courseId]);

    useEffect(() => {
        const loadComments = async () => {
            if (!selectedLesson) return;

            try {
                setCommentsLoading(true);
                setCommentsError("");

                const data = await getLessonComments(selectedLesson._id);

                setComments(data.comments || []);
            } catch (error) {
                setCommentsError(
                    error.response?.data?.message ||
                    "Failed to load comments."
                );
            } finally {
                setCommentsLoading(false);
            }
        };

        loadComments();
    }, [selectedLesson]);

    const isLessonCompleted = (lessonId) => {
        return progress.completedLessonsData?.some(
            (lesson) =>
                lesson._id === lessonId ||
                lesson === lessonId
        );
    };

    const handleCompleteLesson = async () => {
        if (!selectedLesson || completing) return;

        try {
            setCompleting(true);

            const data = await markLessonComplete(
                courseId,
                selectedLesson._id
            );

            setProgress((prev) => ({
                ...prev,
                ...data.progress,
                completedLessonsData: [
                    ...(prev.completedLessonsData || []).filter(
                        (lesson) =>
                            lesson._id !== selectedLesson._id &&
                            lesson !== selectedLesson._id
                    ),
                    selectedLesson,
                ],
            }));
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to mark lesson as completed."
            );
        } finally {
            setCompleting(false);
        }
    };

    const handleAddComment = async () => {
        const text = commentText.trim();

        if (!text || !selectedLesson || submittingComment) return;

        try {
            setSubmittingComment(true);
            setCommentsError("");

            const data = await addLessonComment(
                selectedLesson._id,
                text
            );

            setComments((prev) => [
                data.comment,
                ...prev,
            ]);

            setCommentText("");
        } catch (error) {
            setCommentsError(
                error.response?.data?.message ||
                "Failed to add comment."
            );
        } finally {
            setSubmittingComment(false);
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

    if (error && lessons.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (lessons.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Alert severity="info">
                    No lessons are available for this course yet.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Course Learning
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Continue learning and track your progress.
                </Typography>

                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                        }}
                    >
                        <Typography variant="body2" fontWeight={600}>
                            Course Progress
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {progress.progressPercentage}%
                        </Typography>
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={progress.progressPercentage}
                        sx={{ height: 8, borderRadius: 4 }}
                    />
                </Box>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "280px 1fr",
                    },
                    gap: 3,
                }}
            >
                {/* Lessons Sidebar */}
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        height: "fit-content",
                    }}
                >
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        Course Lessons
                    </Typography>

                    <Stack spacing={1}>
                        {lessons.map((lesson, index) => {
                            const completed = isLessonCompleted(lesson._id);
                            const selected =
                                selectedLesson?._id === lesson._id;

                            return (
                                <Button
                                    key={lesson._id}
                                    onClick={() => setSelectedLesson(lesson)}
                                    variant={selected ? "contained" : "text"}
                                    sx={{
                                        justifyContent: "flex-start",
                                        textAlign: "left",
                                        py: 1.5,
                                        px: 1.5,
                                    }}
                                >
                                    <Box sx={{ width: "100%" }}>
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                        >
                                            {index + 1}. {lesson.title}
                                        </Typography>

                                        {completed && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: selected
                                                        ? "inherit"
                                                        : "success.main",
                                                }}
                                            >
                                                Completed
                                            </Typography>
                                        )}
                                    </Box>
                                </Button>
                            );
                        })}
                    </Stack>
                </Paper>

                {/* Lesson Content */}
                <Box>
                    {selectedLesson && (
                        <>
                            <Paper
                                variant="outlined"
                                sx={{
                                    overflow: "hidden",
                                }}
                            >
                                {/* Video */}
                                <Box
                                    sx={{
                                        width: "100%",
                                        aspectRatio: "16 / 9",
                                        backgroundColor: "#0F172A",
                                        overflow: "hidden",
                                    }}
                                >
                                    {selectedLesson.videoUrl ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={selectedLesson.videoUrl
                                                .replace("youtu.be/", "www.youtube.com/embed/")
                                                .replace("watch?v=", "embed/")
                                                .split("?")[0]}
                                            title={selectedLesson.title}
                                            style={{
                                                border: 0,
                                            }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography color="white">
                                                No video available for this lesson.
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                <Box sx={{ p: 3 }}>
                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        gutterBottom
                                    >
                                        {selectedLesson.title}
                                    </Typography>

                                    {selectedLesson.description && (
                                        <Typography
                                            color="text.secondary"
                                            sx={{
                                                lineHeight: 1.8,
                                                mb: 3,
                                            }}
                                        >
                                            {selectedLesson.description}
                                        </Typography>
                                    )}

                                    <Button
                                        variant={
                                            isLessonCompleted(selectedLesson._id)
                                                ? "outlined"
                                                : "contained"
                                        }
                                        disabled={
                                            completing ||
                                            isLessonCompleted(selectedLesson._id)
                                        }
                                        onClick={handleCompleteLesson}
                                    >
                                        {completing
                                            ? "Saving..."
                                            : isLessonCompleted(selectedLesson._id)
                                                ? "Lesson Completed"
                                                : "Mark as Complete"}
                                    </Button>
                                </Box>
                            </Paper>

                            {/* Comments */}
                            <Paper
                                variant="outlined"
                                sx={{
                                    mt: 3,
                                    p: 3,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{ mb: 2 }}
                                >
                                    Discussion
                                </Typography>

                                {user?.role === "student" && (
                                    <Box sx={{ mb: 3 }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={3}
                                            maxRows={6}
                                            inputProps={{ maxLength: 500 }}
                                            placeholder="Ask a question or share your thoughts..."
                                            value={commentText}
                                            onChange={(e) =>
                                                setCommentText(e.target.value)
                                            }
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
                                                onClick={handleAddComment}
                                                disabled={
                                                    !commentText.trim() ||
                                                    submittingComment
                                                }
                                            >
                                                {submittingComment
                                                    ? "Posting..."
                                                    : "Post Comment"}
                                            </Button>
                                        </Box>
                                    </Box>
                                )}

                                {commentsError && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {commentsError}
                                    </Alert>
                                )}

                                <Divider sx={{ mb: 2 }} />

                                {commentsLoading ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            py: 3,
                                        }}
                                    >
                                        <CircularProgress size={28} />
                                    </Box>
                                ) : comments.length === 0 ? (
                                    <Typography
                                        color="text.secondary"
                                        sx={{ py: 2 }}
                                    >
                                        No comments yet. Be the first to start the
                                        discussion.
                                    </Typography>
                                ) : (
                                    <Stack spacing={2}>
                                        {comments.map((comment) => (
                                            <Box key={comment._id}>
                                                <Typography
                                                    variant="subtitle2"
                                                    fontWeight={700}
                                                >
                                                    {comment.student?.name || "Student"}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        mt: 0.5,
                                                        lineHeight: 1.7,
                                                    }}
                                                >
                                                    {comment.text}
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ display: "block", mt: 0.5 }}
                                                >
                                                    {comment.createdAt
                                                        ? new Date(
                                                            comment.createdAt
                                                        ).toLocaleDateString()
                                                        : ""}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                )}
                            </Paper>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Learning;