;(function() {
  angular
    .module('odin.common')
    .factory('UserOutgoingCallingPlanOriginatingService', Service)

  function Service($http, Route) {
    var service = { show, update, bulkUpdate, bulkIndex }
    var url = Route.api('/users/calling-plans/outgoing/originating')
    service.options = {
      userPermissions: [
        'Disallow',
        'Allow',
        'Authorization Code Required',
        'Transfer To First Transfer Number',
        'Transfer To Second Transfer Number',
        'Transfer To Third Transfer Number'
      ]
    }
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
