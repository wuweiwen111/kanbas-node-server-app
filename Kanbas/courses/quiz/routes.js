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
  const findQuizzesByType = async (req, res) => {
    const { quizType } = req.query; // Use query parameters for filtering
    const { cid } = req.params; // You can keep course ID if it's required to narrow the search to a particular course.
    const quizzes = await dao.findQuizByType(quizType, cid); // Adjust DAO if it needs to handle course ID
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
  const deleteQuiz = async (req, res) => {
    const { cid } = req.params;
    const status = await dao.deleteQuiz(cid);
    // res.sendStatus(200);
    res.json(status);
  };

  // create
  const createQuiz = async (req, res) => {
    const newQuiz = await dao.createQuiz(req.body);
    res.json(newQuiz);
  };

  // update
  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
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
  app.get("/api/courses/:cid/quizzes/type", findQuizzesByType); // ???
  app.get("/api/courses/:cid/quizzes", findQuizzesByCourse);
  app.delete("/api/courses/:cid/quizzes", deleteQuiz);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.put("/api/quizzes/:cid/quizzes/:qid", updateQuiz);
}
