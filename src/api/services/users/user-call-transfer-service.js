import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserCallTransferService', UserCallTransferService)

UserCallTransferService.$inject = ['$http', 'Route']
function UserCallTransferService($http, Route) {
  var url = Route.api('/users/call-transfer')
  var service = { show: show, update: update }
  service.options = {
    minRecallNumberOfRings: 2,
    maxRecallNumberOfRings: 20,
    minBusyCampOnSeconds: 30,
    maxBusyCampOnSeconds: 600
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
