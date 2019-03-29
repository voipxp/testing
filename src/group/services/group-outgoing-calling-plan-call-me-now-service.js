import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupOutgoingCallingPlanCallMeNowService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  var url = Route.api('/groups/calling-plans/outgoing/call-me-now')

  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(res => res.data)
  }

  function update(serviceProviderId, groupId, obj) {
    return $http.put(url(), obj).then(res => res.data)
  }
}
