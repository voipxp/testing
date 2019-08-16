import angular from 'angular'

angular.module('odin.api').factory('UserIncomingCallingPlanService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  service.options = {
    allowFromOutsideGroup: ['Allow', 'Allow Only If Redirected From Another User', 'Disallow']
  }
  var url = Route.api('/users/calling-plans/incoming')
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId } }).then(response => response.data)
  }

  function update(userId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
