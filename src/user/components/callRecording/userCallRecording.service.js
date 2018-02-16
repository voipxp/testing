;(function() {
  angular
    .module('odin.user')
    .factory('UserCallRecordingService', UserCallRecordingService)

  function UserCallRecordingService($http, Route) {
    var url = Route.api('/services/users/callrecording')
    var service = { show: show, update: update, index: index }
    service.options = { recordingOptions: ['Always', 'Never', 'On Demand'] }
    return service

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      console.log('UserCallRecordingService.update')
      console.log(obj)
      return $http.put(url(userId), obj).then(function(response) {
        console.log(response.data)
        return response.data
      })
    }
  }
})()
