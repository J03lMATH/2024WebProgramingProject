const express = require("express");
const app = express();
const userController = require("./controllers/users");
const infoController = require("./controllers/infos");
const exerciseTypeController = require("./controllers/exerciseType");
const hashtagController = require("./controllers/hashtags");

const PORT = 3000;

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
app.use(express.static(__dirname + "/dist"));

//Controllers
app
  .get("/", (req, res, next) => {
    res.send("Hello World");
  })
  .get("/about", (req, res, next) => {
    res.send("About Us");
  })
  .use("/api/v1/users", userController)
  .use("/api/v1/infos", infoController)
  .use("/api/v1/exerciseType", exerciseTypeController)
  .use("/api/v1/hashtags", hashtagController)

  .get("*", (req, res, next) => {
    res.sendFile(__dirname + "/dist/index.html");
  });

//Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

console.log("Step #1");
app.listen(PORT, (err, data) => {
  console.log("Step #2");
  console.log("Server is running at http://localhost:" + PORT);
});
console.log("Step #3");
