var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  console.log(req.session.user)
  res.render("index");

});

router.get('/cart', function (req, res, next) {

  let cart = req.cookies.cart
  if (!cart) {
    cart = [];
  }
  res.render("cart", {
    cart: cart
  });

});

router.get('/footer', function (req, res, next) {
  res.render("footer");

});

router.get('/template', function (req, res, next) {
  res.render("template");

});

module.exports = router;