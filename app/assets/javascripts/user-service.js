angular.module('userService', [])
.service('userService', ['$http', function ($http) {

  var service = {
    getCurrentUser: function () {
      return $http.get('/users/current');
    }
  };
  return service;

}]);