const express = require('express')
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const User = require('../models/User');
const DOMPurify = createDomPurify(new JSDOM().window);

// Show add page
router.get('/add', ensureAuth, async (req, res) => {
    const user = await User.findOne({}, { name: 1, _id: 0 }).lean();
    res.render('tickets/add.hbs', {
        user: req.user,
    });
    console.log(user.name)
})

// Update status
router.get('/update/:id', ensureAuth, async (req, res) => {
    const user = await User.findOne({}, { name: 1, _id: 0 }).lean();
    const ticket = await Ticket.findOne({ _id: req.params.id }).lean();
    res.render('tickets/update.hbs', {
        user: req.user,
        ticket
    });
    console.log(user.name)
})

// Post updated ticket
router.post('/update/:id', ensureAuth, async (req, res) => {
    try {
        let ticket = await Ticket.findById(req.params.id);

        ticket = await Ticket.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });
        res.redirect('/dashboard');
    } catch (err) {
        return res.render('../views/error/500.hbs');
    }
})

// Delete ticket
router.get('/delete/:id', ensureAuth, async (req, res) => {
    console.log('Deleting Ticket')

    try {
        await Ticket.remove({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        return res.render('../views/error/500.hbs');
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
    const comment = await Comment.find({}).lean();
    const user = await User.findOne({}, { name: 1, userType: 1, _id: 0 }).lean();
    const ticket = await Ticket.findOne({
        _id: req.params.id
    }).lean();
    if(!ticket) {
        return res.render('../views/error/400.hbs');
    } else {
        res.render('../views/tickets/ticket.hbs', {
            ticket,
            comment,
            user,
            userType: req.user.userType
        });
    }
})

// Post ticket
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = DOMPurify.sanitize(req.body.user);
        req.body.user = req.user.id
        await Ticket.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500.hbs')
    }
})

// Post comment
router.post('/post_comment', ensureAuth, async (req, res) => {
    try {
        req.body.user = DOMPurify.sanitize(req.body.user);
        req.body.user = req.user.id
        await Comment.create(req.body)
        res.redirect('back')
    } catch (err) {
        console.error(err)
        res.render('error/500.hbs')
    }
    
})

module.exports = router;