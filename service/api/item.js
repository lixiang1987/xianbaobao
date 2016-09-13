var express = require('express');
var redis = require('redis'), client = redis.createClient();
var router = express.Router();
var bodyParser = require('body-parser');
var commentIDIndex=100;

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

router.get('/getItem/:itemId', function (req, res) {
  res.setHeader('content-type', 'application/json');
  res.json(router.get_item(req.params.itemId));
})

router.get('/getComments/:itemId', function(req, res){
  res.setHeader('content-type', 'application/json');
  res.json(router.get_comments(req.params.itemId));
})

router.get('/getOrder/:orderId', function(req, res){
  res.setHeader('content-type', 'application/json');
  res.json(router.get_order(req.params.orderId));
})

router.post('/newComment', function (req, res) {
  var pubTime = req.body.PubTime
  var itemId = req.body.ItemId;
  var content = req.body.Content;
  if (req.body) {
    console.log(req.body);
  }
  commentIDIndex++;
  var newCommentID = commentIDIndex;
  commentsDict[newCommentID] = {
    "PubTime" : pubTime,
    "UserId" : "膜",
    "ToUserId": "Shabi",
    "Content": content
  };
  itemDict[itemId].Comments.push(newCommentID);
  res.setHeader('content-type', 'application/json');
  res.json({ "success": true, "itemId":itemId });
});

// utilities


var itemDict = {};
var commentsDict = {};

itemDict["1000"] = {
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
  "status": "OnShelf",
  "Comments" : ["1","2","3"]
};
itemDict["1001"] = {
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
  "status": "OnShelf",
  "Comments" : [4,5,6]
};
itemDict["1002"] =  {
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
  "status": "OnShelf",
  "Comments" : []
};
itemDict["1003"] = {
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
  "status": "OnShelf",
  "Comments" : []
}
itemDict["1004"] = {
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
  "status": "OnShelf",
  "Comments" : []
};

commentsDict[1] = {
  "PubTime" : new Date(),
  "UserId" : "Roy",
  "ToUserId": "Shane",
  "Content": "降噪效果超级棒！"
};
commentsDict[2] = {
  "PubTime" : new Date(),
  "UserId" : "膜",
  "ToUserId": "Shabi",
  "Content": "希望下一次我也能租到！"
};
commentsDict[3] =  {
  "PubTime" : new Date(),
  "UserId" : "刘涛",
  "ToUserId": "Shane",
  "Content": "物主很好，下次再来。"
}; 
commentsDict[4] = {
  "PubTime" : new Date(),
  "UserId" : "刘亦菲",
  "ToUserId": "Shane",
  "Content": "五星好评！"
};
commentsDict[5] = {
  "PubTime" : new Date(),
  "UserId" : "杨幂",
  "ToUserId": "Shabi",
  "Content": "还行！"
};

commentsDict[6] = {
  "PubTime" : new Date(),
  "UserId" : "刘涛",
  "ToUserId": "Shane",
  "Content": "非常不错。"
};

router.get_comments = function(itemId) {
  var array_values = [];
  var commentIDs = itemDict[itemId].Comments;
  for (var key in commentIDs)
  {
    array_values.push(commentsDict[commentIDs[key]]);
  }
  return array_values;
}

router.get_item = function(itemId) {
  return itemDict[itemId];
}

router.get_latest_items = function () {
  var array_values = [];
  for (var key in itemDict) {
    array_values.push(itemDict[key]);
  }
  return array_values;
}

router.get_order = function (orderId){
  return {
    "OrderTime":new Date(),
    "ItemId":"1000",
    "RenterId":"1000",
    "StartDate":new Date(),
    "EndDate":new Date(),
    "Deposit":100,
    "Price":24.99,
    "Status":"Confirmed"
  };
} 

module.exports = router;
