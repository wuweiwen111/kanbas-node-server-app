// const express = require("express");
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/route.js";
import AssignmentRoutes from "./Kanbas/assignments/route.js";
const app = express();
// app.get("/hello", (req, res) => {
//   res.send("Life is good!");
// });
// app.get("/", (req, res) => {
//   res.send("Welcome to Full Stack Development!");
// });
app.use(cors());
app.use(express.json());
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);
