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

router.get('/getItem', function (req, res) {
  res.setHeader('content-type', 'application/json');
  res.json(router.get_item(req.params.itemId));
})

// utilities

router.get_item = function(itemId) {
  if(itemId === "1000"){
    return {
        "ItemId":"1000",
        "PubTime": new Date(),
        "ItemName": "BoseQC35",
        "Deposit": "500",
        "Price": "24.99",
        "Description": "如何用数码设备换来片刻的宁静,就有了下面这篇Bose QC35降噪蓝牙耳机体验。 外观绝不出彩,但可能是佩戴最舒适的耳机之一Bose QC35.",
        "Thumbnail": "img/portfolio/thumbnails/1.jpg",
        "OwnerId": "1000",
        "Reviews": 15,
        "Rate": 5,
        "status": "OnShelf"
    };
  }
  else{
    return {
        "ItemId":"1001",
        "PubTime": new Date(),
        "ItemName": "Second Product",
        "Deposit": "500",
        "Price": "64.99",
        "Description": "This is a short description.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Thumbnail": "img/portfolio/thumbnails/2.jpg",
        "OwnerId": "1000",
        "Reviews": 12,
        "Rate": 4,
        "status": "OnShelf"
    };
  }
}

router.get_latest_items = function () {
  return [
    {
      "ItemId":"1000",
      "PubTime": new Date(),
      "ItemName": "BoseQC35",
      "Deposit": "500",
      "Price": "24.99",
      "Description": "如何用数码设备换来片刻的宁静,就有了下面这篇Bose QC35降噪蓝牙耳机体验。 外观绝不出彩,但可能是佩戴最舒适的耳机之一Bose QC35.",
      "Thumbnail": "img/portfolio/thumbnails/1.jpg",
      "OwnerId": "1000",
      "Reviews": 15,
      "Rate": 5,
      "status": "OnShelf"
    }, {
      "ItemId":"1001",
      "PubTime": new Date(),
      "ItemName": "Second Product",
      "Deposit": "500",
      "Price": "64.99",
      "Description": "This is a short description.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Thumbnail": "img/portfolio/thumbnails/2.jpg",
      "OwnerId": "1000",
      "Reviews": 12,
      "Rate": 4,
      "status": "OnShelf"
    }, {
      "ItemId":"1002",
      "PubTime": new Date(),
      "ItemName": "Third Product",
      "Deposit": "500",
      "Price": "74.99",
      "Description": "This is a short description.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Thumbnail": "img/portfolio/thumbnails/3.jpg",
      "OwnerId": "1000",
      "Reviews": 31,
      "Rate": 4,
      "status": "OnShelf"
    }, {
      "ItemId":"1003",
      "PubTime": new Date(),
      "ItemName": "Fourth Product",
      "Deposit": "500",
      "Price": "84.99",
      "Description": "This is a short description.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Thumbnail": "img/portfolio/thumbnails/4.jpg",
      "OwnerId": "1000",
      "Reviews": 6,
      "Rate": 3,
      "status": "OnShelf"
    }, {
      "ItemId":"1004",
      "PubTime": new Date(),
      "ItemName": "Fifth Product",
      "Deposit": "500",
      "Price": "94.99",
      "Description": "This is a short description.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Thumbnail": "img/portfolio/thumbnails/5.jpg",
      "OwnerId": "1000",
      "Reviews": 18,
      "Rate": 4,
      "status": "OnShelf"
    }];
}

module.exports = router;
