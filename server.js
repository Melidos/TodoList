const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;

app.get("/api/test", (req, res) => res.json({"test": "testResult"}));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));