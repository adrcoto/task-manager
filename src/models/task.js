const mongoose = require('mongoose');

/**
 * Defining task schema
 */
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

/**
 * Applying Task schema
 * @type {function(*=, *=, *=): (Model|undefined)}
 */
const Task = mongoose.model('Task', taskSchema);


module.exports = Task;