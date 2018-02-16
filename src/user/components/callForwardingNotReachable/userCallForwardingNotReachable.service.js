;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserCallForwardingNotReachableService',
      UserCallForwardingNotReachableService
    )

  function UserCallForwardingNotReachableService($http, Route) {
    var url = Route.api('/services/users/callforwardingnotreachable')
    var service = { show: show, update: update }
    service.options = {
      outgoingDNorSIPURI: { minimum: 1, maximum: 161 }
    }

    return service

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
