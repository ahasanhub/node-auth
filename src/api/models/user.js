const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please enter your password.')
            } else if (validator.equals(value.toLowerCase(), 'password')) {
                throw new Error('Please enter valid password.')
            } else if (validator.contains(value.toLowerCase(), 'password')) {
                throw new Error('Password should not contain password!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});
//mongoose pre save middleware
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
});
//mongoose instance method
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, 'jwtkey12175!$32#', { expiresIn: '7 days' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}
//mongoose static method
userSchema.statics.findByCredentials = async (email, password) => {
    //Search for a user by email and password
    const user = await User.findOne({
        email
    });
    if (!user) {
        throw new Error({
            error: 'Invalid login credentials'
        });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({
            error: 'Invalid login credentials'
        });
    }
    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;