const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get("/api/test", (req, res) => res.json({"test": "testResult"}));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));