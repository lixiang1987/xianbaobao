angular.module('indexApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
  })
  .controller('IndexController', function ($scope, ItemService) {
    $scope.items = [];
    ItemService.get(function (data) {
      $scope.items = data;
    });
  })
  .factory('ItemService', function ($http) {
    return {
      get: function (callback) {
        $http.get('/api/item/latest').success(function (data) {
          callback(data);
        });
      }
    };
  });

