var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var csrfProtection = csrf();
/* GET home page. */
router.use(csrfProtection);

router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    res.render('shop/index', { title: 'Express', products: docs });
  });
});

router.get('/user/signup', function(req, res, next) {
    res.render('user/signup', { csrfToken: req.csrfToken() });
})
router.post('/user/signup', function(req, res, next) {
    res.redirect('/');
})
module.exports = router;
