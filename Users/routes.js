import * as dao from "./dao.js";
let globalCurrentUser = null; // delete this in A6 4.4

export default function UserRoutes(app) {
  // create user
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  // delete user
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  // find all users
  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
    return;
  };
  const findUserById = async (req, res) => {
    const userId = req.params.userId;
    const user = await dao.findUserById(userId);
    res.send(user);
  };
  // update user
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    let currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };
  // sign in
  const signin = async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);
    const currentUser = await dao.findUserByCredentials(username, password);
    // console.log("signin set", currentUser);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      globalCurrentUser = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).send("Invalid credentials");
    }
  };

  // sign out
  const signout = (req, res) => {
    req.session.destroy();
    currentUser = null;
    res.send("Signed out");
  };
  // profile
  const profile = async (req, res) => {
    let currentUser = req.session["currentUser"];
    currentUser = globalCurrentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    // res.send(req.session.currentUser);
    res.json(currentUser);
  };

  // sign up a new user
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    // sign up before
    if (user) {
      res.status(404).json({ message: "Username Already Taken!" });
    }
    // no sign up before
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    globalCurrentUser = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users", createUser); // create user
  app.get("/api/users", findAllUsers); // get all users
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser); // update user
  app.delete("/api/users/:userId", deleteUser); // delete
  app.post("/api/users/signin", signin); // sign in
  app.post("/api/users/signout", signout); // sign out
  app.post("/api/users/profile", profile); // profile
  // app.get("/api/users/profile", profile); // profile

  // register
  app.post("/api/users", createUser); // create user
  app.post("/api/users/signup", signup); // sign up
}
