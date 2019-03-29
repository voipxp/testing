import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupCallCenterBouncedCallService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/bounced-calls')
  var service = { show: show, update: update }
  service.options = {
    numberOfRingsBeforeBouncingCall: { min: 1, max: 20 },
    alertCallCenterCallOnHoldSeconds: { min: 30, max: 600 },
    bounceCallCenterCallOnHoldSeconds: { min: 30, max: 600 }
  }
  return service

  function show(serviceUserId) {
    return $http
      .get(url(), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceUserId, obj) {
    return $http.put(url(), obj).then(function(response) {
      return response.data
    })
  }
}
