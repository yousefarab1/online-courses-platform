import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 150
        },

        description: {
            type: String,
            trim: true
        },

        videoUrl: {
            type: String,
            trim: true
        },

        order: {
            type: Number,
            required: true,
            min: 1
        },

        duration: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

lessonSchema.index(
    { course: 1, order: 1 },
    { unique: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;