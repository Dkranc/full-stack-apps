const express = require('express')
const router = express.Router()

const Todo = require('../models/Todo');

router.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

router.post('/todos/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});

router.delete('/todos/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

router.put('/todos/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
});

module.exports = router