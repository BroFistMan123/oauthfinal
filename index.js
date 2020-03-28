const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const path = require('path');
const app = express();
const cookieSession = require("cookie-session");
const keys = require('./config/keys')

app.use(passport.initialize());


// set up view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

// set up cookie-session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    if (req.user) {
        // User is not logged in
        res.redirect('/profile/');
    }
    else {
        res.render('home', { user: req.user });
    }
   
});

// listen to requests

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`Server is running on ${PORT}`)