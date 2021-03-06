import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupCallCenterDistinctiveRingingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/distinctive-ringing')
  var service = { show: show, update: update }
  service.options = {
    ringPattern: ['Normal', 'Long-Long', 'Short-Short-Long', 'Short-Long-Short']
  }
  return service

  function show(serviceUserId) {
    return $http
      .get(url(), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceUserId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
