;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterForcedForwardingService',
      GroupCallCenterForcedForwardingService
    )

  function GroupCallCenterForcedForwardingService($http, Route) {
    var url = Route.api('/groups/call-centers/forced-forwarding')
    var service = { show: show, update: update }
    service.options = { audioMessageSource: ['File', 'URL', 'Default'] }
    return service

    function show(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
