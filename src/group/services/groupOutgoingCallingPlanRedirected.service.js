;(function() {
  angular
    .module('odin.group')
    .factory('GroupOutgoingCallingPlanRedirectedService', Service)

  function Service($http, Route) {
    var service = { show, update }
    var url = Route.api('/groups/calling-plans/outgoing/redirected')
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
