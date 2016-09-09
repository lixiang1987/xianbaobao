angular.module('itemApp', ['ngRoute'])
  .config(function ($routeProvider) {  
    $routeProvider.when('/itemId/:itemId', {                            
        templateUrl: 'item.html',
        controller: 'ItemController'
    });
    $routeProvider.otherwise({ redirectTo: '/item' });
  })
  .controller('ItemController', function ($scope, $routeParams, $http, ItemService) {
    alert($routeParams.itemId);
    $http.get('/api/item/getItem/'+$routeParams.itemId)
      .success(function (response) {
          alert(response);
          $scope.item = response;
      });

  })
  .factory('ItemService', function ($http) {
    return {
      get: function (itemId, callback) {
        $http.get('/api/item/getItem/'+itemId).success(function (data) {
          callback(data);
        });
      }
    }
  })
  .service('ItemService', function ($http) {
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