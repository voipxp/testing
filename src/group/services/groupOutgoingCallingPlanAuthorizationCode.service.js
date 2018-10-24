;(function() {
  angular
    .module('odin.group')
    .factory('GroupOutgoingCallingPlanAuthorizationCodeService', Service)

  function Service($http, Route) {
    var service = { index, store, destroy }
    var url = Route.api('/groups/calling-plans/outgoing/authorization-codes')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function store(obj) {
      return $http.post(url(), obj).then(res => res.data)
    }

    function destroy(data) {
      return $http.delete(url(), { data }).then(res => res.data)
    }
  }
})()
