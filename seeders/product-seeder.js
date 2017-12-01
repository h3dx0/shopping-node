var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping')

var products = [
  new Product({
    imagePath: 'http://liquidationsports.com/common/images/products/large/58767lrg.jpg',
    title: 'My First Product',
    description: ' Description of my first product',
    price: 110
  }),
  new Product({
    imagePath: 'http://liquidationsports.com/common/images/products/large/58767lrg.jpg',
    title: 'My First Product',
    description: ' Description of my first product',
    price: 110
  }),
  new Product({
    imagePath: 'http://liquidationsports.com/common/images/products/large/58767lrg.jpg',
    title: 'My First Product',
    description: ' Description of my first product',
    price: 110
  }),
  new Product({
    imagePath: 'http://liquidationsports.com/common/images/products/large/58767lrg.jpg',
    title: 'My First Product',
    description: ' Description of my first product',
    price: 110
  })
];
var done = 0;
for (let i = 0; i < products.length; i++) {
  products[i].save(function (err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}
function exit() {
  mongoose.connect('localhost:27017/shopping')
}
