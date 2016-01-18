/* global angular */
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
          defaultView: 'agendaWeek',
          dayClick: $scope.alertEventOnClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize
        }
      };
      $scope.eventSources = {
        events: [
          {
            title: 'Event1',
            start: '2016-01-18'
          },
          {
            title: 'Event2',
            start: '2016-01-19'
          },
          {
            title: 'Event3',
            start: new Date()
          }
        ],
        color: 'yellow',   // an option!
        textColor: 'black' // an option!
      };
      $http.get('/api/v1/meetings.json').then(function(response) {
        $scope.meetings = response.data;
      });
    };
  });
})();