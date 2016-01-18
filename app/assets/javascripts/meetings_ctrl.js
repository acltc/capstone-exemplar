/* global angular, $, moment */
(function() {
  angular.module('app').controller('meetingsCtrl', function($scope, $http, $location) {
    $scope.setupIndex = function() {
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

    $scope.setupShow = function(meetingId) {
      $http.get('/api/v1/meetings/' + meetingId + '.json').then(function(response) {
        $scope.meeting = response.data;
        console.log($scope.meeting.start);
        $scope.startTimeFormatted = moment($scope.meeting.start).format('MMMM Do YYYY, h:mm:ss a');
        $scope.endTimeFormatted = moment($scope.meeting.end).format('MMMM Do YYYY, h:mm:ss a');
        $scope.updatedAtFormatted = moment($scope.meeting.updatedAt).fromNow();
      });
    };

    function refreshCalendar() {
      $("#calendar").fullCalendar('removeEvents');
      $("#calendar").fullCalendar('addEventSource', $scope.eventSources);
    }

    window.$scope = $scope;
    window.$location = $location;
  });
})();