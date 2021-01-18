const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");
const { StatusCodes } = require("http-status-codes");

// on sessions form submit (log in)
sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "oops the db had a problem" });
    } else if (!foundUser) {
      res.status(401).send({ error: "Sorry no user found" });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.status(200).send(foundUser);
      } else {
        res.status(401).send({ error: "Password doesn't match"});
      }
    }
  });
});


sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie(this.cookie, { path: '/' });
    res.status(StatusCodes.OK).send({ msg: "Logging out"});
  });
});

module.exports = sessions;
