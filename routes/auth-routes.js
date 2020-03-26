const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    if (req.user) {
        // User is not logged in
        res.redirect('/profile/');
    }
    else {
        res.render('login', { user: req.user });
    }
        // User is logged in
       

});


// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    // res.send('logging out');
    req.logout();
    res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    //res.send('you reached the callback URI');
    //res.send(req.user);    
    res.redirect('/profile/');
});

router.get('/slack', passport.authenticate('slack'));
router.get('/slack/callback', passport.authenticate('slack', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/profile/');
});
router.get('/spotify', passport.authenticate('spotify'), function (req, res) { });
router.get('/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/profile/');
});
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/profile/');
});
router.get('/linkedin', passport.authenticate('linkedin'));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/profile/');
});
module.exports = router;