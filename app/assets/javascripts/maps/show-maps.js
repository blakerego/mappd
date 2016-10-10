angular.module('showMapsController', ['locationService', 'uiGmapgoogle-maps'])
.controller('showMapsController', ['$scope', 'locationService', 'uiGmapGoogleMapApi', '$window',
  function ($scope, locationService, uiGmapGoogleMapApi, $window) {

  $scope.desiredLocations = [];

  $scope.locations = locationService.locations;

  $scope.ready = false;
  
  var pathParams = $window.location.pathname.split('/');
  var mapId = pathParams[pathParams.length - 1];

  locationService.getLocationsByMap(mapId).then(function (response) {
    $scope.locations = response.data;
    $scope.markers = [];
    _.each($scope.locations, function (location) {
      var marker = {
        id: location.id,
        coords: {
          latitude: location.latitude,
          longitude: location.longitude
        },
        options: { draggable: true }
      };
    });
    $scope.ready = true;
  });

  $scope.loaded = false;
  $scope.bounds = null;
  $scope.getBoundsFromLocation = function (locations) {
    if ($scope.ready && !$scope.loaded && locations != null) {
      $scope.bounds = locationService.getBoundsFromLocation(locations);
      $scope.loaded = true;
    }
    return $scope.bounds;
  };

  $scope.map = {
    center: { latitude: 45, longitude: -73 },
    zoom: 8,
    // events: {
    //   click: function () {
    //     console.log('CLICK');
    //   },
    //   dragend: function () {
    //     console.log('Dragging over');
    //   }
    // }
  };

  uiGmapGoogleMapApi.then(function (maps) {
    console.log("Maps API ready");
    // maps.event.addListener('dragend', function () {
    //   console.log('Dragging'); 
    // });

  });

}]);