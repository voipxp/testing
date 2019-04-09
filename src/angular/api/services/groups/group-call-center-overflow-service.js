import angular from 'angular'

angular.module('odin.api').factory('GroupCallCenterOverflowService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/overflow')
  var service = { show: show, update: update }
  service.options = {
    action: ['Busy', 'Transfer', 'Ringing'],
    timeoutSeconds: { min: 0, max: 7200 }
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
