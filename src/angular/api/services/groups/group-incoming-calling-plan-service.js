import angular from 'angular'

angular.module('odin.api').factory('GroupIncomingCallingPlanService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  var url = Route.api('/groups/calling-plans/incoming')
  service.options = {
    allowFromOutsideGroup: ['Allow', 'Allow Only If Redirected From Another User', 'Disallow']
  }
  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
