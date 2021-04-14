const express = require('express')
const index = require('./routes/index')
const users = require('./routes/users')
const tickets = require('./routes/tickets')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const morgan = require('morgan')
const dotenv = require('dotenv')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const bodyParser = require("body-parser")


const app = express();

// Sanitize mongo scripts by replacing prohibited characters with '_'
app.use(mongoSanitize({
    replaceWith: '_'
}));

// Load config
dotenv.config();

// Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Logs
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Handlebars helpers
const { formatDate, ifEquals, select } = require('./helpers/hbs');

// Handlebars
app.engine('.hbs', exphbs({ helpers: {
    formatDate,
    ifEquals,
    select
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


// Express Session
app.use(session({
    secret: 'secret',
    receive: true,
    resave: false,
    saveUninitialized: true,
    cookie : {
        maxAge:(3000000) // 5 minutes - maxAge works in milliseconds (1,000 = 1 second)
} 
}));



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use('/', index)
app.use('/auth', users)
app.use('/tickets', tickets)

// Listen
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}. Ctrl^c to quit.`);
});