;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserOutgoingCallingPlanRedirectingService',
      UserOutgoingCallingPlanRedirectingService
    )

  function UserOutgoingCallingPlanRedirectingService($http, Route) {
    var service = { show: show, update: update }
    return service

    function url(id) {
      return Route.api('users')(id, 'callingplans', 'outgoing', 'redirecting')
    }

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
