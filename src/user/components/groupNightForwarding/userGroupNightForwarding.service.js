;(function() {
  angular
    .module('odin.user')
    .factory('UserNightForwardingService', UserNightForwardingService)

  function UserNightForwardingService($http, Route) {
    var url = Route.api('/users/night-forwarding')
    var service = { show: show, update: update }
    service.options = {
      nightForwarding: ['Use Group', 'On', 'Off']
    }

    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
