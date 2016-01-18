/* global angular */
(function() {
  angular.module('app').controller('meetingsCtrl', function($scope, $http) {
    $scope.setup = function() {
      $scope.message = "yoyoyo";
      $http.get('/api/v1/meetings.json').then(function(response) {
        $scope.meetings = response.data;


        // Initialize Masonry
        var $box = $('.blog-masonry').masonry();
        // Layout Masonry again after all images have loaded
        $box.imagesLoaded( function() {
          $box.masonry();
        });

      });
    };
  });
})();