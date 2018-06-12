;(function() {
  angular
    .module('odin.user')
    .factory('UserNightForwardingService', UserNightForwardingService)

  function UserNightForwardingService($http, Route) {
    var url = Route.api('/services/users/nightforwarding')
    var service = { show: show, update: update }
    service.options = {
      nightForwarding: ['Use Group', 'On', 'Off']
    }

    return service

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function update(id, obj) {
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
