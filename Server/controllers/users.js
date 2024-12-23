const model = require("../model/users");
const express = require("express");
const app = express.Router();

app
  .get("/", (req, res, next) => {
    model
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/withInfos", (req, res, next) => {
    model
      .getAllWithInfos()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/names", async (req, res, next) => {
    model
      .getUserNames()
      .then((x) => res.send(x))
      .catch(next);
  })

  .get("/search", async (req, res, next) => {
    const query = req.query.q;
    model
      .searchUser(query)
      .then((x) => res.send(x))
      .catch(next);
  })

  .get("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .get(+id)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    model
      .add(req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .patch("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .update(+id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .remove(+id)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/seed", (req, res, next) => {
    model
      .seed()
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const response = await model.login(email, password);
      res.status(response.isSuccess ? 200 : 401).send(response);
    } catch (error) {
      next(error);
    }
  })

  .post("/logout", async (req, res, next) => {
    try {
      const response = await model.logout();
      res.status(response.isSuccess ? 200 : 401).send(response);
    } catch (error) {
      next(error);
    }
  })

  .get("/:id/infos", (req, res, next) => {
    const id = req.params.id;
    model
      .getInfos(+id)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/signup", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const response = await model.signingUp(email, password);
      res.status(response.isSuccess ? 200 : 401).send(response);
    } catch (error) {
      next(error);
    }
  })

  //
  .get("/:email/logingInByEmail", async (req, res, next) => {
    const email = req.params.email;
    try {
      const response = await model.getByLogin(email);
      res.status(response.isSuccess ? 200 : 401).send(response);
    } catch (error) {
      next(error);
    }
  });
module.exports = app;
