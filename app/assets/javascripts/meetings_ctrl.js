/* global angular, moment, initializeMapIndex */
(function() {
  angular.module('app').controller('meetingsCtrl', function($scope, $http, $location) {
    $scope.setupIndex = function() {
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
      $scope.eventSources = [];
      $http.get('/api/v1/meetings.json').then(function(response) {
        console.log('angular get', response);
        $scope.meetings = response.data;
        $scope.meetings2 = [{title: 'sample', start: '2016-01-21'}];
        $scope.eventSources.push({
          events: $scope.meetings,
          color: 'yellow',
          textColor: 'black'
        });
        $scope.eventSources.push({
          events: $scope.meetings2,
          color: 'purple'
        });
        initializeMapIndex(response.data);
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

    window.$scope = $scope;
    window.$location = $location;
  });
})();