/* global angular, $ */
(function() {
  angular.module('app').controller('meetingsCtrl', function($scope, $http) {
    $scope.setup = function() {
      $scope.message = "yoyoyo";
      $scope.uiConfig = {
        calendar:{
          height: 450,
          editable: true,
          header:{
            left: 'month basicWeek basicDay agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          defaultView: 'month',
          dayClick: $scope.alertEventOnClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize
        }
      };
      $scope.eventSources = {};
      $http.get('/api/v1/meetings.json').then(function(response) {
        $scope.meetings = response.data;
        $scope.eventSources = {
          events: response.data,
          color: 'yellow',   // an option!
          textColor: 'black' // an option!
        };
        refreshCalendar();
      });
    };

    function refreshCalendar() {
      $("#calendar").fullCalendar('removeEvents');
      $("#calendar").fullCalendar('addEventSource', $scope.eventSources);
    }
  });
})();