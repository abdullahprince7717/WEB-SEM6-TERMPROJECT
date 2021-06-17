var express = require('express');
var router = express.Router();
var usersModel = require('../models/users')

/* GET home page. */
router.get('/signin', function (req, res, next) {
  res.render("users/signin");

});

router.post('/signin', async function (req, res, next) {
  let user = await usersModel.findOne({
    email: req.body.email,
    password: req.body.password
  })

  if (!user) {
    console.log("user not found");
    return res.redirect('/signin');
  }

  req.session.user = user;
  return res.redirect("/");

});

router.get('/signout', function (req, res, next) {
  req.session.user = null;
  res.redirect("/signin");

});


router.get('/signup', function (req, res, next) {
  res.render("users/signup");

});

router.post('/signup', async function (req, res, next) {
  let user = new usersModel(req.body);
  await user.save();
  res.redirect('/');

});


module.exports = router;