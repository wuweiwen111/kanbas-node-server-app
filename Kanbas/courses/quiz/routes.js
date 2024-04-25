import * as dao from "./dao.js";
export default function QuizRoutes(app) {
  // find all quizzes
  // const findAllQuizzes = async (req, res) => {
  //   const quizzes = await dao.findAllQuizzes();
  //   res.json(quizzes);
  // };

  // find quiz by quiz id
  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    res.json(quiz);
  };

  // find quiz by type???
  // const findQuizzesByType = async (req, res) => {
  //   const { quizType } = req.params;
  //   const quizzes = await dao.findQuizByType(quizType);
  //   res.json(quizzes);
  // };
  const findQuestionByType = async (req, res) => {
    const { quizQuestionType } = req.query; // Use query parameters for filtering
    const { cid, qid } = req.params; // You can keep course ID if it's required to narrow the search to a particular course.
    const quizzes = await dao.findQuestionByType(quizQuestionType, cid, qid); // Adjust DAO if it needs to handle course ID
    res.json(quizzes);
  };

  // find all quizzes from course id
  const findQuizzesByCourse = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesByCourse(cid);
    res.json(quizzes);
  };

  // find all quizzes from authors??

  // delete
  // const deleteQuiz = async (req, res) => {
  //   const { cid } = req.params;
  //   const status = await dao.deleteQuiz(cid);
  //   // res.sendStatus(200);
  //   res.json(status);
  // };
  const deleteQuiz = async (req, res) => {
    const { cid,qid } = req.params;
    // const { quizId } = req.query;
    const status = await dao.deleteQuiz(qid);
    res.json(status);
  };

  // create
  const createQuiz = async (req, res) => {
    const { cid } = req.params;
    console.log("Received quiz data:", req.body); // Log the body to see what is received
    try {
      const newQuiz = await dao.createQuiz(cid, req.body);
      res.json(newQuiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res
        .status(500)
        .json({ message: "Failed to create quiz", error: error.message });
    }
  };

  // update
  const updateQuiz = async (req, res) => {
    const { cid, qid } = req.params;
    const status = await dao.updateQuiz(qid, req.body);
    res.json(status);
  };

  // add question
  app.post("/api/courses/:cid/quizzes/:qid/Questions", async (req, res) => {
    const { qid } = req.params; // Quiz ID
    const question = req.body; // Question data from request body

    try {
      const updatedQuiz = await dao.addQuestionToQuiz(qid, question);
      res.status(201).json(updatedQuiz); // Return the updated quiz document
    } catch (error) {
      res.status(500).json({ error: "Failed to add question" });
    }
  });

  // `${COURSES_API}/${courseId}/quizzes/${quizId}/Questions/NewQuestions`
  // fetch question
  app.get("/api/courses/:cid/quizzes/:qid/Questions", async (req, res) => {
    const { qid } = req.params; // Quiz ID
    try {
      const quiz = await dao.findQuestionByQuizId(qid); // Assuming this function correctly fetches the quiz with its questions
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz.questions); // Send back only the questions part of the quiz
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  // app.get("/api/courses/:cid/quizzes", findAllQuizzes);
  app.get("/api/courses/:cid/quizzes/:qid", findQuizById);
  app.get("/api/courses/:cid/quizzes/:qid/Questions", findQuestionByType);
  app.get("/api/courses/:cid/quizzes", findQuizzesByCourse);
  app.delete("/api/courses/:cid/quizzes/:qid", deleteQuiz);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.put("/api/courses/:cid/quizzes/:qid", updateQuiz);
}
