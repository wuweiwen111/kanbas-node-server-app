// import mongoose from "mongoose";
// const schema = new mongoose.Schema(
//   {
//     _id: String,
//     title: String,
//     course: String,
//     description: String,
//     quizType: {
//       type: String,
//       enum: [
//         "Graded Quiz",
//         "Practice Quiz",
//         "Graded Survery",
//         "Ungraded Survey",
//       ],
//       default: "Graded Quiz",
//     },
//     points: Number,
//     assignmentGroup: {
//       type: String,
//       enum: ["QUIZZES", "ASSIGNMENTS", "EXAMS", "PROJECT"],
//       default: "QUIZZES",
//     },
//     shuffleAnswers: Boolean,
//     timeLimit: String,
//     multipleAttempts: Boolean,
//     showCorrectAnswers: String,
//     accesscode: String,
//     oneQuestionAtATime: Boolean,
//     webcamRequired: Boolean,
//     lockQuestionsAfterAnswering: Boolean,
//     dueDate: Date,
//     availableDate: Date,
//     untilDate: Date,
//     published: Boolean,
//     quizQuestionType: {
//       type: String,
//       enum: ["Multiple Choice", "True/False", "Fill in Multiple Blanks"],
//       default: "Multiple Choice",
//     },
//   },
//   { collection: "quizzes" }
// );
// export default schema;

import mongoose from "mongoose";

// Define a question subschema
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  choices: [
    {
      text: String,
      isCorrect: Boolean,
    },
  ],
  explanation: String, // Optional explanation for the answer
  points: { type: Number, default: 1 }, // Assign points per question
});

// Main quiz schema
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: String,
    quizType: {
      type: String,
      enum: [
        "Graded Quiz",
        "Practice Quiz",
        "Graded Survey",
        "Ungraded Survey",
      ],
      default: "Graded Quiz",
    },
    points: Number,
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "ASSIGNMENTS", "EXAMS", "PROJECTS"],
      default: "QUIZZES",
    },
    shuffleAnswers: Boolean,
    timeLimit: String,
    multipleAttempts: Boolean,
    showCorrectAnswers: String,
    accesscode: String,
    oneQuestionAtATime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    published: Boolean,
    questions: [questionSchema], // Add questions as a subdocument array
    quizQuestionType: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in Multiple Blanks"],
      default: "Multiple Choice",
    },
  },
  { collection: "quizzes" }
);

export default schema;
