const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const todos = await Todo.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Todo.countDocuments();

    res.json({
      todos,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error in GET /api/todos:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error in POST /api/todos:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error('Error in PUT /api/todos/:id:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 