import db from "../../Database/index.js";

export default function QuizRoutes(app) {
  // retrieve all quiz from this course
  app.get("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const quizzes = db.quizzes.filter((m) => m.course === cid);
    res.send(quizzes);
  });
  // delete
  app.delete("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    db.quiz = db.quiz.filter((m) => m.course !== cid);
    res.sendStatus(200);
  });

  // post: create
  app.post("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const newQuiz = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.quiz.push(newQuiz);
    res.send(newQuiz);
  });

  // update
  app.put("/api/quizzes/:cid/quizzes/:qid", (req, res) => {
    const { cid, qid } = req.params;
    const quizIndex = db.quiz.findIndex((m) => m._id === qid);
    db.quiz[quizIndex] = {
      ...db.quiz[quizIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });
}
