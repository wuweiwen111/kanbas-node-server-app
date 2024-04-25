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
  questionType: {
    type: String,
    enum: ["Multiple Choice", "True/False", "Fill in Multiple Blanks"],
    required: true, // Ensure this field must be specified
  },
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
      enum: ["gradedQuiz", "practiceQuiz", "gradedSurvey", "ungradedSurvey"],
      default: "gradedQuiz",
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
    dueDate: String,
    availableDate: String,
    untilDate: String,
    isPublished: Boolean,
    questions: [questionSchema],
    numberOfQuestion: Number,
    // quizQuestionType: {
    //   type: String,
    //   enum: ["Multiple Choice", "True/False", "Fill in Multiple Blanks"],
    //   default: "Multiple Choice",
    // },
  },
  { collection: "quizzes" }
);

export default schema;
