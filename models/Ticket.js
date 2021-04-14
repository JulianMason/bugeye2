const mongoose = require('mongoose')
const { nanoid } = require('nanoid')


function ticketNum() {
    var length = 5,
        charset = "0123456789",
        retVal = "100";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const TicketSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(12)
    },
    ticket_num: {
        type: String,
        default: ticketNum()
    },
    title: {
        type: String,
        trim: true
    }, 
    created_by: {
        type: String,
    },
    tType: {
        type: String,
        //required: true,
        //default: 'Production',
        enum: ['Development', 'Testing', 'Production']
    },
    status: {
        type: String,
        //required: true,
        default: 'Open',
        enum: ['Open', 'Resolved', 'Closed']
    },
    priority: {
        type: String,
        //required: true,
        //default: 'High',
        enum: ['Low', 'Medium', 'High']
    },
    assignedTo: {
        type: String,
        //required: true,
        //default: 'Developer 1',
        enum: ['Julian', 'Jeremiah', 'Madani', 'Yassine', 'Nate']
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true})

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;