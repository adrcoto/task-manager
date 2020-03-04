const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

/**
 * Create task
 */
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    /*task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err);
    });*/

    /**
     * Refactoring using async-await
     */
    try {
        await task.save();

        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(task);
    }
});

/**
 * Get all tasks
 */
router.get('/tasks', async (req, res) => {
    try {
        const users = await Task.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Get one task by id
 */
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
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
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates' });

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!task)
            return res.status(404).send();

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * Delete one task by id
 */
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task)
            return res.status(404).send();

        res.send(task);

    } catch (error) {
        res.status(500).send();
    }
});


module.exports = router;