import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import lessonRoutes from "./routes/lesson.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

import statsRoutes from "./routes/stats.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Online Course Platform API is running"
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/lessons", lessonRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/stats", statsRoutes);

app.use(errorHandler);

export default app;