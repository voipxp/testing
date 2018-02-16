;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterAgentService', GroupCallCenterAgentService)

  function GroupCallCenterAgentService($http, Route) {
    var url = Route.api('/services/groups/callcenters/agents')
    var service = { show: show, update: update }
    return service

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
