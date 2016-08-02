var express = require('express');
var redis = require('redis'), client = redis.createClient();
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

client.on('error', function (err) {
  console.error("error:", err);
})

router.post('/create', function (req, res) {
  var openid = req.session.openid;
  if (req.body) {
    console.log(req.body);
  }
  res.setHeader('content-type', 'application/json');
  res.json({ "success": true });
});

module.exports = router;
