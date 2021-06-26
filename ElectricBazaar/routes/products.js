var express = require('express');
var router = express.Router();
var productModel = require('../models/products')
var checkSessionAuth = require('../middlewares/checkSessionAuth')


/* GET home page. */
router.get('/products', async function (req, res, next) {

    var products = await productModel.find()
    console.log(products)
    res.render("products/lists", {
        varTitle: "PRODUCTS IN OUR MONGODB",
        varProducts: products
    });


});

//ROUTE FOR A FORM PAGE THAT ADDS A PRODUCT 
router.get('/products/add-product', checkSessionAuth, async function (req, res, next) {

    res.render("products/add-product");

});

router.post('/products/add-product', async function (req, res, next) {
    let product = new productModel(req.body);
    await product.save();
    res.redirect('/products');

});

router.get('/products/delete/:id', async function (req, res, next) {

    let product = await productModel.findByIdAndDelete(req.params.id)
    res.redirect('/products');

});

router.get('/products/edit/:id', async function (req, res, next) {

    let product = await productModel.findById(req.params.id)
    res.render('products/edit-product', {
        product
    });


});

router.post('/products/edit/:id', async function (req, res, next) {

    let product = await productModel.findById(req.params.id)
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    res.redirect('/products');

});

router.get('/products/cart/:id', async function (req, res, next) {

    let product = await productModel.findById(req.params.id)
    console.log("CALLING..................................!")
    let cart = [];
    if (req.cookies.cart) {
        cart = req.cookies.cart;
    }
    cart.push(product);
    res.cookie("cart", cart);
    res.redirect('/products');

});

router.get('/products/cart/remove/:id', async function (req, res, next) {

    let cart = [];
    if (req.cookies.cart) {
        cart = req.cookies.cart;
    }

    function checkIndex(x) {
        return x._id == req.params.id;
    }
    let productIndex = cart.findIndex(checkIndex);
    cart.splice(productIndex, 1);
    console.log(productIndex);
    res.cookie("cart", cart);
    res.redirect('/cart');

});



module.exports = router;