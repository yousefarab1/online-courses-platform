import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "none",
                transition: "0.2s ease",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                },
            }}
        >
            <Box
                sx={{
                    height: 160,
                    backgroundColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 3,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    color="white"
                    sx={{ textAlign: "center" }}
                >
                    {course.title}
                </Typography>
            </Box>

            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    {course.category && (
                        <Chip label={course.category} size="small" />
                    )}

                    {course.level && (
                        <Chip label={course.level} size="small" variant="outlined" />
                    )}
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {course.description}
                </Typography>

                <Box
                    sx={{
                        mt: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight={700}>
                        ${course.price}
                    </Typography>

                    <Button
                        component={Link}
                        to={`/courses/${course._id}`}
                        variant="contained"
                        size="small"
                    >
                        View Course
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
