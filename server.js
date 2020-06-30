const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');

const port = process.env.PORT || 5000;

const todos = require('./routes/api/todos.js');
const login = require('./routes/login');
const register = require('./routes/register');

app.use(express.json());

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

//Connexion MongoDB et creation du schema et du model des todos
mongoose.connect(
    "mongodb+srv://kevin:" +
    process.env.MONGO_PW +
    "@cluster0-chbwl.mongodb.net/DB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
)
    .then(_ => console.log("Connection to Mongo successful"))
    .catch(err => console.log("Connection to Mongo failed: " + err));

//Fin connection Mongo

//Routes
app.use("/api/todos", todos);
app.use("/login", login);
app.use("/register", register);
//Fin Routes

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}