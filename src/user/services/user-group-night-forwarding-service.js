import angular from 'angular'

angular
  .module('odin.user')
  .factory('UserNightForwardingService', UserNightForwardingService)

UserNightForwardingService.$inject = ['$http', 'Route']
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

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
