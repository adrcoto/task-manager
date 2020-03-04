const express = require('express');
const router = new express.Router();
const User = require('../models/user');

/**
 * Create user
 */
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    /* user.save().then(() => {
         res.status(201).send(user);
     }).catch((err) => {
         console.log('Error!', err.message);
         res.status(400).send(err);
     });*/

    /**
     * Refactoring using async-await
     */

    try {
        await user.save();

        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }

});

/**
 * Get all users
 */
router.get('/users', async (req, res) => {

    /* User.find({}).then((users) => {
         res.send(users);
     }).catch((err) => {
         res.status(500).send();
     });*/

    /**
     * Refactoring using async-await
     */

    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }

});

/**
 * Get one user by id
 */
router.get('/users/:id', async (req, res) => {

   /* const _id = req.params.id;
    User.findById({ _id }).then((user) => {
         if (!user) {
             return res.status(404).send();
         }
         res.send(user);
     }).catch((err) => {
         res.status(500).send(err);
     });*/

    /**
     * Refactoring using async-await
     */

    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).send();

        res.send(user);
    } catch (error) {
        res.status().send(error);
    }
});

/**
 * Update user
 */
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates' });

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        //user not found
        if (!user)
            return res.status(404).send();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * Delete one user by id
 */
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user)
            return res.status(404).send();

        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});


module.exports = router;