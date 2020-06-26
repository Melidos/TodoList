const express = require('express');
const router = express.Router();

const Todo = require('../../models/Todo');

// @route   GET api/todos
// @desc    Get all todos
router.get("/", (req, res) => {
    Todo.find({})
        .sort({ date: -1})
        .then(todos => res.json(todos))
});

// @route   POST api/todos
// @desc    Create a new todo
router.post("/", (req, res) => {
    const newTodo = new Todo({
        name: req.body.name
    });

    newTodo.save()
        .then(todo => res.json(todo))
        .catch(err => console.log("Couldn't save new todo to Mongo: " + err));
});

// @route   DELETE api/todos
// @desc    Delate a todo
router.delete("/:id", (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => todo.remove()
            .then(_ => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

// @route   PUT api/todos
// @desc    Update a todo
router.put("/:id", (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => todo.updateOne({completed: !todo.completed})
            .then(_ => res.status(200).json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;