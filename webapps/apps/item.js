angular.module('app', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
  })
  .controller('ItemController', function ($scope, ItemService) {
    $scope.submit = function () {
      ItemService.create($scope.description, $scope.rent);
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
  });

