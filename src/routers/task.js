const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middelware/auth');

/**
 * Create task
 */
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();

        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(task);
    }
});

/**
 * Get all owned tasks
 */
router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({owner: req.user._id});
        await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Get one task by id
 */
router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task)
            return res.status(404).send();

        res.send(task);
    } catch (error) {
        res.status().send(error);
    }
});

/**
 * Update task
 */
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates' });

    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        //task not found
        if (!task)
            return res.status(404).send();

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * Delete one task by id
 */
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task)
            return res.status(404).send();

        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});


module.exports = router;