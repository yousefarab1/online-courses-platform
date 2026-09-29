import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 10 }}>
                <Typography variant="h2" gutterBottom>
                    Learn skills that move you forward.
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ maxWidth: 600, mb: 4 }}
                >
                    Practical courses designed to help you build real-world
                    skills and grow your career.
                </Typography>

                <Button
                    component={Link}
                    to="/courses"
                    variant="contained"
                    size="large"
                >
                    Explore Courses
                </Button>
            </Box>
        </Container>
    );
};

export default Home;