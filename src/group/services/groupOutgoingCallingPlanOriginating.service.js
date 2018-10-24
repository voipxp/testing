;(function() {
  angular
    .module('odin.group')
    .factory('GroupOutgoingCallingPlanOriginatingService', Service)

  function Service($http, Route) {
    var service = { show, update }
    var url = Route.api('/groups/calling-plans/outgoing/originating')
    service.options = {
      permissions: [
        'Disallow',
        'Allow',
        'Authorization Code Required',
        'Transfer To First Transfer Number',
        'Transfer To Second Transfer Number',
        'Transfer To Third Transfer Number'
      ]
    }

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
