import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    startDate: Date,
    endDate: Date,
    description: String,
    quizType: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in Multiple Blanks"],
      default: "Multiple Choice",
    },
  },
  { collection: "choices" }
);
export default schema;
