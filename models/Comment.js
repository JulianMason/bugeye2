const mongoose = require('mongoose');
const { nanoid } = require('nanoid')

const CommentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(12)
    },
    user: {
        type: String,
        ref: 'User._id'
    },
    created_by: {
        type: String
    },
    comment: {
        type: String,
        //required: true
    },
    ticket_id: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

