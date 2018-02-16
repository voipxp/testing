;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterDnisService', GroupCallCenterDnisService)

  function GroupCallCenterDnisService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/dnis')
    var service = { show: show, update: update }
    service.options = { promoteCallsFromPriority: { min: 1, max: 1800 } }
    return service

    function url(serviceUserId) {
      return _url(serviceUserId)
    }

    function show(serviceUserId) {
      return $http.get(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(serviceUserId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
