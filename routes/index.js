const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../config/auth');
const Ticket = require('../models/Ticket');

// Landing page
router.get('/', ensureGuest, (req, res) => res.render('welcome.ejs'));

// Dashboard page
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user.id }).lean() // Tickets for specific user
        const ticketsAll = await Ticket.find({}).lean() // Gets all the tickets for the Admin
        res.render('dashboard.hbs', {
            name: req.user.name,
            userType: req.user.userType,
            tickets,
            ticketsAll
        })
    } catch (err) {
        console.log(err)
        res.render('error/500.hbs')
    }

})


// Open Tickets
router.get('/open', ensureAuth, async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user.id }).lean() // Tickets for specific user
        const ticketsAll = await Ticket.find({}).lean() // Gets all the tickets for the Admin
        res.render('tickets/open.hbs', {
            name: req.user.name,
            userType: req.user.userType,
            tickets,
            ticketsAll
        })
    } catch (err) {
        console.log(err)
        res.render('error/500.hbs')
    }

})

// Resolved Tickets
router.get('/resolved', ensureAuth, async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user.id }).lean() // Tickets for specific user
        const ticketsAll = await Ticket.find({}).lean() // Gets all the tickets for the Admin
        res.render('tickets/resolved.hbs', {
            name: req.user.name,
            userType: req.user.userType,
            tickets,
            ticketsAll
        })
    } catch (err) {
        console.log(err)
        res.render('error/500.hbs')
    }

})

// Closed Tickets
router.get('/closed', ensureAuth, async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user.id }).lean() // Tickets for specific user
        const ticketsAll = await Ticket.find({}).lean() // Gets all the tickets for the Admin
        res.render('tickets/closed.hbs', {
            name: req.user.name,
            userType: req.user.userType,
            tickets,
            ticketsAll
        })
    } catch (err) {
        console.log(err)
        res.render('error/500.hbs')
    }

})

module.exports = router;
