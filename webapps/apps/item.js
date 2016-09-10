var app = angular.module('itemApp', ['ngRoute']);

app.config(function ($routeProvider) {  
    $routeProvider.otherwise({ redirectTo: '/' });
  })
  .controller('ItemController', ['$scope', '$location', '$http', function ($scope, $location,$http, ItemService) {
    var itemId = $location.path();
    $http.get('/api/item/getItem'+itemId)
      .success(function (response) {
          $scope.item = response;
      });

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