const express = require("express");
const app = express(); // Create an express app

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello New Paltz!\n");
});

app.listen(PORT, () => {
  console.log("sERVER IS RUNNING AT HTTP://localhost:" + PORT);
});
