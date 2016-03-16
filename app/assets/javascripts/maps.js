
angular.module('mapsController', [])
.controller('mapsController', ['$scope', function ($scope) {

  $scope.desiredLocations = [];

  $scope.locationChecked = function (location, checked) {
    if (checked) {
      $scope.desiredLocations.push(location);
    }
  };
  console.log('Angular mapsController deployed...');
}]);
