const model = require("../model/users.json");
const express = require("express");
const app = express.Router();
app
  .get("/", (req, res) => {
    res.send(model.items);
  })
  .get("/:id", (req, res) => {
    const id = req.params.id;
    const user = model.get(id);
    res.send(user);
  })
  .post("/", (req, res) => {
    const user = model.add(req.body);
    res.send(user);
  })
  .patch("/:id", (req, res) => {
    const id = req.params.id;
    const user = model.update(id, req.body);
    res.send(user);
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    const ret = model.remove(id);
  });
module.exports = app;
