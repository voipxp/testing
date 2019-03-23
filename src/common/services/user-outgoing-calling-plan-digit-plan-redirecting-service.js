import angular from 'angular'

angular
  .module('odin.common')
  .factory('UserOutgoingCallingPlanDigitPlanRedirectingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  var url = Route.api('/users/calling-plans/outgoing/digit-plan/redirecting')
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId } }).then(res => res.data)
  }

  function update(userId, obj) {
    return $http.put(url(), obj).then(res => res.data)
  }
}
