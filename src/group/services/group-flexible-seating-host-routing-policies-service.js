import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupFlexibleSeatingHostRoutingPoliciesService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/flexible-seating/host/routing-policies')

  var service = {
    show: show,
    update: update
  }
  return service

  function show(serviceUserId) {
    return $http
      .get(url(), {
        params: { serviceUserId: serviceUserId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
