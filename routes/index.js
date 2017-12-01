let express = require('express');
let router = express.Router();
let Cart = require('../models/product');
let Product = require('../models/product');
let Order = require('../models/order');
/* GET home page. */

router.get('/', function (req, res) {
    let successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        res.render('shop/index', {title: 'Express', products: docs, successMsg: successMsg, noMessages: !successMsg});
    });
});
//
// router.get('/add-to-cart/:id', function (req, res) {
//     let productId = req.params.id;
//     let cart = new Cart(req.session.cart ? req.session.cart : {});
//     Product.findById(productId, function (err, product) {
//         if (err) {
//             return res.redirect('/')
//         }
//         cart.add(product, product._id);
//         req.session.cart = cart;
//         res.redirect('/');
//     })
//
// });
//
// router.get('/shopping-cart', function (req, res) {
//     if (!req.session.cart) {
//         res.render('shop/shopping-cart', {products: null});
//     }
//     let cart = new Cart(req.session.cart);
//     res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
// });
//
// router.get('/checkout', function (req, res) {
//     if (!req.session.cart) {
//        return res.redirect('/shopping-cart')
//     }
//     let cart = new Cart(req.session.cart);
//     let errMsg = req.flash('error')[0];
//     res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
// });
//
// router.post('/checkout', isLoggedIn, function(req, res, next) {
//     if (!req.session.cart) {
//         return res.redirect('/shopping-cart');
//     }
//     let cart = new Cart(req.session.cart);
//
//     let stripe = require("stripe")(
//         "sk_test_bDuatD9WmQZEHFzGkYstq1ij"
//     );
//
//     stripe.charges.create({
//         amount: cart.totalPrice * 100,
//         currency: "usd",
//         source: req.body.stripeToken, // obtained with Stripe.js
//         description: "Test Charge"
//     }, function(err, charge) {
//         if (err) {
//             req.flash('error', err.message);
//             return res.redirect('/checkout');
//         }
//         let order = new Order({
//             //este user lo devuelve passport
//             user: req.user,
//             cart: cart,
//             address: req.body.address,
//             name: req.body.name,
//             paymentId: charge.id
//         });
//         order.save(function(err, result) {
//             req.flash('success', 'Successfully bought product!');
//             req.session.cart = null;
//             res.redirect('/');
//         });
//     });
// });
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
