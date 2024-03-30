// console.log("Hello World!");
export default function Hello(app) {
  // from App.js
  app.get("/hello", (req, res) => {
    res.send("Life is good!");
  });
  app.get("/", (req, res) => {
    res.send("Welcome to Full Stack Development!");
  });
}
