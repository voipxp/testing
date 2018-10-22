;(function() {
  angular
    .module('odin.group')
    .factory('GroupOutgoingCallingPlanDigitPlanCallMeNowService', Service)

  function Service($http, Route) {
    var service = { show, update }
    var url = Route.api2(
      '/groups/calling-plans/outgoing/digit-plan/call-me-now'
    )
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
})()
