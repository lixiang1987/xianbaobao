angular.module('itemApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
  })
  .controller('ItemController', function ($scope, $location, ItemService) {

    var self = this;
    var itemId = null; // optional declaration!
    $scope.item = null;
    bind("itemId");

    function bind(valueName) {

        // Controller to URL
      $scope.$watch(function() { return self[valueName] }, function (newVal) {
          console.log("Property changed!");
          $location.search(valueName, newVal);
      });

      // URL to controller
      $scope.$on('$locationChangeSuccess', function(event) {
          console.log("URL changed!");
          self[valueName] = $location.search()[valueName];
          ItemService.get(self["itemId"], function (data) {
          $scope.item = data;
        });
      });
    }
    
    $scope.submit = function () {
      ItemService.create($scope.description, $scope.rent);
    }
  })
  .factory('ItemService', function ($http) {
    return {
      get: function (itemId, callback) {
        $http.get('/api/item/getItem', {params: { itemId: itemId }}).success(function (data) {
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