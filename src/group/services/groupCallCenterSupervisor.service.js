;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterSupervisorService',
      GroupCallCenterSupervisorService
    )

  function GroupCallCenterSupervisorService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/supervisors')
    var service = { show: show, update: update }

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
