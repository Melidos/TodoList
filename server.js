require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;

const todos = require("./routes/api/todos.js");
const login = require("./routes/api/login.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(port);

//Connexion MongoDB et creation du schema et du model des todos
mongoose
  .connect(
    "mongodb+srv://kevin:" +
      process.env.MONGO_PW +
      "@cluster0-chbwl.mongodb.net/DB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .catch((err) => console.error("Connection to Mongo failed: " + err));

//Fin connection Mongo

//Routes
app.use("/api/todos", todos);
app.use("/api/login", login);
//Fin Routes

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
