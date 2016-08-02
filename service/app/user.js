var express = require('express');
var router = express.Router();
var login = require('../api/login');

router.get('/mine', function (req, res) {
  login.get_user_info(req, res, function (user_info) {
    res.render('mine', {
      user_info: user_info
    });
  })
});

router.get('/new', function (req, res) {
  login.get_user_info(req, res, function (user_info) {
    res.render('new', {
      user_info: user_info
    });
  })
});

module.exports = router;

// user_info has below properties
// user_info.openid
// user_info.nickname
// user_info.sex
// user_info.language
// user_info.city
// user_info.province
// user_info.country
// user_info.headimgurl