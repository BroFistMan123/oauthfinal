const router = require('express').Router();
const User = require('../models/user-model');
const authCheck = (req, res, next) => {
    console.log("***********AUTHENTICATING**************");
    console.log(req.user);
    if (!req.user) {
        // User is not logged in
        res.redirect('/auth/login');
    }
    else {
        // User is logged in
        next();
    }
}
router.get('/', authCheck, (req, res) => {
    const user = req.user;
    //res.send('you are logged in, this is your profile - ' + user._name);
    res.render('profile', { user: req.user });
});

router.get('/', authCheck, (req, res) => {
    const user = req.user;
    //res.send('you are logged in, this is your profile - ' + user._name);
    res.render('profile', { user: req.user });
});
router.get('/department', authCheck, (req, res) => {
    User.query(`SELECT row_to_json (u) FROM ( SELECT "umbukan_hr".departments() AS "dept") u`, (err, results) => {
        res.render('department', results);
    });
});
router.get('/employee', authCheck, (req, res) => {
    User.query(`SELECT row_to_json (u) FROM ( SELECT "umbukan_hr".employees() AS "employees") u`, (err, results) => {
        res.render('employee', results);
    });
});
router.get('/employeedept', authCheck, (req, res) => {
    User.query(`SELECT row_to_json (u) FROM ( SELECT "umbukan_hr".empdept() AS "empdept") u`, (err, results) => {
        res.render('employeedept', results);
    });
});
router.get('/salary', authCheck, (req, res) => {

    User.query(`SELECT row_to_json (u) FROM ( SELECT "umbukan_hr".salary() AS "fullname") u`, (err, results) => {
        res.render('salary', results);
    });
});
module.exports = router;