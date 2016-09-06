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

router.get('/latest', function (req, res) {
  res.setHeader('content-type', 'application/json');
  res.json(router.get_latest_items());
})

// utilities

router.get_latest_items = function () {
  return [
    {
      "ItemName": "BoseQC35",
      "Price": "$24.99",
      "Description": "如何用数码设备换来片刻的宁静,就有了下面这篇Bose QC35降噪蓝牙耳机体验。 外观绝不出彩,但可能是佩戴最舒适的耳机之一Bose QC35.",
      "Thumbnail": "img/portfolio/thumbnails/1.jpg",
      "Reviews": 15,
      "Rate": 5
    }, {
      "ItemName": "Second Product",
      "Price": "$64.99",
      "Description": "This is a short description.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Thumbnail": "img/portfolio/thumbnails/2.jpg",
      "Reviews": 12,
      "Rate": 4
    }, {
      "ItemName": "Third Product",
      "Price": "$74.99",
      "Description": "This is a short description.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Thumbnail": "img/portfolio/thumbnails/3.jpg",
      "Reviews": 31,
      "Rate": 4
    }, {
      "ItemName": "Fourth Product",
      "Price": "$84.99",
      "Description": "This is a short description.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Thumbnail": "img/portfolio/thumbnails/4.jpg",
      "Reviews": 6,
      "Rate": 3
    }, {
      "ItemName": "Fifth Product",
      "Price": "$94.99",
      "Description": "This is a short description.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Thumbnail": "img/portfolio/thumbnails/5.jpg",
      "Reviews": 18,
      "Rate": 4
    }];
}

module.exports = router;
