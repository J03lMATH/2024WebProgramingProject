const model = require("../model/hashtags");
const express = require("express");
const app = express.Router();

app
  .get("/", (req, res, next) => {
    model
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/add/:id", (req, res, next) => {
    const infoId = +req.params.id;
    model
      .add(infoId, req.body)
      .then((x) => res.send(x))
      .catch(next);
  });

module.exports = app;
