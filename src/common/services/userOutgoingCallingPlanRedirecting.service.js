;(function() {
  angular
    .module('odin.common')
    .factory('UserOutgoingCallingPlanRedirectingService', Service)

  function Service($http, Route) {
    var service = { show, update, bulkIndex, bulkUpdate }
    var url = Route.api('/users/calling-plans/outgoing/redirecting')
    return service

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }

    function bulkIndex(serviceProviderId, groupId) {
      return $http
        .get(url('bulk'), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function bulkUpdate(data) {
      return $http.put(url('bulk'), data).then(res => res.data)
    }
  }
})()
