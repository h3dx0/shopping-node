var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var Order = require('../models/order');

router.use(csrfProtection);

router.get('/profile',isLoggedIn, function (req, res, next) {
    Order.find({user: req.user}, function callback(err, orders){
        if (err){
            res.write('Error');
        }
        res.render('user/profile', {orders: orders})
    });
    res.render('user/profile');
});
router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/')
});


//esta ruta se aplica a todas las rutas q hay debajo de ellas  es decir aplica el middleware a todas
router.use('/', notLoggedIn, function (req, res, next) {
    return next();
});

router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

//aqui aplicamos passport
router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res) {
    if (req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/user/profile')
    }
});

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    console.log(messages)
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res) {
    if (req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/user/profile')
    }
});


module.exports = router;
//proteger las rutas y el isAuthenticated es d passport
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }else{
      res.redirect('/');
    }
}
function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){
      return next();
    }else{
      res.redirect('/');
    }
}