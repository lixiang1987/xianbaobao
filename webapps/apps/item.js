var app = angular.module('itemApp', ['ngRoute']);

app.config(function ($routeProvider) {  
    $routeProvider.otherwise({ redirectTo: '/' });
  })
  .controller('ItemController', ['$scope', '$location', '$http', function ($scope, $location,$http, ItemService) {
    var itemId = $location.path().split('/')[1];
    $http.get('/api/item/getItem/'+itemId)
      .success(function (response) {
          $scope.item = response;
      });
    $http.get('/api/item/getComments/'+itemId)
      .success(function (response) {
          $scope.comments = response;
      });
    $scope.comment = function(){
      var pubTime = new Date();
      var req = {
        method: 'POST',
        url: '/api/item/newComment',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'PubTime': pubTime,
          'ItemId': itemId,
          'Content': $scope.commentContent
        }
      }

      $http(req).then(function () {
        $scope.comments.push({
          "PubTime" : pubTime,
          "UserId" : "膜",
          "ToUserId": "Shabi",
          "Content": $scope.commentContent
        });
        $scope.commentContent="";
      }, function () {
        alert("failed");
      });

    }
  }])
  .controller('NewItemController', ['$scope', '$location', '$http', function ($scope, $location,$http, ItemService) {
    var itemId = $location.path();
    
  }]);
app.service('ItemService', function ($http) {
    this.create = function (description, rent) {
      var req = {
        method: 'POST',
        url: 'https://www.cotiger.com/api/item/create',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'description': description,
          'rent': rent
        }
      }

      $http(req).then(function () {

      }, function () {

      });
    };
    this.get = function (itemId, callback) {
        $http.get('/api/item/getItem', {params: { itemId: itemId }}).success(function (data) {
          callback(data);
        });
      } 
  });