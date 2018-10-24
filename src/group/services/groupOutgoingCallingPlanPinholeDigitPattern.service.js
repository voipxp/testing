;(function() {
  angular
    .module('odin.group')
    .factory('GroupOutgoingCallingPlanPinholeDigitPatternService', Service)

  function Service($http, Route) {
    var service = { index, store, update, destroy }
    var url = Route.api('/groups/calling-plans/outgoing/pinhole-digit-patterns')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, pattern) {
      return $http.post(url(), pattern).then(res => res.data)
    }

    function update(serviceProviderId, groupId, pattern) {
      return $http.put(url(), pattern).then(res => res.data)
    }

    function destroy(serviceProviderId, groupId, name) {
      return $http
        .delete(url(), { params: { serviceProviderId, groupId, name } })
        .then(res => res.data)
    }
  }
})()
