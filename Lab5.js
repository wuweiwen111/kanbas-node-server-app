const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const module = {
  id: "New ID",
  name: "New Name",
  description: "New Description",
  course: "New Course",
};

// object
const todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

const Lab5 = (app) => {
  // 1
  app.get("/a5/welcome", (req, res) => {
    res.send("Welcome to Assignment 5");
  });

  // 2
  app.get("/a5/add/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(`${a} + ${b} = ${sum.toString()}`);
  });

  // 3
  app.get("/a5/substract/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) - parseInt(b);
    res.send(`${a} - ${b} = ${sum.toString()}`);
  });

  // 4
  app.get("/a5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":
        result = parseInt(a) / parseInt(b);
        break;
      default:
        result = "invalid operation";
    }
    res.send(result.toString());
  });

  // assignment1
  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });

  // assignment2
  app.get("/a5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  // assignment3
  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  // assignment:score
  app.get("/a5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore, 10);
    res.json(assignment);
  });

  // assignment: completed
  app.get("/a5/assignment/completed/:status", (req, res) => {
    const { status } = req.params;
    assignment.completed = status;
    res.json(assignment);
  });

  // module1
  app.get("/a5/module", (req, res) => {
    res.json(module);
  });
  // module2
  app.get("/a5/module/name", (req, res) => {
    res.json(module.name);
  });

  // module3
  app.get("/a5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });

  // module: des
  app.get("/a5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  });
  // post todos: create
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });
  // new todos: put
  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });

  // todos: create
  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });
  // todos
  app.get("/a5/todos", (req, res) => {
    res.json(todos);
  });
  // todos: params ID
  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((eachTodo) => eachTodo.id === parseInt(id));
    res.json(todo);
  });

  // todos: params completed
  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completeBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completeBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });
  // new: todos: delete
  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
  });

  // old: todos: delete
  app.get("/a5/todos/:id/delete", (req, res) => {
    const { id } = req.params; // string
    const todo = todos.find((t) => t.id === parseInt(id));
    const todoIndex = todos.indexOf(todo); // find its index
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
    }
    res.json(todos);
  });

  // todos: update
  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });

  // todos: completed
  app.get("/a5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
    }
    res.json(todos);
  });

  // todos: description
  app.get("/a5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
    }
    res.json(todos);
  });
};
export default Lab5;
