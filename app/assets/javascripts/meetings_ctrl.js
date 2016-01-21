/* global angular, $, moment, initializeMapIndex */
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
        $scope.members = response.data.members;
        $scope.meetings = response.data.meetings;
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
        initializeMapIndex(response.data.meetings);

        setTimeout(function() {
          var $box = $('.blog-masonry').masonry();
          // Layout Masonry again after all images have loaded
          $box.imagesLoaded( function() {
            $box.masonry();
          });
        }, 0);

        $scope.defaultStart = moment().format("YYYY-MM-DDTHH:mm");
        $scope.defaultEnd = moment().add(1, 'hours').format("YYYY-MM-DDTHH:mm");

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

    $scope.createNewMeeting = function() {
      var memberIds = $scope.members
        .filter(function(member) { return member.selected; })
        .map(function(member) { return member.id; });
      var newMeeting = {
        name: $scope.newMeetingTitle,
        address: $scope.newMeetingAddress,
        start_time: $scope.newMeetingStart ? formattedDateTime($scope.newMeetingStart) : $scope.defaultStart,
        end_time: $scope.newMeetingEnd ? formattedDateTime($scope.newMeetingEnd) : $scope.defaultEnd,
        meeting: {user_ids: memberIds}
      };
      console.log(newMeeting);
      $http.post('/api/v1/meetings.json', newMeeting).then(function(response) {
        console.log(response);
        $scope.meetings.push(response.data);
      });
    };

    window.$scope = $scope;
    window.$location = $location;
  });

  function formattedDateTime(datetime) {
    return moment(datetime).format("YYYY-MM-DDTHH:mm");
  }
})();