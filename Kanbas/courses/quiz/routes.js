// import db from "../../Database/index.js";
import * as dao from "./dao.js";
export default function QuizRoutes(app) {
  // find all quizzes
  const findAllQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  };

  // find quiz by quiz id
  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    res.json(quiz);
  };

  // find quiz by type???
  const findQuizzesByType = async (req, res) => {
    const { quizType } = req.params;
    const quizzes = await dao.findQuizByType(quizType);
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
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
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

  app.get("/api/courses/:cid/quizzes", findAllQuizzes);
  app.get("/api/courses/:cid/quizzes/:qid", findQuizById);
  app.get("/api/courses/:cid/quizzes/:qid/:quizType", findQuizzesByType); // ???
  app.get("/api/courses/:cid/quizzes", findQuizzesByCourse);
  app.delete("/api/courses/:cid/quizzes/:qid", deleteQuiz);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.put("/api/quizzes/:cid/quizzes/:qid", updateQuiz);
}
