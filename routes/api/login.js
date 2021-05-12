const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../../models/User");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// @route   POST api/login/login
// @desc    Login user
// @params  username: string
//          password: string
router.post("/login", (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;

  User.findOne({ mail })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign({ mail }, process.env.SECRET, {
              expiresIn: "24h",
            });

            res
              .cookie("authToken", token, { httpOnly: true })
              .status(200)
              .send(user);
          } else {
            res.status(403).send("Password incorrect");
          }
        })
        .catch((err) =>
          res.status(400).send("Coulnd't check passwords: " + err)
        );
    })
    .catch((err) => res.status(400).send(mail + " doesn't exists"));
});

// @route   POST api/login/register
// @desc    Create a new user
router.post("/register", (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;

  User.findOne({ mail })
    .then((user) =>
      res.status(403).send("User " + user.mail + " already exists")
    )
    .catch((_) =>
      bcrypt
        .hash(req.body.password, 10)
        .then((password) => {
          const user = new User({ mail: req.body.mail, password })
            .save()
            .then((user) =>
              res.status(200).send("Registration succesfull " + user.mail)
            );
        })
        .catch((err) => res.status(400).send("Registration failed: " + err))
    );
});

router.get("/isLoggedIn", (req, res) => {
  const authToken = req.cookies["authToken"];
  if (authToken) {
    //res.status(200).send(authToken);
    res.status(200).send(jwt.decode(authToken, process.env.SECRET)["mail"]);
  } else {
    res.status(200).send(null);
  }
});

router.get("/disconnect", (req, res) => {
  res.cookie("authToken", "", { maxAge: 0 }).status(200).send();
});

module.exports = router;
