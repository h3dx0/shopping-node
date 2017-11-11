var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');

router.use(csrfProtection);

router.get('/profile',isLoggedIn, function (req, res, next) {
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
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    console.log(messages)
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));


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