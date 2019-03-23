import angular from 'angular'

angular.module('odin.common').factory('UserIncomingCallingPlanService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  service.options = {
    allowFromOutsideGroup: [
      'Allow',
      'Allow Only If Redirected From Another User',
      'Disallow'
    ]
  }
  var url = Route.api('/users/calling-plans/incoming')
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId } }).then(res => res.data)
  }

  function update(userId, obj) {
    return $http.put(url(), obj).then(res => res.data)
  }
}
