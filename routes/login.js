const express = require('express');
const router = express.Router();

// @route   GET api/todos
// @desc    Get all todos
router.get("/", (req, res) => {
    res.status(200).send("Login Page");
});

// @route   POST api/todos
// @desc    Create a new todo
router.post("/", (req, res) => {
    
});

module.exports = router;