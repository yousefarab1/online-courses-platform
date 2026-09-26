import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Course title is required"],
            trim: true,
            minlength: 3,
            maxlength: 100
        },

        description: {
            type: String,
            required: [true, "Course description is required"],
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        level: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner"
        },

        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;