angular.module('locationService', [])
.service('locationService', ['$http', function ($http) {

  var service = {
    getAllLocations: function () {
      return $http.get('/locations/all').then(function (response) {
        return response;
      });
    },

    getLocationsByMap: function (mapId) {
      return $http.get('/locations/bymapid?map_id=' + mapId);
    },

    /// @param locationArray, an array of objects with properties 
    ///         latitude and longitude
    /// 
    /// @returns an object with northeast and southwest properties.
    ///          These northeast and southwest properties will also be objects, 
    ///          each with latitude and longitude properties.
    getBoundsFromLocation: function (locationArray) {
      if (locationArray == null || locationArray.length <= 1) {
        return null;
      } 
      var northeast = {latitude: null, longitude: null};
      var southwest = {latitude: null, longitude: null};
      _.each(locationArray, function (location) {
        if (northeast.latitude === null || location.latitude > northeast.latitude) {
          northeast.latitude = location.latitude;
        }
        if (northeast.longitude === null || location.longitude > northeast.longitude) {
          northeast.longitude = location.longitude;
        }
        if (southwest.latitude === null || location.latitude < southwest.latitude) {
          southwest.latitude = location.latitude;
        }
        if (southwest.longitude === null || location.longitude < southwest.longitude) {
          southwest.longitude = location.longitude;
        }
      });
      return {
        northeast: northeast,
        southwest: southwest
      };
    }
  };

  return service;

}]);