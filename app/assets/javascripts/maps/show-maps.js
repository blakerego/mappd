angular.module('showMapsController', ['locationService', 'uiGmapgoogle-maps'])
.controller('showMapsController', ['$scope', 'locationService', 'uiGmapGoogleMapApi', '$window',
  function ($scope, locationService, uiGmapGoogleMapApi, $window) {

  $scope.desiredLocations = [];

  $scope.locations = locationService.locations;

  $scope.ready = false;
  $scope.getBoundsFromLocation = locationService.getBoundsFromLocation;
  var pathParams = $window.location.pathname.split('/');
  var mapId = pathParams[pathParams.length - 1];

  locationService.getLocationsByMap(mapId).then(function (response) {
    $scope.locations = response.data;
    $scope.ready = true;
  });

  $scope.map = {
    center: { latitude: 45, longitude: -73 },
    zoom: 8 
  };

}]);