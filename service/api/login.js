var express = require('express');
var util = require('util');
var https = require('https');
var redis = require('redis'), client = redis.createClient();
var router = express.Router();
var config = require('../config.json');

var seconds_in_30_days = 3600 * 24 * 30;

client.on('error', function (err) {
  console.error("error:", err);
})

// STEP 1: get code
router.get('/authorize', function (req, res) {
  var template = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_userinfo#wechat_redirect';
  var request_url = 'https://www.cotiger.com/api/login/get_access_token';
  res.redirect(util.format(template, config.app_id, encodeURIComponent(request_url)));
});

// STEP 2: get access_token
router.get('/get_access_token', function (req, res) {
  var template = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code';
  var code = req.query.code;
  var url = util.format(template, config.app_id, config.app_secret, code);

  https.get(url, (res1) => {
    console.log('statusCode: ', res1.statusCode);
    console.log('headers: ', res1.headers);

    res1.on('data', (d) => {
      process.stdout.write(d);
      var data = JSON.parse(d);

      var openid = data.openid;
      client.set("openid:" + openid + ":access_token", data.access_token, 'EX', data.expires_in);
      // refresh token will expires in 30 days
      client.set("openid:" + openid + ":refresh_token", data.refresh_token, 'EX', seconds_in_30_days);

      req.session.openid = openid;
      if (req.session.lastUrl) {
        var lastUrl = req.session.lastUrl;
        req.session.lastUrl = null;
        res.redirect(lastUrl);
      }
      else
        res.redirect('/');
    })
  }).on('error', (e) => {
    console.error(e);
  });
});

router.get_access_token = function (openid, callback) {
  client.get("openid:" + openid + ":access_token", function (err, reply) {
    if (reply)
      callback(reply);
    else {
      client.get("openid:" + openid + ":refresh_token", function (err, refresh_token) {
        if (refresh_token) {
          // call service to refresh token
          var template = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=%s&grant_type=refresh_token&refresh_token=%s';
          var url = util.format(template, config.app_id, refresh_token);
          https.get(url, (res) => {
            res.on('data', (d) => {
              var data = JSON.parse(d);
              var openid = data.openid;
              client.set("openid:" + openid + ":access_token", data.access_token, 'EX', data.expires_in);
              callback(data.access_token);
            })
          }).on('error', (e) => {
            console.error(e);
          });
        }
        else {
          callback(null);
        }
      })
    }
  });
};

router.get_user_info = function (req, res, callback) {
  if (!req.session.openid) {
    console.log(req.originalUrl);
    req.session.lastUrl = req.originalUrl;
    res.redirect('/api/login/authorize');
  } else {
    var openid = req.session.openid;
    this.get_access_token(openid, function (access_token) {
      if (access_token) {
        var template = 'https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=zh_CN';
        var url = util.format(template, access_token, openid);
        https.get(url, (res1) => {
          res1.on('data', (d) => {
            var data = JSON.parse(d);
            callback(data);
          });
        }).on('error', (e) => {
          callback(e);
        });
      } else {
        req.session.lastUrl = req.originalUrl;
        res.redirect('/api/login/authorize');
      }
    });
  }
};

module.exports = router;
