export const errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID";
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");
    }

    // Duplicate key
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];

        message = `${field} already exists`;
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};