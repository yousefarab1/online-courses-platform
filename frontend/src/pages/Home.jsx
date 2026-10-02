import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Stack,
    Typography,
    Paper,
    Divider,
    CircularProgress,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MemoryIcon from "@mui/icons-material/Memory";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { getPublicStats } from "../services/adminService";

const categories = [
    {
        title: "Web Development",
        description: "Build modern websites and full-stack applications.",
        icon: <CodeIcon />,
    },
    {
        title: "Programming",
        description: "Improve your coding and problem-solving skills.",
        icon: <SchoolIcon />,
    },
    {
        title: "Databases",
        description: "Learn how to design and work with modern databases.",
        icon: <StorageIcon />,
    },
    {
        title: "Artificial Intelligence",
        description: "Explore AI concepts and intelligent applications.",
        icon: <PsychologyIcon />,
    },
    {
        title: "IoT",
        description: "Build connected devices and smart solutions.",
        icon: <MemoryIcon />,
    },
];

const Home = () => {
    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getPublicStats();
                setStats(data.stats);
            } catch (error) {
                console.error("Failed to load public stats:", error);
            } finally {
                setStatsLoading(false);
            }
        };

        loadStats();
    }, []);

    return (
        <Box>
            {/* ================= HERO ================= */}
            <Box
                sx={{
                    minHeight: { xs: "auto", md: "650px" },
                    display: "flex",
                    alignItems: "center",
                    py: { xs: 8, md: 12 },
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={{ xs: 6, md: 10 }}
                        alignItems="center"
                    >
                        {/* Hero Content */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Stack spacing={3}>
                                <Box
                                    sx={{
                                        width: "fit-content",
                                        px: 2,
                                        py: 0.8,
                                        borderRadius: 5,
                                        bgcolor: "action.hover",
                                        border: 1,
                                        borderColor: "divider",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        fontWeight={700}
                                        color="primary.main"
                                    >
                                        Learn. Build. Grow.
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: {
                                            xs: "2.8rem",
                                            sm: "3.6rem",
                                            md: "4.7rem",
                                        },
                                        lineHeight: 1.08,
                                        letterSpacing: "-0.04em",
                                        maxWidth: 720,
                                    }}
                                >
                                    Turn knowledge into{" "}
                                    <Box
                                        component="span"
                                        color="primary.main"
                                    >
                                        real skills.
                                    </Box>
                                </Typography>

                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{
                                        maxWidth: 620,
                                        lineHeight: 1.7,
                                        fontWeight: 400,
                                    }}
                                >
                                    Learn practical skills through structured
                                    courses, real lessons, progress tracking,
                                    and an active learning community.
                                </Typography>

                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "row",
                                    }}
                                    spacing={2}
                                    sx={{ pt: 1 }}
                                >
                                    <Button
                                        component={Link}
                                        to="/courses"
                                        variant="contained"
                                        size="large"
                                        endIcon={<ArrowForwardIcon />}
                                    >
                                        Explore Courses
                                    </Button>

                                    <Button
                                        component={Link}
                                        to="/register"
                                        variant="outlined"
                                        size="large"
                                    >
                                        Create Account
                                    </Button>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={3}
                                    sx={{ pt: 2 }}
                                >
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Learn
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            At your own pace
                                        </Typography>
                                    </Box>

                                    <Divider orientation="vertical" flexItem />

                                    <Box>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Practice
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Real-world skills
                                        </Typography>
                                    </Box>

                                    <Divider orientation="vertical" flexItem />

                                    <Box>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Grow
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Build your future
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Grid>

                        {/* Hero Card */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        width: "100%",
                                        maxWidth: 420,
                                        p: { xs: 2, sm: 3 },
                                        borderRadius: 4,
                                        border: 1,
                                        borderColor: "divider",
                                        bgcolor: "background.paper",
                                    }}
                                >
                                    <Stack spacing={2.5}>
                                        <Box
                                            sx={{
                                                height: 250,
                                                borderRadius: 3,
                                                bgcolor: "action.hover",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                border: 1,
                                                borderColor: "divider",
                                            }}
                                        >
                                            <SchoolIcon
                                                sx={{
                                                    fontSize: 110,
                                                    color: "primary.main",
                                                }}
                                            />
                                        </Box>

                                        <Stack spacing={0.8}>
                                            <Typography
                                                variant="h5"
                                                fontWeight={700}
                                            >
                                                Your Learning Journey
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                                sx={{ lineHeight: 1.6 }}
                                            >
                                                Discover courses, learn new
                                                skills, track your progress,
                                                and keep moving forward.
                                            </Typography>
                                        </Stack>

                                        <Divider />

                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Box
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    borderRadius: 2,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    bgcolor: "action.hover",
                                                    color: "primary.main",
                                                }}
                                            >
                                                <TrendingUpIcon />
                                            </Box>

                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Learning progress
                                                </Typography>

                                                <Typography fontWeight={700}>
                                                    Learn. Practice. Improve.
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ================= STATS ================= */}
            <Box
                sx={{
                    borderTop: 1,
                    borderBottom: 1,
                    borderColor: "divider",
                    bgcolor: "background.paper",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <Stat
                                icon={<MenuBookIcon />}
                                value={
                                    statsLoading ? (
                                        <CircularProgress size={22} />
                                    ) : (
                                        `${stats?.totalCourses || 0}+`
                                    )
                                }
                                label="Courses"
                            />
                        </Grid>

                        <Grid size={{ xs: 6, md: 3 }}>
                            <Stat
                                icon={<PeopleIcon />}
                                value={
                                    statsLoading ? (
                                        <CircularProgress size={22} />
                                    ) : (
                                        `${stats?.totalStudents || 0}+`
                                    )
                                }
                                label="Students"
                            />
                        </Grid>

                        <Grid size={{ xs: 6, md: 3 }}>
                            <Stat
                                icon={<SchoolIcon />}
                                value={
                                    statsLoading ? (
                                        <CircularProgress size={22} />
                                    ) : (
                                        `${stats?.totalInstructors || 0}+`
                                    )
                                }
                                label="Instructors"
                            />
                        </Grid>

                        <Grid size={{ xs: 6, md: 3 }}>
                            <Stat
                                icon={<TrendingUpIcon />}
                                value={
                                    statsLoading ? (
                                        <CircularProgress size={22} />
                                    ) : (
                                        stats?.totalEnrollments || 0
                                    )
                                }
                                label="Enrollments"
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ================= CATEGORIES ================= */}
            <Container
                maxWidth="lg"
                sx={{ py: { xs: 8, md: 11 } }}
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "flex-end" }}
                    spacing={2}
                    sx={{ mb: 5 }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            sx={{ mb: 1 }}
                        >
                            Explore Categories
                        </Typography>

                        <Typography color="text.secondary">
                            Choose an area and start building useful skills.
                        </Typography>
                    </Box>

                    <Button
                        component={Link}
                        to="/courses"
                        endIcon={<ArrowForwardIcon />}
                    >
                        View All Courses
                    </Button>
                </Stack>

                <Grid container spacing={3}>
                    {categories.map((category) => (
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                            }}
                            key={category.title}
                        >
                            <Card
                                sx={{
                                    height: "100%",
                                    transition:
                                        "transform 0.2s ease, border-color 0.2s ease",
                                    border: 1,
                                    borderColor: "divider",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        borderColor: "primary.main",
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 3.5 }}>
                                    <Stack spacing={2}>
                                        <Box
                                            sx={{
                                                width: 52,
                                                height: 52,
                                                borderRadius: 2,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                bgcolor: "action.hover",
                                                color: "primary.main",
                                            }}
                                        >
                                            {category.icon}
                                        </Box>

                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            {category.title}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                            sx={{
                                                lineHeight: 1.7,
                                                minHeight: 48,
                                            }}
                                        >
                                            {category.description}
                                        </Typography>

                                        <Button
                                            component={Link}
                                            to="/courses"
                                            endIcon={
                                                <ArrowForwardIcon />
                                            }
                                            sx={{
                                                width: "fit-content",
                                                px: 0,
                                            }}
                                        >
                                            Explore
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* ================= WHY US ================= */}
            <Box
                sx={{
                    py: { xs: 8, md: 11 },
                    bgcolor: "action.hover",
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={{ xs: 5, md: 8 }}
                        alignItems="center"
                    >
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Stack spacing={2.5}>
                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    sx={{ lineHeight: 1.2 }}
                                >
                                    More than just watching lessons.
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8,
                                        maxWidth: 500,
                                    }}
                                >
                                    Learn through structured courses, follow
                                    your progress, discuss lessons, and build
                                    knowledge that you can actually use.
                                </Typography>

                                <Button
                                    component={Link}
                                    to="/courses"
                                    variant="contained"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ width: "fit-content" }}
                                >
                                    Start Learning
                                </Button>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, md: 7 }}>
                            <Grid container spacing={2.5}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FeatureCard
                                        icon={<SchoolIcon />}
                                        title="Practical Learning"
                                        text="Focus on skills that can be applied to real projects."
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FeatureCard
                                        icon={<TrendingUpIcon />}
                                        title="Track Progress"
                                        text="Monitor your progress lesson by lesson."
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FeatureCard
                                        icon={<PeopleIcon />}
                                        title="Learn Together"
                                        text="Discuss lessons and interact with other learners."
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FeatureCard
                                        icon={<MenuBookIcon />}
                                        title="Structured Courses"
                                        text="Follow organized lessons from start to finish."
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ================= CTA ================= */}
            <Container
                maxWidth="lg"
                sx={{ py: { xs: 8, md: 11 } }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, sm: 6, md: 8 },
                        borderRadius: 4,
                        border: 1,
                        borderColor: "divider",
                        textAlign: "center",
                    }}
                >
                    <Stack
                        spacing={2.5}
                        alignItems="center"
                    >
                        <Typography
                            variant="h3"
                            fontWeight={700}
                            sx={{
                                fontSize: {
                                    xs: "2rem",
                                    md: "3rem",
                                },
                                lineHeight: 1.2,
                            }}
                        >
                            Ready to start learning?
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                maxWidth: 600,
                                lineHeight: 1.7,
                            }}
                        >
                            Explore the available courses and start building
                            skills that can move you forward.
                        </Typography>

                        <Button
                            component={Link}
                            to="/courses"
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                        >
                            Explore Courses
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

const Stat = ({ icon, value, label }) => {
    return (
        <Box
            sx={{
                py: { xs: 2.5, md: 3.5 },
                px: 2,
                textAlign: "center",
                borderRight: {
                    xs: 0,
                    md: 1,
                },
                borderBottom: {
                    xs: 1,
                    md: 0,
                },
                borderColor: "divider",
            }}
        >
            <Box
                sx={{
                    width: 42,
                    height: 42,
                    mx: "auto",
                    mb: 1,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "action.hover",
                    color: "primary.main",
                }}
            >
                {icon}
            </Box>

            <Typography
                variant="h5"
                fontWeight={700}
            >
                {value}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
            >
                {label}
            </Typography>
        </Box>
    );
};

const FeatureCard = ({ icon, title, text }) => {
    return (
        <Card
            sx={{
                height: "100%",
                border: 1,
                borderColor: "divider",
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                    <Box
                        sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "background.paper",
                            color: "primary.main",
                        }}
                    >
                        {icon}
                    </Box>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                    >
                        {text}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Home;
