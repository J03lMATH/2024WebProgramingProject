const users = require("../model/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const header = req.header("authrization");

  if (!header) {
    return res.status(401).send("Access Denied");
  }

  const token = header.replace("Bearer ", "");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (ex) {
    res.status(400).send({ error: "Invalid Token" });
  }
};
