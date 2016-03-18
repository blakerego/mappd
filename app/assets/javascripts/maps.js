angular.module('mapsController', ['locationService', 'userService'])
.controller('mapsController', ['$scope', '$http', 'locationService', 'userService', '$window',
  function ($scope, $http, locationService, userService, $window) {

  $scope.desiredLocations = [];

  $scope.locations = locationService.locations;

  locationService.getAllLocations().then(function (response) {
    $scope.locations = response.data;
  });

  userService.getCurrentUser().then(function (response) {
    $scope.map.user_id = response.data.id;
  });

  $scope.map = {
    'user_id': null
  };

  $scope.locationChecked = function (blank, $event, location) {
    var checkbox = $event.target;
    var checked = checkbox.checked;
    if (checked) {
      $scope.desiredLocations.push(location);
    } else {
      var index = $scope.desiredLocations.indexOf(location);
      if (index > -1) {
        $scope.desiredLocations.splice(index, 1);
      }
    }
  };

  $scope.submit = function () {
    if (!$scope.map.id) {
      createMap();
    }
  };

  function createMap() {
    $scope.map.location_ids = _.map($scope.desiredLocations, function (l) { return l.id; });
    $http.post('/maps.json', {'map': $scope.map}).then(function(response) {
      $window.location.href = '/maps/' + response.data.id;
    });
  }
}]);
