angular.module('orderApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
  })
  .controller('OrderController', ['$scope', '$location', '$http', function ($scope, $location,$http, ItemService) {
    var orderId = $location.path();
    $http.get('/api/item/getOrder'+orderId)
      .success(function (response) {
          $scope.order = response;
      });
    }]);

