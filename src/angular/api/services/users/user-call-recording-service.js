import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserCallRecordingService', UserCallRecordingService)

UserCallRecordingService.$inject = ['$http', 'Route']
function UserCallRecordingService($http, Route) {
  var url = Route.api('/users/call-recording')
  var service = { index: index, show: show, update: update, bulk: bulk }
  service.options = {
    recordingOptions: [
      'Always',
      'Never',
      'On Demand',
      'Always with Pause/Resume',
      'On Demand with User Initiated Start'
    ],
    pauseResumeNotification: ['None', 'Beep', 'Play Announcement'],
    recordCallRepeatWarningToneTimerSeconds: {
      minimum: 10,
      maximum: 1800
    }
  }
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url('bulk'), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        console.log(response.data)
        return response.data
      })
  }

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }

  function bulk(data) {
    return $http.put(url('bulk'), data).then(function(response) {
      return response.data
    })
  }
}
