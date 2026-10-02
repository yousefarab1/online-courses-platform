import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { getCourses } from "../../services/courseService";
import CourseCard from "../../components/courses/CourseCard";

const Courses = () => {
    const [courses, setCourses] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [sort, setSort] = useState("newest");

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadCourses = async (
        currentPage = page,
        currentSearch = search
    ) => {
        try {
            setLoading(true);
            setError("");

            const data = await getCourses({
                search: currentSearch,
                category,
                level,
                sort,
                page: currentPage,
                limit: 9,
            });

            setCourses(data.courses || []);
            setPages(data.pages || 1);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load courses. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, [page, category, level, sort]);

    const handleSearch = (event) => {
        event.preventDefault();
        setPage(1);
        loadCourses(1, search);
    };

    const handleFilterChange = (setter) => (event) => {
        setter(event.target.value);
        setPage(1);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                    Explore Courses
                </Typography>

                <Typography color="text.secondary">
                    Learn practical skills from courses designed for real-world growth.
                </Typography>
            </Box>

            {/* Search + Filters */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    mb: 5,
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSearch}
                    sx={{
                        display: "flex",
                        gap: 1,
                        flex: 1,
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Search courses..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            minWidth: 50,
                            px: 2,
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </Box>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Category</InputLabel>

                    <Select
                        value={category}
                        label="Category"
                        onChange={handleFilterChange(setCategory)}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        <MenuItem value="Programming">Programming</MenuItem>
                        <MenuItem value="Web Development">Web Development</MenuItem>
                        <MenuItem value="Database">Database</MenuItem>
                        <MenuItem value="IoT">IoT</MenuItem>
                        <MenuItem value="AI">AI</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 130 }}>
                    <InputLabel>Level</InputLabel>

                    <Select
                        value={level}
                        label="Level"
                        onChange={handleFilterChange(setLevel)}
                    >
                        <MenuItem value="">All Levels</MenuItem>
                        <MenuItem value="beginner">Beginner</MenuItem>
                        <MenuItem value="intermediate">Intermediate</MenuItem>
                        <MenuItem value="advanced">Advanced</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Sort</InputLabel>

                    <Select
                        value={sort}
                        label="Sort"
                        onChange={handleFilterChange(setSort)}
                    >
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="oldest">Oldest</MenuItem>
                        <MenuItem value="price-asc">Price: Low to High</MenuItem>
                        <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Error */}
            {error && (
                <Alert severity="error" sx={{ mb: 4 }}>
                    {error}
                </Alert>
            )}

            {/* Loading */}
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
            ) : courses.length === 0 ? (
                /* Empty State */
                <Box
                    sx={{
                        textAlign: "center",
                        py: 10,
                    }}
                >
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        No courses found
                    </Typography>

                    <Typography color="text.secondary">
                        Try changing your search or filters.
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* Courses */}
                    <Grid container spacing={3}>
                        {courses.map((course) => (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4 }}
                                key={course._id}
                            >
                                <CourseCard course={course} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {pages > 1 && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 2,
                                mt: 5,
                            }}
                        >
                            <Button
                                variant="outlined"
                                disabled={page === 1}
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                Previous
                            </Button>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    px: 2,
                                }}
                            >
                                <Typography>
                                    Page {page} of {pages}
                                </Typography>
                            </Box>

                            <Button
                                variant="outlined"
                                disabled={page === pages}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Next
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default Courses;
