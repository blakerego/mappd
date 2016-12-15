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
      google.maps.event.addListener(marker, 'click', function () {
          // close window if not undefined
          if (infoWindow !== void 0) {
              infoWindow.close();
          }
          // create new window
          var infoWindowOptions = {
              content: content
          };
          infoWindow = new google.maps.InfoWindow(infoWindowOptions);
          infoWindow.open(map, marker);
      });
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

}])
// .directive('myMap', function() {
//     // directive link function
//     var link = function(scope, element, attrs) {
//         var map, infoWindow;
//         var markers = [];
        
//         // map config
//         var mapOptions = {
//             center: new google.maps.LatLng(50, 2),
//             zoom: 4,
//             mapTypeId: google.maps.MapTypeId.ROADMAP,
//             scrollwheel: false
//         };
        
//         // init the map
//         function initMap() {
//             if (map === void 0) {
//                 map = new google.maps.Map(element[0], mapOptions);
//             }
//         }    
        
//         // place a marker
//         function setMarker(map, position, title, content) {
//             var marker;
//             var markerOptions = {
//                 position: position,
//                 map: map,
//                 title: title,
//                 icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
//             };

//             marker = new google.maps.Marker(markerOptions);
//             markers.push(marker); // add marker to array
            
//             google.maps.event.addListener(marker, 'click', function () {
//                 // close window if not undefined
//                 if (infoWindow !== void 0) {
//                     infoWindow.close();
//                 }
//                 // create new window
//                 var infoWindowOptions = {
//                     content: content
//                 };
//                 infoWindow = new google.maps.InfoWindow(infoWindowOptions);
//                 infoWindow.open(map, marker);
//             });
//         }
        
//         // show the map and place some markers
//         initMap();
        
//         setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
//         setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
//         setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
//     };
    
//     return {
//         template: '<div id="gmaps"></div>',
//         replace: true,
//         link: link
//     };
// })
;

