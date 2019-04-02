import angular from 'angular'

angular
  .module('odin.user')
  .factory('UserCallingNumberDeliveryService', UserCallingNumberDeliveryService)

UserCallingNumberDeliveryService.$inject = ['$http', 'Route']
function UserCallingNumberDeliveryService($http, Route) {
  var url = Route.api('/users/calling-number-delivery')
  var service = { show: show, update: update }
  service.options = {}

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
