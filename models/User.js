const mongoose = require('mongoose')
const { nanoid } = require('nanoid')


const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(12)
    },
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
    },
    password: {
        type: String
    },
    userType: {
        type: String,
        required: true,
        default: 'Tester',
        enum: ['Tester', 'Admin']
    }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema);
module.exports = User;