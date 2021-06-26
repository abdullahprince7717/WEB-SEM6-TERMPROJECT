var express = require('express');
var router = express.Router();
var checkSessionAuth = require('../middlewares/checkSessionAuth')

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render("index");

});


router.get('/cart', checkSessionAuth, function (req, res, next) {

  let cart = req.cookies.cart
  if (!cart) {
    cart = [];
  }
  res.render("cart", {
    cart: cart
  });

});


module.exports = router;