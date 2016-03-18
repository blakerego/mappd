angular.module('locationService', [])
.service('locationService', ['$http', function ($http) {

  var service = {
    getAllLocations: function () {
      return $http.get('/locations/all').then(function (response) {
        return response;
      });
    }
  };

  return service;

}]);