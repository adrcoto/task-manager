const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');

/**
 * Defining the user schema
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email is invalid');
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [7, 'Password must contain at least 7 characters.'],
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('Password cannot contain \'password\'');
        }
    },
    age: {
        type: Number,
        default: 0,
        min: [18, 'You have to be an adult']
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

/**
 * Adds reference to Task model
 */
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

/**
 * Hide user fields
 */
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.__v;
    delete userObject.avatar;

    return userObject;
};

/**
 * Generates jwt token
 * @returns {Promise<undefined|*>}
 */
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, 'omoshiroi');

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
};

/**
 *  Get user to login
 * @param email
 * @param password
 * @returns {Promise<*>}
 */
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

/**
 * Middleware to hash pasword before saving an user -> works for update too
 */
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

/**
 * Delete user tasks when user is removed
 */
userSchema.pre('remove', async function (next) {
    await Task.deleteMany({ owner: this._id });
    next();
});

/**
 * Applying User schema
 * @type {function(Object, *=, *=): void}
 */
const User = mongoose.model('User', userSchema);


module.exports = User;
