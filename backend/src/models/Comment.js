import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
            required: true
        },

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        text: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 500
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;