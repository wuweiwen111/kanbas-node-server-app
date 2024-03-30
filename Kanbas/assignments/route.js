import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
  // retrieve:get
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignment = db.assignments.filter((m) => m.course === cid);
    res.send(assignment);
  });
  // delete
  app.delete("/api/courses/:cid/assignments/", (req, res) => {
    const { cid } = req.params;
    db.assignments = db.assignments.filter((a) => a.course !== cid);
    res.sendStatus(200);
  });
  // post: create
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });
  // update
  app.put("/api/courses/:cid/assignments/:aid", (req, res) => {
    const { cid, aid } = req.params;
    const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
    if (assignmentIndex !== -1) {
      db.assignments[assignmentIndex] = {
        ...db.assignments[assignmentIndex],
        ...req.body,
      };
      res.sendStatus(204);
    } else {
      res.status(404).send("Assignment not found");
    }
  });
}
